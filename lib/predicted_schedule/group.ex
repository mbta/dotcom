defmodule PredictedSchedule.Group do
  alias Predictions.Prediction
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop

  @type schedule_pair_t :: {Schedule.t(), Schedule.t()}
  @type schedule_or_pair :: Schedule.t() | schedule_pair_t
  @type stop_id_to_prediction_map_t :: %{Stops.Stop.id_t() => Prediction.t()}
  @type map_key_t :: Trip.t() | Prediction.id_t()
  @type prediction_map_entry_t :: {map_key_t, stop_id_to_prediction_map_t}
  @type prediction_map_t :: %{map_key_t => stop_id_to_prediction_map_t}

  @doc "Groups predictions by stop_id and trip and builds a map %{Trip => %{stop_id => Prediction}}."
  def build_prediction_map(predictions, schedules, origin_id, destination_id) do
    predictions
    |> Enum.reduce(%{}, &prediction_map_builder/2)
    |> filter_relevant_predictions(schedules, origin_id, destination_id)
  end

  defp prediction_map_builder(prediction, prediction_map) do
    key = prediction.trip || prediction.id

    stop_id_prediction_map =
      prediction_map
      |> Map.get(key, %{})
      |> Map.put(prediction.stop.id, prediction)

    Map.put(prediction_map, key, stop_id_prediction_map)
  end

  # Only leave the entries where the predictions are for the trips that match user selected origin and destination
  # If we don't have a destination (only origin), we can safely assume that the `prediction_map` we built only
  # contains the predictions for that origin going in the right direction.
  # If however we also have a destination, then we need to make sure that the predictions
  # for that destination are for the right trips. There might be predictions for arrivals that did not originate
  # at the user selected stop.
  # So, we filter the predictions so that they
  # 1) either match up to the schedule pairs, or
  # 2) we have two predictions with the same trip_id, and one of them is for the departure stop and the other
  # for the destination.

  defp filter_relevant_predictions(prediction_map, _schedules, _origin_id, nil),
    do: prediction_map

  defp filter_relevant_predictions(prediction_map, schedules, origin_id, destination_id) do
    schedule_trip_id_set = trip_ids_for_destination(schedules, destination_id)

    prediction_map
    |> Enum.filter(
      &prediction_map_entry_relevant?(&1, origin_id, destination_id, schedule_trip_id_set)
    )
    |> Enum.into(%{})
  end

  defp prediction_map_entry_relevant?(
         {%Trip{id: trip_id}, stop_id_prediction_map},
         origin_id,
         destination_id,
         schedule_trip_id_set
       ) do
    trip_id in schedule_trip_id_set or
      Enum.all?([origin_id, destination_id], &Map.has_key?(stop_id_prediction_map, &1))
  end

  defp prediction_map_entry_relevant?(
         {_, _stop_id_prediction_map},
         _origin_id,
         _destination_id,
         _schedule_trip_id_set
       ) do
    false
  end

  defp trip_ids_for_destination(_schedules, nil), do: MapSet.new()
  defp trip_ids_for_destination(nil, _destination_id), do: MapSet.new()

  defp trip_ids_for_destination(schedules, destination_id) do
    MapSet.new(
      schedules,
      fn
        {_dep_schedule, %Schedule{trip: %Trip{id: trip_id}, stop: %Stop{id: ^destination_id}}} ->
          trip_id

        _ ->
          nil
      end
    )
  end
end
