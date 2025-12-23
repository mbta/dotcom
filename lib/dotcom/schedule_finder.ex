defmodule Dotcom.ScheduleFinder do
  @moduledoc """
  Schedule Finder data includes daily schedules, predictions, services
  """

  use Nebulex.Caching.Decorators

  import Dotcom.Alerts
  import Dotcom.Utils.Time

  alias Alerts.{Alert, InformedEntity, InformedEntitySet}
  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival, ServiceDescription}
  alias JsonApi.Item
  alias Routes.Route
  alias Schedules.Trip
  alias Services.Service
  alias Stops.Stop

  @cache Application.compile_env!(:dotcom, :cache)
  @alerts_repo_module Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
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
    # If a group has fewer than 3 trips we can't calculate headways. It's also
    # seldom enough that we'd rather just omit it.
    |> Enum.reject(fn {_, _, times} -> length(times) <= 2 end)
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

  defmodule ServiceDescription do
    @moduledoc """
    A simplified service.
    """
    defstruct [:dates, :is_now?, :next_available?, :service]

    @type t :: %__MODULE__{
            dates: [Date.t()],
            is_now?: boolean(),
            next_available?: boolean(),
            service: Service.t()
          }
  end

  @spec services(Route.id_t(), Date.t()) :: [%{String.t() => ServiceDescription.t()}]
  def services("Green", current_date),
    do: GreenLine.branch_ids() |> Enum.join(",") |> services(current_date)

  def services("627", current_date), do: "627,76,62" |> services(current_date)

  def services(route_id, current_date) do
    route_id
    |> DotcomWeb.ScheduleController.LineController.services(current_date)
    |> Stream.reject(&Date.before?(&1.end_date, current_date))
    |> Stream.flat_map(&unwrap_multiple_holidays/1)
    |> Stream.map(&add_single_date_description/1)
    |> Stream.map(&adjust_planned_description/1)
    |> Stream.map(fn service ->
      dates = Service.all_valid_dates_for_service(service)

      %ServiceDescription{
        dates: dates,
        is_now?: current_date in dates,
        service: service
      }
    end)
    |> tag_next_available(current_date)
    |> Enum.sort_by(&sort_services_by_date(&1.service, List.first(&1.dates)))
    |> Enum.dedup_by(&{&1.dates, Map.drop(&1.service, [:id])})
    |> Enum.group_by(&service_group/1)
    |> Enum.sort_by(&sort_groups/1)
  end

  defp unwrap_multiple_holidays(
         %{typicality: :holiday_service, added_dates: added_dates} = service
       )
       when length(added_dates) > 1 do
    for added_date <- added_dates do
      %{
        service
        | added_dates: [added_date],
          added_dates_notes: Map.take(service.added_dates_notes, [added_date])
      }
    end
  end

  defp unwrap_multiple_holidays(service), do: [service]

  defp add_single_date_description(
         %{
           added_dates: [single_date],
           added_dates_notes: added_dates_notes,
           typicality: typicality
         } = service
       )
       when typicality != :typical_service do
    date_note = Map.get(added_dates_notes, single_date) || service.description

    formatted_date =
      single_date
      |> Date.from_iso8601!()
      |> format_tiny_date()

    %{
      service
      | description: "#{date_note}, #{formatted_date}"
    }
  end

  defp add_single_date_description(service), do: service

  defp format_tiny_date(date), do: format!(date, :month_day_short)

  defp adjust_planned_description(%{typicality: :planned_disruption} = service) do
    dates =
      if service.start_date == service.end_date do
        " (#{format_tiny_date(service.start_date)})"
      else
        " (#{format_tiny_date(service.start_date)} through #{format_tiny_date(service.end_date)})"
      end

    Map.update!(service, :description, &(&1 <> dates))
  end

  defp adjust_planned_description(service), do: service

  defp tag_next_available(service_descriptions, current_date) do
    if Enum.any?(service_descriptions, &(&1.is_now? || &1.next_available?)) do
      service_descriptions
    else
      next_date = Date.shift(current_date, day: 1)

      service_descriptions
      |> Enum.map(&Map.put(&1, :next_available?, next_date in &1.dates))
      |> tag_next_available(next_date)
    end
  end

  defp sort_services_by_date(service, start_date) do
    {ordered_names(service.name), Date.to_string(start_date)}
  end

  defp ordered_names(name) do
    [
      "Weekday",
      "Monday - Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Holiday"
    ]
    |> Enum.find_index(&String.contains?(name, &1))
  end

  defp service_group(%ServiceDescription{
         service: %Service{typicality: :holiday_service}
       }),
       do: "Holiday Schedules"

  defp service_group(%ServiceDescription{
         service: %Service{typicality: :extra_service}
       }),
       do: "Extra Service"

  defp service_group(%ServiceDescription{
         service: %Service{typicality: :planned_disruption} = service
       }) do
    "Planned Work #{service.rating_description}"
  end

  defp service_group(%ServiceDescription{
         service: service
       }) do
    today = Dotcom.Utils.ServiceDateTime.service_date()

    if Service.in_current_rating?(service, today) do
      ends_or_starts =
        if service.rating_end_date do
          "ends #{format_tiny_date(service.rating_end_date)}"
        else
          "starts #{format_tiny_date(service.rating_start_date)}"
        end

      "#{service.rating_description} Schedules, #{ends_or_starts}"
    else
      if Service.in_future_rating?(service, today) do
        "#{service.rating_description} Schedules, starts #{format_tiny_date(service.rating_start_date)}"
      else
        "Other Schedules"
      end
    end
  end

  defp service_group(_), do: "Other Schedules"

  defp sort_groups({group_name, _}) do
    [
      "Schedules, ends",
      "Schedules, starts",
      "Holiday",
      "Extra"
    ]
    |> Enum.find_index(&String.contains?(group_name, &1))
  end
end
