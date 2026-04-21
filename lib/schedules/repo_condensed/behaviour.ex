defmodule Schedules.RepoCondensed.Behaviour do
  @moduledoc """
  Behaviour for fetching schedules
  """
  alias Routes.Route
  alias Schedules.ScheduleCondensed
  alias Stops.Stop

  @callback by_route_ids([Route.id_t()]) :: [ScheduleCondensed.t()] | {:error, any}
  @callback by_route_ids([Route.id_t()], Keyword.t()) :: [ScheduleCondensed.t()] | {:error, any}

  @callback last_departure_datetime(Route.id_t(), 0 | 1, Stop.id_t(), Date.t()) ::
              DateTime.t() | nil
end
