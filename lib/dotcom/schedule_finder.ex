defmodule Dotcom.ScheduleFinder do
  @moduledoc """
  Schedule Finder data includes daily schedules, predictions, services
  """

  import Dotcom.Alerts

  alias Alerts.{Alert, InformedEntity, InformedEntitySet}
  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival}
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop

  @alerts_repo_module Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  defmodule DailyDeparture do
    @moduledoc """
    A scheduled departure for a trip on a route, described by a headsign and time.
    """
    defstruct [
      :headsign,
      :route_id,
      :schedule_id,
      :stop_sequence,
      :time,
      :time_desc,
      :trip_id,
      :trip_name
    ]

    @type t :: %__MODULE__{
            headsign: Trip.headsign() | String.t() | nil,
            route_id: Route.id_t(),
            schedule_id: String.t(),
            stop_sequence: non_neg_integer(),
            time: DateTime.t(),
            time_desc: String.t() | nil,
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
  Service-impacting currently active alerts for a route, including track changes
  at the indicated stop. Excludes commuter rail trip cancellations and delays.
  """
  @spec current_alerts(Stop.t(), Route.t()) :: [Alert.t()]
  def current_alerts(stop, route) do
    route.id
    |> @alerts_repo_module.by_route_id_and_type(route.type, @date_time_module.now())
    |> Enum.filter(
      &(in_effect_now?(&1) && (&1.effect == :track_change || service_impacting_alert?(&1)))
    )
    |> Enum.reject(&(track_change_other_stop?(&1, stop.id) || cr_trip_cancellation_or_delay?(&1)))
  end

  defp track_change_other_stop?(%Alert{effect: :track_change} = alert, stop_id) do
    affected_stops = Alert.get_entity(alert, :stop)
    MapSet.size(affected_stops) > 0 && stop_id not in affected_stops
  end

  defp track_change_other_stop?(_, _), do: false

  # These particular alerts _should_ show in the Upcoming Deparures list for the associated trips
  defp cr_trip_cancellation_or_delay?(%Alert{effect: effect} = alert)
       when effect in ~w(delay cancellation)a do
    commuter_rail? = Dotcom.Alerts.route_type_alert?(alert, 2)

    specific_trip? =
      !(alert.informed_entity
        |> InformedEntitySet.match?(InformedEntity.from_keywords(trip: nil)))

    commuter_rail? and specific_trip?
  end

  defp cr_trip_cancellation_or_delay?(_), do: false

  @doc """
  Get scheduled departures for a given route/direction/stop/date.
  """
  @spec daily_departures(Route.id_t(), 0 | 1, Stop.id_t(), String.t()) ::
          {:ok, [DailyDeparture.t()]} | {:error, term()}
  def daily_departures(route_id, direction_id, stop_id, date) do
    # Maybe add filter[stop_sequence] to help looped routes
    case @schedules_repo.by_route_ids(routes(route_id),
           date: date,
           direction_id: direction_id,
           stop_ids: stop_id
         ) do
      schedules when is_list(schedules) ->
        departures =
          schedules
          |> Enum.reject(&no_pick_up?/1)
          |> Enum.map(&to_departure/1)

        {:ok, departures}

      error ->
        error
    end
  end

  defp routes("Green"), do: GreenLine.branch_ids()
  defp routes(other), do: List.wrap(other)

  defp no_pick_up?(%Schedule{pickup_type: 1}), do: true
  defp no_pick_up?(_), do: false

  defp to_departure(%Schedule{schedule_id: schedule_id, route: route, trip: trip} = schedule) do
    %DailyDeparture{
      route_id: route.id,
      schedule_id: schedule_id,
      time: schedule.departure_time,
      time_desc: time_desc(trip),
      headsign: schedule.stop_headsign || if(trip, do: Map.get(trip, :headsign)),
      trip_name: if(trip, do: Map.get(trip, :name)),
      trip_id: if(trip, do: Map.get(trip, :id)),
      stop_sequence: schedule.stop_sequence
    }
  end

  defp time_desc(%Trip{route_pattern_id: route_pattern_id})
       when not is_nil(route_pattern_id) do
    case @route_patterns_repo.get(route_pattern_id) do
      %RoutePattern{time_desc: time_desc} ->
        time_desc

      _ ->
        nil
    end
  end

  defp time_desc(_), do: nil

  @doc """
  Get scheduled arrivals for one trip on a date, starting at a given stop_sequence.
  """
  @spec next_arrivals(Trip.id_t(), non_neg_integer(), String.t()) ::
          {:ok, [FutureArrival.t()]} | {:error, term()}
  def next_arrivals(trip_id, min_stop_sequence, date) do
    # Maybe add filter[stop_sequence] to help looped routes
    case @schedules_repo.schedule_for_trip(trip_id, date: date) do
      schedules when is_list(schedules) ->
        arrivals =
          schedules
          |> Enum.filter(&makes_subsequent_stop?(&1, min_stop_sequence))
          |> Enum.map(&to_arrival/1)

        {:ok, arrivals}

      error ->
        error
    end
  end

  # Instead of every stop in the trip, only return schedules that make later stops on the trip, as defined by the given `stop_sequence` value
  defp makes_subsequent_stop?(
         %Schedule{stop_sequence: stop_sequence},
         min_stop_sequence
       ) do
    {int, _} = Integer.parse(min_stop_sequence)
    stop_sequence >= int
  end

  defp to_arrival(%Schedule{
         departure_time: departure_time,
         arrival_time: arrival_time,
         route: %Route{type: vehicle_type},
         stop: %Stop{
           platform_name: platform_name,
           name: stop_name
         }
       }) do
    # If we happen to be looking at a stop that's the trip origin, there'll only be a departure time. Can use that if needed.
    %FutureArrival{
      time: if(arrival_time, do: arrival_time, else: departure_time),
      platform_name: simplify(platform_name, vehicle_type),
      stop_name: stop_name
    }
  end

  # If a platform name is nil, then it's nil no matter the mode. (This
  # way, clauses below don't have to worry about nil-checking
  # `platform_name`.)
  defp simplify(nil, _), do: nil

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
end
