defmodule MBTA.Api.Schedules do
  @moduledoc """
  Responsible for fetching Schedule data from the V3 API.
  """

  alias MBTA.Api

  def all(params \\ []) do
    Api.get_json("/schedules/", params)
  end
end
