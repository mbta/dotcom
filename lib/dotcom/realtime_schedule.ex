defmodule Dotcom.RealtimeSchedule do
  @moduledoc """
  Struct and function for getting realtime schedule data.

  Notes:
    - predictions and schedules are indexed by route pattern name because we
      are considering route patterns with the same name to be effectively the same
  """
  alias Dotcom.TransitNearMe
  alias Predictions.Prediction
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Stops.Stop

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @schedules_condensed_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules_condensed]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  # the long timeout is to address a worst-case scenario of cold schedule cache
  @long_timeout 15_000

  @predicted_schedules_per_stop 2

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]

  @type route_with_patterns_t :: {
          Stop.id_t(),
          Route.t(),
          [RoutePattern.t()]
        }

  @type route_pattern_name_t :: String.t()

  def stop_data(stop_ids) do
    stop_ids = Enum.sort(stop_ids)
    route_with_patterns = get_routes(stop_ids)
    stops = get_stops(stop_ids)
    predictions = get_predictions(route_with_patterns)
    schedules = get_schedules(route_with_patterns)
    alerts = get_alerts(route_with_patterns)
    build_output(stops, route_with_patterns, schedules, predictions, alerts)
  end

  @spec get_routes([Stop.id_t()]) :: [route_with_patterns_t]
  defp get_routes(stop_ids) do
    stop_ids
    |> Task.async_stream(
      fn stop_id ->
        stop_id
        |> @routes_repo.by_stop_with_route_pattern()
        |> Enum.map(fn {route, route_patterns} ->
          {stop_id, route, route_patterns}
        end)
      end,
      timeout: @long_timeout
    )
    |> Stream.filter(&match?({:ok, _}, &1))
    |> Enum.flat_map(fn {:ok, result} -> result end)
  end

  @spec get_stops([Stop.id_t()]) :: map
  defp get_stops(stop_ids) do
    stop_ids
    |> Task.async_stream(&@stops_repo.get/1, timeout: @long_timeout)
    |> Stream.filter(&match?({:ok, stop} when stop != nil, &1))
    |> Stream.map(fn {:ok, stop} -> {stop.id, stop_fields(stop)} end)
    |> Enum.into(%{})
  end

  @spec stop_fields(Stop.t() | nil) :: map
  defp stop_fields(nil) do
    %{}
  end

  defp stop_fields(stop) do
    Map.take(stop, [:id, :name, :accessibility, :address, :parking_lots])
  end

  defp get_alerts(route_with_patterns) do
    route_with_patterns
    |> Enum.map(fn {_stop_id, route, _patterns} -> route.id end)
    |> Enum.uniq()
    |> Task.async_stream(&{&1, alerts_for_route(&1)})
    |> Stream.filter(&match?({:ok, _}, &1))
    |> Stream.map(fn {:ok, result} -> result end)
    |> Enum.into(%{})
  end

  defp alerts_for_route(route_id) do
    [route_id]
    |> @alerts_repo.by_route_ids(Dotcom.Utils.DateTime.now())
    |> Enum.filter(&Alerts.Alert.high_severity_or_high_priority?(&1))
  end

  @spec get_predictions([route_with_patterns_t]) :: map
  defp get_predictions(route_with_patterns) do
    route_with_patterns
    |> Task.async_stream(
      fn {stop_id, _route, route_patterns} ->
        Enum.map(route_patterns, fn route_pattern ->
          key = route_pattern_key(route_pattern, stop_id)

          next_two_predictions =
            [
              stop: stop_id,
              route_pattern: route_pattern.id,
              sort: "time",
              "page[limit]": @predicted_schedules_per_stop
            ]
            |> @predictions_repo.all_no_cache()
            |> Enum.filter(& &1.time)

          {key, next_two_predictions}
        end)
      end,
      timeout: @long_timeout
    )
    |> Stream.filter(&match?({:ok, _}, &1))
    |> Stream.flat_map(fn {:ok, key_with_predictions} -> key_with_predictions end)
    |> Enum.reduce(%{}, fn {route_key, predictions}, accumulator ->
      data =
        if Map.has_key?(accumulator, route_key) do
          accumulator
          |> Map.get(route_key)
          |> Enum.concat(predictions)
          |> Enum.sort_by(& &1.time, DateTime)
        else
          predictions
        end

      Map.put(accumulator, route_key, data)
    end)
  end

  @spec get_schedules([route_with_patterns_t]) :: %{
          RoutePattern.id_t() => [Schedules.ScheduleCondensed.t()]
        }
  defp get_schedules(route_with_patterns) do
    route_with_patterns
    |> Task.async_stream(
      fn {stop_id, route, route_patterns} ->
        route_pattern_dictionary = make_route_pattern_dictionary(route_patterns, stop_id)

        schedules =
          case @schedules_condensed_repo.by_route_ids([route.id],
                 stop_ids: [stop_id],
                 min_time: Dotcom.Utils.DateTime.now()
               ) do
            {:error, _} -> []
            schedules -> schedules
          end

        schedules
        |> Enum.filter(&if Map.has_key?(&1, :stop_id), do: &1.stop_id == stop_id, else: false)
        |> Enum.group_by(& &1.route_pattern_id)
        |> Enum.map(fn {route_pattern_id, schedules} ->
          {Map.get(route_pattern_dictionary, route_pattern_id),
           Enum.take(schedules, @predicted_schedules_per_stop)}
        end)
      end,
      timeout: @long_timeout
    )
    |> Stream.filter(&match?({:ok, _}, &1))
    |> Stream.flat_map(fn {:ok, result} -> result end)
    |> Enum.into(%{})
  end

  @spec route_pattern_key(RoutePattern.t(), String.t()) :: String.t()
  defp route_pattern_key(route_pattern, stop_id) do
    "#{route_pattern.route_id}-#{stop_id}-#{route_pattern.name}"
  end

  @spec make_route_pattern_dictionary([RoutePattern.t()], String.t()) :: map
  defp make_route_pattern_dictionary(route_patterns, stop_id) do
    Enum.into(route_patterns, %{}, &{&1.id, route_pattern_key(&1, stop_id)})
  end

  @spec build_output(map, [route_with_patterns_t], map, map, map) :: [map]
  defp build_output(stops, route_with_patterns, schedules, predictions, alerts) do
    route_with_patterns
    |> Enum.map(fn {stop_id, route, route_patterns} ->
      unique_route_patterns = make_route_patterns_unique(route_patterns, stop_id)
      alerts = Map.get(alerts, route.id, [])

      %{
        stop: stops[stop_id],
        route: route |> Map.put(:alerts, alerts),
        predicted_schedules_by_route_pattern:
          build_predicted_schedules_by_route_pattern(
            stop_id,
            unique_route_patterns,
            schedules,
            predictions
          )
      }
    end)
  end

  @spec make_route_patterns_unique([RoutePattern.t()], String.t()) :: [RoutePattern.t()]
  defp make_route_patterns_unique(route_patterns, stop_id) do
    Enum.uniq_by(route_patterns, &route_pattern_key(&1, stop_id))
  end

  @spec build_predicted_schedules_by_route_pattern(
          String.t(),
          [RoutePattern.t()],
          map,
          map
        ) ::
          map
  defp build_predicted_schedules_by_route_pattern(
         stop_id,
         route_patterns,
         schedules_by_route_pattern,
         predictions_by_route_pattern
       ) do
    route_patterns
    |> Enum.map(fn %{name: name, direction_id: direction_id} = route_pattern ->
      key = route_pattern_key(route_pattern, stop_id)
      schedules = Map.get(schedules_by_route_pattern, key, [])
      predictions = Map.get(predictions_by_route_pattern, key, [])

      {name, direction_id,
       predictions
       |> PredictedSchedule.group(schedules)
       |> Enum.slice(0, 2)
       |> Enum.map(&shrink_predicted_schedule/1)}
    end)
    |> Enum.filter(fn {_name, _direction_id, predicted_schedules} ->
      !Enum.empty?(predicted_schedules)
    end)
    |> Enum.into(%{}, fn {name, direction_id, predicted_schedules} ->
      {name, %{direction_id: direction_id, predicted_schedules: predicted_schedules}}
    end)
  end

  @spec shrink_predicted_schedule(PredictedSchedule.t()) :: map
  defp shrink_predicted_schedule(%{schedule: schedule, prediction: prediction}) do
    %{
      prediction:
        prediction
        |> format_prediction_time()
        |> add_trip_headsign()
        |> do_shrink_predicted_schedule(),
      schedule: schedule |> format_schedule_time() |> do_shrink_predicted_schedule()
    }
  end

  @spec add_trip_headsign(map) :: map | nil
  defp add_trip_headsign(nil), do: nil

  defp add_trip_headsign(%{trip: trip} = prediction) do
    Map.put(prediction, :headsign, Map.get(trip, :headsign))
  end

  @spec do_shrink_predicted_schedule(Prediction.t() | ScheduleCondensed.t() | nil) :: map | nil
  defp do_shrink_predicted_schedule(nil), do: nil

  defp do_shrink_predicted_schedule(prediction_or_schedule),
    do: Map.drop(prediction_or_schedule, [:stop, :trip, :route, :stop_id, :trip_id])

  @spec format_prediction_time(map | nil) :: map | nil
  defp format_prediction_time(nil), do: nil

  defp format_prediction_time(prediction) do
    now = Dotcom.Utils.DateTime.now()
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
