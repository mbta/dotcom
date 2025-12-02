defmodule Dotcom.ScheduleFinder do
  @moduledoc """
  Schedule Finder data includes daily schedules, predictions, services
  """

  use Nebulex.Caching.Decorators

  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival}
  alias JsonApi.Item
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @cache Application.compile_env!(:dotcom, :cache)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @timezone Application.compile_env!(:dotcom, :timezone)
  @schedule_ttl :timer.hours(24)

  defmodule DailyDeparture do
    @moduledoc """
    A scheduled departure for a trip on a route, described by a headsign and time.
    """
    defstruct [:headsign, :route_id, :schedule_id, :stop_sequence, :time, :trip_id, :trip_name]

    @type t :: %__MODULE__{
            headsign: Trip.headsign() | String.t() | nil,
            route_id: Route.id_t(),
            schedule_id: String.t(),
            stop_sequence: non_neg_integer(),
            time: DateTime.t(),
            trip_id: Trip.id_t(),
            trip_name: String.t() | nil
          }
  end

  defmodule FutureArrival do
    @moduledoc """
    A scheduled arrival at a stop (and optionally platform) with a time.
    """
    defstruct [:platform_name, :stop_name, :time]

    @type t :: %__MODULE__{
            platform_name: String.t() | nil,
            stop_name: String.t(),
            time: DateTime.t()
          }
  end

  @doc """
  Get scheduled departures for a given route/direction/stop/date.
  """
  @spec daily_departures(Route.id_t(), 0 | 1, Stop.id_t(), String.t()) ::
          {:ok, [DailyDeparture.t()]} | {:error, term()}
  def daily_departures(route_id, direction_id, stop_id, date) do
    # Maybe add filter[stop_sequence] to help looped routes
    params = [
      include: "trip",
      "fields[trip]": "headsign,name",
      "fields[schedule]": "departure_time,pickup_type,stop_headsign,stop_sequence",
      "filter[route]": routes(route_id),
      "filter[direction_id]": direction_id,
      "filter[stop]": stop_id,
      "filter[date]": date,
      sort: "departure_time"
    ]

    case get_schedules(params) do
      {:ok, data} ->
        {:ok,
         data
         |> Stream.reject(&no_pick_up?/1)
         |> Enum.map(&to_departure/1)}

      {:error, error} ->
        {:error, inspect(error)}
    end
  end

  defp routes("Green"), do: GreenLine.branch_ids() |> Enum.join(",")
  defp routes(route_id), do: route_id

  defp no_pick_up?(%Item{attributes: %{"pickup_type" => 1}}), do: true
  defp no_pick_up?(_), do: false

  defp to_departure(%Item{
         id: schedule_id,
         attributes: %{
           "departure_time" => departure_time,
           "stop_headsign" => stop_headsign,
           "stop_sequence" => stop_sequence
         },
         relationships: %{
           "route" => [%Item{id: route_id}],
           "trip" => [
             %Item{
               id: trip_id,
               attributes: %{"headsign" => trip_headsign, "name" => trip_name}
             }
           ]
         }
       }) do
    %DailyDeparture{
      route_id: route_id,
      schedule_id: schedule_id,
      time: to_datetime(departure_time),
      headsign: stop_headsign || trip_headsign,
      trip_name: trip_name,
      trip_id: trip_id,
      stop_sequence: stop_sequence
    }
  end

  @doc """
  Get scheduled arrivals for one trip on a date, starting at a given stop_sequence.
  """
  @spec next_arrivals(Trip.id_t(), non_neg_integer(), String.t()) ::
          {:ok, [FutureArrival.t()]} | {:error, term()}
  def next_arrivals(trip_id, min_stop_sequence, date) do
    # Maybe add filter[stop_sequence] to help looped routes
    params = [
      include: "stop",
      "fields[schedule]": "arrival_time,departure_time,stop_sequence,stop_headsign",
      "fields[stop]": "platform_name,name,vehicle_type",
      "filter[trip]": trip_id,
      "filter[date]": date
    ]

    case get_schedules(params) do
      {:ok, data} ->
        {:ok,
         data
         |> Stream.filter(&makes_subsequent_stop?(&1, min_stop_sequence))
         |> Enum.map(&to_arrival/1)}

      error ->
        error
    end
  end

  # Instead of every stop in the trip, only return schedules that make later stops on the trip, as defined by the given `stop_sequence` value
  defp makes_subsequent_stop?(
         %Item{attributes: %{"stop_sequence" => stop_sequence}},
         min_stop_sequence
       ) do
    {int, _} = Integer.parse(min_stop_sequence)
    stop_sequence >= int
  end

  defp to_arrival(%Item{
         attributes: %{"departure_time" => departure_time, "arrival_time" => arrival_time},
         relationships: %{
           "stop" => [
             %Item{
               attributes: %{
                 "platform_name" => platform_name,
                 "name" => stop_name,
                 "vehicle_type" => vehicle_type
               }
             }
           ]
         }
       }) do
    # If we happen to be looking at a stop that's the trip origin, there'll only be a departure time. Can use that if needed.
    %FutureArrival{
      time: if(arrival_time, do: to_datetime(arrival_time), else: to_datetime(departure_time)),
      platform_name: simplify(platform_name, vehicle_type),
      stop_name: stop_name
    }
  end

  # Don't show platform names for subway. We might make exceptions later (JFK?)
  defp simplify(_, vehicle_type) when vehicle_type in [0, 1], do: nil
  # For commuter rail every station has a platform, but most stations also only
  # have _one_ so we don't really need to show a platform name there either.
  defp simplify("Commuter Rail", 2), do: nil

  defp simplify(name, 2) do
    if not String.contains?(name, "All Trains") do
      name
    end
  end

  defp simplify(name, _), do: name

  @doc """
  Clearly group a list of departures by route and destination. Intended to be used with subway departures.

  In the case of the Red and Green lines, scheduled departures might include multiple destinations, e.g. trains to Ashmont _and_ trains to Braintree, and/or multiple routes, as in the case of the distinct Green Line "branches".
  """
  @spec subway_groups([DailyDeparture.t()], 0 | 1, Stop.id_t()) :: [
          {Route.t(), String.t(), [DateTime.t()]}
        ]
  def subway_groups(departures, direction_id, stop_id) do
    departures
    |> Enum.group_by(&@routes_repo.get(&1.route_id))
    |> Enum.map(&departures_with_destination(&1, direction_id, stop_id))
  end

  @ashmont_branch_stops ~w(place-shmnl place-fldcr place-smmnl place-asmnl)
  @braintree_branch_stops ~w(place-nqncy place-wlsta place-qnctr place-qamnl place-brntn)

  defp departures_with_destination({%Route{id: "Red"} = route, departures}, 0, stop_id) do
    destination =
      cond do
        stop_id in @ashmont_branch_stops -> "Ashmont"
        stop_id in @braintree_branch_stops -> "Braintree"
        true -> "Ashmont/Braintree"
      end

    {route, destination, Enum.map(departures, & &1.time)}
  end

  defp departures_with_destination({route, departures}, direction_id, _) do
    {route, Route.direction_destination(route, direction_id), Enum.map(departures, & &1.time)}
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @schedule_ttl])
  defp get_schedules(params) do
    case MBTA.Api.Schedules.all(params) do
      %JsonApi{data: data} ->
        {:ok, data}

      error ->
        error
    end
  end

  defp to_datetime(time) do
    case DateTime.from_iso8601(time) do
      {:ok, dt, _} ->
        DateTime.shift_zone!(dt, @timezone)

      _ ->
        nil
    end
  end
end
