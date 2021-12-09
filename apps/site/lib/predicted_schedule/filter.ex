defmodule PredictedSchedule.Filter do
  @moduledoc """
  Helpful functions for filtering, grouping and sorting PredictedSchedules
  """

  @stops_without_predictions [
    "place-lake",
    "place-clmnl",
    "place-river",
    "place-matt"
  ]

  @spec default_sort(PredictedSchedule.t()) ::
          {integer, non_neg_integer, non_neg_integer}
  def default_sort(%PredictedSchedule{schedule: nil, prediction: prediction}),
    do: {1, prediction.stop_sequence, to_unix(prediction.time)}

  def default_sort(%PredictedSchedule{schedule: schedule}),
    do: {2, schedule.stop_sequence, to_unix(schedule.time)}

  defp to_unix(%DateTime{} = time) do
    DateTime.to_unix(time)
  end

  defp to_unix(%NaiveDateTime{} = time) do
    time
    |> DateTime.from_naive!("Etc/UTC")
    |> to_unix()
  end

  defp to_unix(nil) do
    nil
  end

  def default_filter(predicted_schedules, now) do
    predicted_schedules
    |> Enum.reject(&PredictedSchedule.last_stop?/1)
    |> Enum.reject(&(PredictedSchedule.time(&1) == nil))
    |> Enum.reject(&(DateTime.compare(PredictedSchedule.time(&1), now) == :lt))
  end

  @doc """
  Special filtering of PredictedSchedules mainly used in TransitNearMe, where
  - we don't inadvertently omit PredictedSchedules for stops where we won't have predictions
  - if working with subway routes, returns only PredictedSchedules that have predictions
    - does not remove schedules without predictions for commuter rail, bus, or ferry
    - filters schedules without predictions for subway if predictions exist
    - returns empty list for subway if no predictions during normal hours
    - returns schedules for subway if no predictions during late night
  """
  @spec by_route_with_predictions(
          [PredictedSchedule.t()],
          Routes.Route.type_int(),
          Stops.Stop.id_t(),
          DateTime.t()
        ) :: [
          PredictedSchedule.t()
        ]
  def by_route_with_predictions(predicted_schedules, _route_type, stop_id, _now)
      when stop_id in @stops_without_predictions do
    predicted_schedules
  end

  def by_route_with_predictions(predicted_schedules, route_type, _stop_id, now)
      when route_type in [0, 1] do
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

  def by_route_with_predictions(predicted_schedules, _, _, _) do
    # all other modes can use schedules
    predicted_schedules
  end

  def late_night?(%DateTime{} = datetime) do
    time = DateTime.to_time(datetime)

    after_midnight?(time) and before_service_start?(time)
  end

  defp after_midnight?(%Time{} = time), do: Time.compare(time, ~T[00:00:00]) in [:eq, :gt]

  defp before_service_start?(%Time{} = time), do: Time.compare(time, ~T[03:00:00]) === :lt
end
