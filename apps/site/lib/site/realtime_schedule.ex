defmodule Site.RealtimeSchedule do
  @moduledoc """
  Struct and function for getting realtime schedule data.

  Notes:
    - predictions and schedules are indexed by route pattern name because we
      are considering route patterns with the same name to be effectively the same
  """

  alias Predictions.Prediction
  alias Predictions.Repo, as: PredictionsRepo
  alias RoutePatterns.RoutePattern
  alias Routes.Repo, as: RoutesRepo
  alias Routes.Route
  alias Schedules.Repo, as: SchedulesRepo
  alias Schedules.Schedule
  alias Site.JsonHelpers
  alias Site.TransitNearMe
  alias Stops.Repo, as: StopsRepo
  alias Stops.Stop

  # the long timeout is to address a worst-case scenario of cold schedule cache
  @long_timeout 15_000

  @predicted_schedules_per_stop 2

  @default_opts [
    stops_fn: &StopsRepo.get!/1,
    routes_fn: &RoutesRepo.by_stop_with_route_pattern/1,
    predictions_fn: &PredictionsRepo.all_no_cache/1,
    schedules_fn: &SchedulesRepo.by_route_ids/2
  ]

  @type route_with_patterns_t :: {
          Stop.id_t(),
          Route.t(),
          [RoutePattern.t()]
        }

  @type route_pattern_name_t :: String.t()

  @spec stop_data([Stop.id_t()], DateTime.t(), Keyword.t()) :: [map]
  def stop_data(stop_ids, now, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)
    stops_fn = Keyword.fetch!(opts, :stops_fn)
    routes_fn = Keyword.fetch!(opts, :routes_fn)
    predictions_fn = Keyword.fetch!(opts, :predictions_fn)
    schedules_fn = Keyword.fetch!(opts, :schedules_fn)

    # stage 1, get stops and routes
    stops_task = Task.async(fn -> get_stops(stop_ids, stops_fn) end)
    routes_task = Task.async(fn -> get_routes(stop_ids, routes_fn) end)
    [stops, route_with_patterns] = Enum.map([stops_task, routes_task], &Task.await/1)

    # stage 2, get predictions and schedules
    predictions_task =
      Task.async(fn -> get_predictions(route_with_patterns, now, predictions_fn) end)

    schedules_task = Task.async(fn -> get_schedules(route_with_patterns, now, schedules_fn) end)

    [predictions, schedules] =
      Enum.map([predictions_task, schedules_task], &Task.await(&1, @long_timeout))

    build_output(stops, route_with_patterns, schedules, predictions, now)
  end

  @spec get_stops([Stop.id_t()], fun()) :: map
  defp get_stops(stop_ids, stops_fn) do
    stop_ids
    |> Enum.map(
      &Task.async(fn ->
        {&1, &1 |> stops_fn.() |> Map.take([:id, :name, :accessibility, :address])}
      end)
    )
    |> Enum.into(%{}, &Task.await/1)
  end

  @spec get_routes([Stop.id_t()], fun()) :: [route_with_patterns_t]
  defp get_routes(stop_ids, routes_fn) do
    stop_ids
    |> Enum.map(
      &Task.async(fn ->
        &1
        |> routes_fn.()
        |> Enum.map(fn {route, route_patterns} ->
          {&1, JsonHelpers.stringified_route(route), route_patterns}
        end)
      end)
    )
    |> Enum.map(&Task.await/1)
    |> List.flatten()
  end

  @spec get_predictions([route_with_patterns_t], DateTime.t(), fun()) :: map
  defp get_predictions(route_with_patterns, now, predictions_fn) do
    route_with_patterns
    |> Enum.map(fn {stop_id, _route, route_patterns} ->
      Task.async(fn ->
        do_get_predictions(stop_id, route_patterns, now, predictions_fn)
      end)
    end)
    |> Enum.flat_map(&Task.await/1)
    |> Enum.into(%{})
  end

  @spec do_get_predictions(Stop.id_t(), [RoutePattern.t()], DateTime.t(), fun()) :: [
          {
            route_pattern_name_t,
            [Prediction.t()]
          }
        ]
  defp do_get_predictions(stop_id, route_patterns, now, predictions_fn) do
    route_patterns
    |> Enum.map(fn route_pattern ->
      Task.async(fn ->
        next_two_predictions =
          [
            stop: stop_id,
            route_pattern: route_pattern.id,
            min_time: now,
            sort: "time",
            "page[limit]": @predicted_schedules_per_stop
          ]
          |> predictions_fn.()

        {route_pattern.name, next_two_predictions}
      end)
    end)
    |> Enum.map(&Task.await/1)
  end

  @spec get_schedules([route_with_patterns_t], DateTime.t(), fun()) :: map
  defp get_schedules(route_with_patterns, now, schedules_fn) do
    route_with_patterns
    |> Enum.map(fn {stop_id, route, route_patterns} ->
      Task.async(fn ->
        do_get_schedules(route.id, stop_id, route_patterns, now, schedules_fn)
      end)
    end)
    |> Enum.flat_map(&Task.await(&1, @long_timeout))
    |> Enum.into(%{})
  end

  @spec do_get_schedules(String.t(), Stop.id_t(), [route_with_patterns_t], DateTime.t(), fun()) ::
          map
  defp do_get_schedules(route_id, stop_id, route_patterns, now, schedules_fn) do
    route_pattern_dictionary = make_route_pattern_dictionary(route_patterns)

    [route_id]
    |> schedules_fn.(min_time: now)
    |> Enum.filter(&(&1.stop.id == stop_id))
    |> Enum.group_by(& &1.trip.route_pattern_id)
    |> Enum.into(
      %{},
      fn {route_pattern_id, schedules} ->
        {Map.get(route_pattern_dictionary, route_pattern_id),
         schedules
         |> Enum.take(@predicted_schedules_per_stop)}
      end
    )
  end

  @spec make_route_pattern_dictionary([RoutePattern.t()]) :: map
  defp make_route_pattern_dictionary(route_patterns) do
    Enum.into(route_patterns, %{}, fn route_pattern -> {route_pattern.id, route_pattern.name} end)
  end

  @spec build_output(map, [route_with_patterns_t], map, map, DateTime.t()) :: [map]
  defp build_output(stops, route_with_patterns, schedules, predictions, now) do
    route_with_patterns
    |> Enum.map(fn {stop_id, route, route_patterns} ->
      unique_route_patterns = make_route_patterns_unique(route_patterns)

      %{
        stop: stops[stop_id],
        route: route,
        predicted_schedules_by_route_pattern:
          build_predicted_schedules_by_route_pattern(
            unique_route_patterns,
            schedules,
            predictions,
            now
          )
      }
    end)
  end

  @spec make_route_patterns_unique([RoutePattern.t()]) :: [RoutePattern.t()]
  defp make_route_patterns_unique(route_patterns) do
    Enum.uniq_by(route_patterns, & &1.name)
  end

  @spec build_predicted_schedules_by_route_pattern([RoutePattern.t()], map, map, DateTime.t()) ::
          map
  defp build_predicted_schedules_by_route_pattern(
         route_patterns,
         schedules_by_route_pattern,
         predictions_by_route_pattern,
         now
       ) do
    route_patterns
    |> Enum.map(fn %{name: name, direction_id: direction_id} ->
      schedules = Map.get(schedules_by_route_pattern, name, [])
      predictions = Map.get(predictions_by_route_pattern, name, [])

      {name, direction_id,
       predictions
       |> PredictedSchedule.group(schedules)
       |> Enum.map(&shrink_predicted_schedule(&1, now))}
    end)
    |> Enum.filter(fn {_name, _direction_id, predicted_schedules} ->
      !Enum.empty?(predicted_schedules)
    end)
    |> Enum.into(%{}, fn {name, direction_id, predicted_schedules} ->
      {name, %{direction_id: direction_id, predicted_schedules: predicted_schedules}}
    end)
  end

  @spec shrink_predicted_schedule(PredictedSchedule.t(), DateTime.t()) :: map
  defp shrink_predicted_schedule(%{schedule: schedule, prediction: prediction}, now) do
    %{
      prediction:
        prediction
        |> format_prediction_time(now)
        |> do_shrink_predicted_schedule(),
      schedule: schedule |> format_schedule_time() |> do_shrink_predicted_schedule()
    }
  end

  @spec do_shrink_predicted_schedule(Prediction.t() | Schedule.t() | nil) :: map | nil
  defp do_shrink_predicted_schedule(nil), do: nil

  defp do_shrink_predicted_schedule(prediction_or_schedule),
    do: Map.drop(prediction_or_schedule, [:stop, :trip, :route])

  @spec format_prediction_time(map | nil, DateTime.t()) :: map | nil
  defp format_prediction_time(nil, _), do: nil

  defp format_prediction_time(prediction, now) do
    seconds = DateTime.diff(prediction.time, now)
    route_type = Route.type_atom(prediction.route)

    %{
      prediction
      | time: TransitNearMe.format_prediction_time(prediction.time, now, route_type, seconds)
    }
  end

  @spec format_schedule_time(map | nil) :: map | nil
  defp format_schedule_time(nil), do: nil

  defp format_schedule_time(%{time: time} = schedule),
    do: %{schedule | time: TransitNearMe.format_time(time)}
end
