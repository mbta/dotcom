defmodule PredictedSchedule.Schedules do
  @moduledoc """
  Provides current predicted schedules
  """

  alias Site.TransitNearMe

  def get_schedules(route_id, stop_id, opts \\ []) do
    schedules_fn = &Schedules.Repo.by_route_ids/2
    now = Util.now()
    direction_id = Keyword.get(opts, :direction_id)

    schedules =
      [route_id]
      |> schedules_fn.(
        stop_ids: stop_id,
        min_time: now,
        direction_id: direction_id
      )

    [route: route_id, stop: stop_id, min_time: now, direction_id: direction_id]
    |> Predictions.Repo.all()
    |> PredictedSchedule.group(schedules)
    |> case do
      [_ | _] = ps ->
        ps

      [] ->
        # if there are no schedules left for today, get schedules for tomorrow
        PredictedSchedule.group(
          [],
          schedules_fn.(
            [route_id],
            stop_ids: stop_id,
            direction_id: direction_id,
            date: TransitNearMe.tomorrow_date(now)
          )
        )
    end
    |> Enum.reject(&PredictedSchedule.last_stop?/1)
    |> Enum.reject(&(PredictedSchedule.time(&1) == nil))
  end
end
