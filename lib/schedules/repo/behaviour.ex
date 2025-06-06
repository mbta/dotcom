defmodule Schedules.Repo.Behaviour do
  @moduledoc """
  Behavior for an API client for fetching trip and schedule data
  """

  alias Schedules.{Schedule, Trip}

  @callback schedule_for_trip(Trip.id_t(), Keyword.t()) :: [Schedule.t()]
  @callback schedule_for_trip(Trip.id_t()) :: [Schedule.t()]

  @callback trip(Trip.id_t(), (Trip.id_t(), Keyword.t() -> JsonApi.t())) :: Trip.t() | nil
  @callback trip(Trip.id_t()) :: Trip.t() | nil
end
