defmodule Schedules.ByStop.SchedulesByStopRepo do
  @moduledoc "Repo for getting departure information about all the routes at a given stop"

  alias MBTA.Api.Schedules
  alias Schedules.ByStop.Departures

  @default_params [
    include: "trip",
    "fields[schedule]": "departure_time,arrival_time",
    "fields[trip]": "name,headsign,direction_id"
  ]

  @spec departures_for_stop(Stop.id_t(), Keyword.t()) :: [Departures.t()] | {:error, any}
  def departures_for_stop(stop_id, opts) do
    @default_params
    |> Keyword.merge(opts)
    |> Keyword.put(:stop, stop_id)
    |> all_from_params
  end

  @spec all_from_params(Keyword.t()) :: [Departures.t()] | {:error, any}
  defp all_from_params(params) do
    with %JsonApi{data: data} <- Schedules.all(params) do
      data
      |> Stream.map(&Departures.parse_from_schedule_json/1)
    end
  end
end
