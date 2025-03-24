defmodule Schedules.RepoCondensed.Behaviour do
  @moduledoc """
  Behaviour for fetching schedules
  """
  alias Routes.Route
  alias Schedules.ScheduleCondensed

  @callback by_route_ids([Route.id_t()]) :: [ScheduleCondensed.t()] | {:error, any}
  @callback by_route_ids([Route.id_t()], Keyword.t()) :: [ScheduleCondensed.t()] | {:error, any}
end
