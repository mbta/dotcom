defmodule PredictedSchedule.Repo do
  require Logger

  def get(route_id, stop_id, opts \\ []) do
    # defaults
    opts =
      Keyword.merge(
        [
          sort_fn: &PredictedSchedule.Filter.default_sort/1,
          now: Util.now(),
          schedules_fn: &Schedules.Repo.by_route_ids/2,
          predictions_fn: &Predictions.Repo.all/1
        ],
        opts
      )

    date = Keyword.get(opts, :now)

    schedules =
      get_schedules(route_id, stop_id, Keyword.put(opts, :date, Util.service_date(date)))

    # if there are any schedules without a trip, maybe we need to...
    # force another hit of the endpoint without using the cache??
    # because the trip ids in the cache has probably been changed during a deploy
    schedules =
      if is_list(schedules) &&
           Enum.any?(schedules, &schedule_without_trip/1) do
        get_schedules(route_id, stop_id, Keyword.put(opts, :no_cache, true))
      else
        schedules
      end

    case schedules do
      %{} ->
        %{}

      _ ->
        get_predictions(route_id, stop_id, opts)
        |> PredictedSchedule.build(schedules, opts)
        |> (fn
              [] ->
                # if there are no schedules left for today, get schedules for tomorrow
                tomorrow_schedules =
                  get_schedules(
                    route_id,
                    stop_id,
                    Keyword.put(opts, :date, Util.tomorrow_date(date))
                  )

                PredictedSchedule.build([], tomorrow_schedules, opts)

              ps ->
                ps
            end).()
        |> PredictedSchedule.Filter.default_filter(date)
    end
  end

  defp get_schedules(route_id, stop_id, opts) do
    schedules_fn = Keyword.get(opts, :schedules_fn)
    routes = expand_route_id(route_id)
    schedules = schedules_fn.(routes, Keyword.put(opts, :stop_ids, stop_id))

    case schedules do
      {:error, [%JsonApi.Error{code: "no_service"}]} ->
        %{}

      {:error, error} ->
        _ =
          Logger.warn(
            "module=#{__MODULE__} route_id=#{route_id} stop_id=#{stop_id} date=#{
              Date.to_string(Keyword.get(opts, :date))
            } Other error fetching schedule: #{inspect(error)}"
          )

        %{}

      _ ->
        schedules
    end
  end

  @spec expand_route_id(Route.id_t()) :: [Route.id_t()]
  defp expand_route_id("Green"), do: GreenLine.branch_ids()
  defp expand_route_id(route), do: [route]

  defp schedule_without_trip(schedule) do
    Map.get(schedule, :trip) |> is_nil()
  end

  defp get_predictions(route_id, stop_id, opts) do
    predictions_fn = Keyword.get(opts, :predictions_fn)
    direction_id = Keyword.get(opts, :direction_id)

    [route: route_id, stop: stop_id, direction_id: direction_id]
    |> predictions_fn.()
  end
end
