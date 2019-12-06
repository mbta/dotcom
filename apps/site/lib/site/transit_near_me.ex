defmodule Site.TransitNearMe do
  @moduledoc """
  Struct and helper functions for gathering data to use on TransitNearMe.
  """

  require Logger

  alias Alerts.{Alert, InformedEntity, Match}
  alias GoogleMaps.Geocode.Address
  alias Site.JsonHelpers
  alias PredictedSchedule.Display
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias SiteWeb.Router.Helpers
  alias SiteWeb.ViewHelpers
  alias Stops.{Nearby, Stop}
  alias Util.Distance

  defstruct stops: [],
            distances: %{},
            schedules: %{}

  @type schedule_data :: %{
          Route.id_t() => %{
            Trip.headsign() => Schedule.t()
          }
        }

  @type distance_hash :: %{Stop.id_t() => float}

  @type t :: %__MODULE__{
          stops: [Stop.t()],
          distances: distance_hash,
          schedules: %{Stop.id_t() => schedule_data}
        }

  @type stops_with_distances :: %{
          stops: [Stop.t()],
          distances: distance_hash
        }

  @type error :: {:error, :timeout | :no_stops}

  @default_opts [
    stops_nearby_fn: &Nearby.nearby_with_varying_radius_by_mode/1,
    schedules_fn: &Schedules.Repo.schedule_for_stop/2
  ]

  @spec build(Address.t(), Keyword.t()) :: stops_with_distances
  def build(%Address{} = location, opts) do
    opts = Keyword.merge(@default_opts, opts)
    nearby_fn = Keyword.fetch!(opts, :stops_nearby_fn)
    stops = nearby_fn.(location)

    %{
      stops: stops,
      distances:
        Map.new(
          stops,
          &{&1.id, &1 |> Distance.haversine(location) |> ViewHelpers.round_distance()}
        )
    }
  end

  @spec get_predicted_schedules([Schedule.t()], Keyword.t(), Keyword.t()) :: [
          PredictedSchedule.t()
        ]
  defp get_predicted_schedules(schedules, params, opts) do
    predictions_fn = Keyword.get(opts, :predictions_fn, &Predictions.Repo.all/1)
    now = Keyword.fetch!(opts, :now)

    params
    |> predictions_fn.()
    |> PredictedSchedule.group(schedules)
    |> Enum.filter(&(!PredictedSchedule.last_stop?(&1) and after_min_time?(&1, now)))
  end

  @spec after_min_time?(PredictedSchedule.t(), DateTime.t()) :: boolean
  defp after_min_time?(%PredictedSchedule{} = predicted_schedule, min_time) do
    case PredictedSchedule.time(predicted_schedule) do
      %DateTime{} = time ->
        DateTime.compare(time, min_time) != :lt

      nil ->
        false
    end
  end

  @spec sort_by_time([{DateTime.t() | nil, any}]) ::
          {DateTime.t() | nil, [any]}

  defp sort_by_time([]) do
    {nil, []}
  end

  defp sort_by_time(list) do
    {[closest_time | _], sorted} =
      list
      |> Enum.sort_by(fn
        {nil, _data} -> nil
        {time, _data} -> DateTime.to_unix(time)
      end)
      |> Enum.unzip()

    {closest_time, sorted}
  end

  @type simple_prediction :: %{
          required(:seconds) => integer,
          required(:time) => [String.t()],
          required(:status) => String.t() | nil,
          required(:track) => String.t() | nil
        }

  @type time_data :: %{
          required(:scheduled_time) => [String.t()] | nil,
          required(:prediction) => simple_prediction | nil,
          required(:delay) => integer
        }

  @type headsign_data :: %{
          required(:name) => String.t(),
          required(:times) => [time_data],
          required(:train_number) => String.t() | nil
        }

  @type direction_data :: %{
          required(:direction_id) => 0 | 1,
          required(:headsigns) => [headsign_data]
        }

  @type stop_with_data :: %{
          required(:stop) => Stop.t(),
          required(:directions) => [direction_data],
          required(:distance) => String.t(),
          required(:href) => String.t()
        }

  @type route_data :: %{
          # route is a Route struct with an additional `header` attribute
          required(:route) => map,
          required(:stops_with_directions) => [stop_with_data]
        }

  @doc """
  Uses the schedules to build a list of route objects, which each have
  a list of stops. Each stop has a list of directions. Each direction has a
  list of headsigns. Each headsign has a schedule, and a prediction if available.
  """
  @spec schedules_for_routes(t(), [Alert.t()], Keyword.t()) :: [route_data]
  def schedules_for_routes(
        %__MODULE__{
          schedules: schedules,
          distances: distances
        },
        alerts,
        opts
      ) do
    schedules
    |> Map.values()
    |> List.flatten()
    |> Enum.group_by(&PredictedSchedule.route(&1).id)
    |> Enum.map(&schedules_for_route(&1, distances, alerts, opts))
    |> Enum.sort_by(&route_sorter(&1, distances))
  end

  defp route_sorter(%{stops_with_directions: [%{stop: %{id: stop_id}} | _]}, distances) do
    Map.fetch!(distances, stop_id)
  end

  @spec schedules_for_route(
          {Route.id_t(), [PredictedSchedule.t()]},
          distance_hash,
          [Alert.t()],
          Keyword.t()
        ) :: route_data
  def schedules_for_route(
        {_route_id, [%PredictedSchedule{} = ps | _] = schedules},
        distances,
        alerts,
        opts
      ) do
    route = PredictedSchedule.route(ps)

    alert_count = get_alert_count_for_route(route, alerts)
    route = JsonHelpers.stringified_route(route) |> Map.put(:alert_count, alert_count)

    %{
      route: route,
      stops_with_directions: get_stops_for_route(schedules, distances, opts)
    }
  end

  @spec get_alert_count_for_route(Route.t(), [Alert.t()]) :: integer
  defp get_alert_count_for_route(route, alerts) do
    alerts |> Match.match([%InformedEntity{route: route.id}]) |> length()
  end

  @spec get_stops_for_route([PredictedSchedule.t()], distance_hash, Keyword.t()) :: [
          stop_with_data
        ]

  defp get_stops_for_route(schedules, distances, opts) do
    schedules
    |> Enum.group_by(&PredictedSchedule.stop(&1).id)
    |> Stream.map(&get_directions_for_stop(&1, distances, opts))
    |> Enum.sort_by(&Map.get(distances, &1.stop.id))
  end

  @spec get_directions_for_stop(
          {Stop.id_t(), [PredictedSchedule.t()]},
          distance_hash,
          Keyword.t()
        ) ::
          stop_with_data
  defp get_directions_for_stop({_stop_id, [ps | _] = schedules}, distances, opts) do
    schedule_stop = PredictedSchedule.stop(ps)

    stop_fn = Keyword.get(opts, :stops_fn, &Stops.Repo.get_parent/1)

    schedule_stop.id
    |> stop_fn.()
    |> build_stop_map(distances)
    |> Map.put(:directions, get_direction_map(schedules, opts))
  end

  @spec build_stop_map(Stop.t(), distance_hash) :: map
  def build_stop_map(stop, distances) do
    distance = Map.get(distances, stop.id)
    href = Helpers.stop_path(SiteWeb.Endpoint, :show, stop.id)

    %{
      stop: stop,
      distance: ViewHelpers.round_distance(distance),
      href: href
    }
  end

  @spec get_direction_map([PredictedSchedule.t()], Keyword.t()) :: [direction_data]
  def get_direction_map(schedules, opts) do
    schedules
    |> Enum.group_by(&PredictedSchedule.direction_id/1)
    |> Enum.map(&build_direction_map(&1, opts))
    |> sort_by_time()
    |> elem(1)
  end

  @spec build_direction_map({0 | 1, [PredictedSchedule.t()]}, Keyword.t()) ::
          {DateTime.t(), direction_data}
  def build_direction_map({direction_id, [ps | _] = schedules}, opts) do
    headsign_fn = Keyword.get(opts, :headsign_fn, &build_headsign_map/2)
    now = Keyword.fetch!(opts, :now)

    route = PredictedSchedule.route(ps)

    stop_id =
      ps
      |> PredictedSchedule.stop()
      |> Stops.Repo.get_parent()
      |> Map.fetch!(:id)

    {closest_time, headsigns} =
      schedules
      |> filter_predicted_schedules(route, stop_id, now)
      |> Enum.group_by(&((trip = PredictedSchedule.trip(&1)) && trip.headsign))
      |> Enum.map(fn {headsign, predicted_scheds} ->
        predicted_scheds =
          Enum.sort_by(predicted_scheds, &(&1 |> PredictedSchedule.time() |> DateTime.to_unix()))

        headsign_fn.({headsign, predicted_scheds}, opts)
      end)
      |> sort_by_time()

    {
      closest_time,
      %{
        direction_id: direction_id,
        headsigns: headsigns
      }
    }
  end

  @stops_without_predictions [
    "place-lake",
    "place-clmnl",
    "place-river",
    "place-hsmnl"
  ]

  @spec filter_predicted_schedules(
          [PredictedSchedule.t()],
          Routes.Route.t(),
          Stop.id_t(),
          DateTime.t()
        ) :: [
          PredictedSchedule.t()
        ]
  def filter_predicted_schedules(predicted_schedules, %Route{}, stop_id, %DateTime{})
      when stop_id in @stops_without_predictions do
    predicted_schedules
  end

  def filter_predicted_schedules(predicted_schedules, %Route{type: type}, _stop_id, now)
      when type in [0, 1] do
    # subway routes should only use predictions
    predicted_schedules
    |> Enum.filter(&PredictedSchedule.has_prediction?/1)
    |> case do
      [_ | _] = predictions ->
        predictions

      [] ->
        if late_night?(now) do
          predicted_schedules
        else
          []
        end
    end
  end

  def filter_predicted_schedules(predicted_schedules, %Route{}, _stop_id, %DateTime{}) do
    # all other modes can use schedules
    predicted_schedules
  end

  def late_night?(%DateTime{} = datetime) do
    time = DateTime.to_time(datetime)

    after_midnight?(time) and before_service_start?(time)
  end

  defp after_midnight?(%Time{} = time), do: Time.compare(time, ~T[00:00:00]) in [:eq, :gt]

  defp before_service_start?(%Time{} = time), do: Time.compare(time, ~T[03:00:00]) === :lt

  @spec build_headsign_map(
          {Schedules.Trip.headsign(), [PredictedSchedule.t()]},
          Keyword.t()
        ) :: {DateTime.t(), headsign_data}
  def build_headsign_map({headsign, [ps | _] = schedules}, opts) do
    route = PredictedSchedule.route(ps)
    trip = PredictedSchedule.trip(ps)

    {[soonest | _], headsign_schedules} =
      schedules
      |> Enum.take(schedule_count(route))
      |> Enum.map(&build_time_map(&1, opts))
      |> filter_headsign_schedules(route)
      |> Enum.unzip()

    {
      PredictedSchedule.time(soonest),
      %{
        name: headsign && ViewHelpers.break_text_at_slash(headsign),
        times: headsign_schedules,
        train_number: trip && trip.name
      }
    }
  end

  def schedule_count(%Route{type: 2}), do: 1
  # get more bus schedules because some will be dropped later
  def schedule_count(%Route{type: 3}), do: 4
  def schedule_count(%Route{}), do: 2

  @type predicted_schedule_and_time_data :: {PredictedSchedule.t(), time_data}

  @spec filter_headsign_schedules([predicted_schedule_and_time_data], Route.t() | nil) :: [
          predicted_schedule_and_time_data
        ]
  def filter_headsign_schedules(schedules, %Route{type: 3}) do
    # for bus, remove items with a nil prediction when at least one item has a prediction
    prediction_available? =
      Enum.any?(schedules, &(&1 |> elem(0) |> PredictedSchedule.has_prediction?()))

    if prediction_available? do
      schedules
      |> Enum.filter(&(&1 |> elem(0) |> PredictedSchedule.has_prediction?()))
      |> Enum.take(2)
    else
      schedules
      |> Enum.take(2)
      |> filter_headsign_schedules(nil)
    end
  end

  def filter_headsign_schedules(
        [{%PredictedSchedule{}, _} = keep, {%PredictedSchedule{prediction: nil}, _}],
        _
      ) do
    # only show one schedule if the second schedule has no prediction
    [keep]
  end

  def filter_headsign_schedules(schedules, _) do
    schedules
  end

  @doc """
  Gets all schedules for a route and compiles appropriate headsign_data for each stop.
  Returns a map indexed by stop_id
  """
  @spec time_data_for_route_by_stop(Route.id_t(), 1 | 0, Keyword.t()) :: %{
          Stop.id_t() => [headsign_data]
        }
  def time_data_for_route_by_stop(route_id, direction_id, opts) do
    date = Keyword.get(opts, :date, Util.service_date())
    schedules_fn = Keyword.get(opts, :schedules_fn, &Schedules.Repo.by_route_ids/2)

    route_id
    |> expand_route_id()
    |> schedules_fn.(direction_id: direction_id, date: date)
    |> get_predicted_schedules([route: route_id, direction_id: direction_id], opts)
    |> Enum.group_by(&PredictedSchedule.route(&1).id)
    |> Enum.flat_map(&schedules_for_route(&1, %{}, [], opts).stops_with_directions)
    |> convert_route_time_data_to_map()
    |> Map.new(fn {stop_id, time_data} ->
      {stop_id, limit_route_time_data(time_data)}
    end)
  end

  @spec convert_route_time_data_to_map([stop_with_data]) :: %{Stop.id_t() => [headsign_data]}
  defp convert_route_time_data_to_map(stops_with_directions) do
    Enum.reduce(stops_with_directions, %{}, fn stop_with_direction, accumulator ->
      stop_id = stop_with_direction.stop.id

      time_data =
        stop_with_direction
        |> Map.get(:directions)
        |> List.first()
        |> Map.get(:headsigns)

      Map.update(accumulator, stop_id, time_data, &(&1 ++ time_data))
    end)
  end

  defp limit_route_time_data(headsign_data) do
    headsign_data
    |> Enum.flat_map(fn headsign ->
      Enum.map(headsign.times, &%{headsign | times: [&1]})
    end)
    |> Enum.sort_by(&first_headsign_prediction_time(&1))
    |> Enum.take(2)
  end

  @spec first_headsign_prediction_time(headsign_data) :: integer | :infinity
  defp first_headsign_prediction_time(%{times: []}), do: :infinity

  defp first_headsign_prediction_time(%{
         times: [
           %{
             prediction: %{
               seconds: seconds
             }
           }
           | _
         ]
       }),
       do: seconds

  defp first_headsign_prediction_time(_), do: :infinity

  @spec expand_route_id(Route.id_t()) :: [Route.id_t()]
  defp expand_route_id("Green"), do: ["Green-B", "Green-C", "Green-D", "Green-E"]
  defp expand_route_id(route), do: [route]

  @spec build_time_map(PredictedSchedule.t(), Keyword.t()) :: predicted_schedule_and_time_data
  def build_time_map(%PredictedSchedule{} = predicted_schedule, opts) do
    now = Keyword.fetch!(opts, :now)

    route_type =
      predicted_schedule
      |> PredictedSchedule.route()
      |> Route.type_atom()

    {
      predicted_schedule,
      %{
        delay: PredictedSchedule.delay(predicted_schedule),
        scheduled_time: scheduled_time(predicted_schedule),
        prediction: simple_prediction(predicted_schedule.prediction, route_type, now)
      }
    }
  end

  defp scheduled_time(%PredictedSchedule{schedule: %Schedule{time: time}}) do
    format_time(time)
  end

  defp scheduled_time(%PredictedSchedule{}) do
    nil
  end

  @spec simple_prediction(Prediction.t() | nil, atom, DateTime.t()) :: simple_prediction | nil
  def simple_prediction(nil, _route_type, _now) do
    nil
  end

  def simple_prediction(%Prediction{time: nil}, _route_type, _now) do
    nil
  end

  def simple_prediction(%Prediction{time: %DateTime{}} = prediction, route_type, now) do
    seconds = DateTime.diff(prediction.time, now)

    prediction
    |> Map.take([:status, :track])
    |> Map.put(:time, format_prediction_time(prediction.time, now, route_type, seconds))
    |> Map.put(:seconds, seconds)
  end

  @spec format_prediction_time(DateTime.t(), DateTime.t(), atom, integer) ::
          [String.t()] | String.t()
  def format_prediction_time(%DateTime{} = time, _now, :commuter_rail, _) do
    format_time(time)
  end

  def format_prediction_time(%DateTime{} = time, now, :subway, seconds) when seconds > 30 do
    Display.do_time_difference(time, now, &format_time/1, 120)
  end

  def format_prediction_time(_, _, :subway, _), do: ["arriving"]

  def format_prediction_time(%DateTime{} = time, now, :bus, seconds) when seconds > 60 do
    Display.do_time_difference(time, now, &format_time/1, 120)
  end

  def format_prediction_time(_, _, :bus, _), do: ["arriving"]

  @spec format_time(DateTime.t()) :: [String.t()]
  def format_time(time) do
    [time, am_pm] =
      time
      |> Timex.format!("{h12}:{m} {AM}")
      |> String.split(" ")

    [time, " ", am_pm]
  end
end
