defmodule Schedules.Repo.Behaviour do
  @moduledoc """
  Behavior for an API client for fetching trip and schedule data
  """

  alias Routes.Route
  alias Schedules.{Schedule, Trip}

  @callback by_route_ids([Route.id_t()], Keyword.t()) :: [Schedule.t()] | {:error, any}
  @callback by_route_ids([Route.id_t()]) :: [Schedule.t()] | {:error, any}

  @callback schedule_for_trip(Trip.id_t(), Keyword.t()) :: [Schedule.t()]
  @callback schedule_for_trip(Trip.id_t()) :: [Schedule.t()]

  @callback trip(Trip.id_t(), (Trip.id_t(), Keyword.t() -> JsonApi.t())) :: Trip.t() | nil
  @callback trip(Trip.id_t()) :: Trip.t() | nil

  @callback end_of_rating() :: Date.t() | nil
  @callback start_of_rating() :: Date.t() | nil
end
