defmodule PredictedSchedule.Repo do
  use Nebulex.Caching.Decorators

  alias Dotcom.Utils.ServiceDateTime

  @cache Application.compile_env!(:dotcom, :cache)
  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  @ttl :timer.seconds(1)

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def predicted_schedules_for_stop(%{
        direction_id: direction_id,
        now: now,
        route_id: route_id,
        stop_id: stop_id
      }) do
    predictions =
      @predictions_repo.all(
        direction_id: direction_id,
        discard_past_subway_predictions: false,
        include_terminals: true,
        route: route_id
      )
      |> Enum.filter(&(&1.stop.id == stop_id))

    schedules =
      @schedules_repo.by_route_ids([route_id],
        direction_id: direction_id,
        date: ServiceDateTime.service_date(now),
        stop_ids: [stop_id]
      )

    PredictedSchedule.group(predictions, schedules)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def predicted_schedules_for_trip(%{
        trip_id: trip_id
      }) do
    predictions =
      @predictions_repo.all(
        trip: trip_id,
        include_terminals: true,
        discard_past_subway_predictions: false
      )

    schedules = @schedules_repo.schedule_for_trip(trip_id)

    PredictedSchedule.group(predictions, schedules)
  end
end
