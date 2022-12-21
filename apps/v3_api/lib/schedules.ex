defmodule V3Api.Schedules do
  @moduledoc """

  Responsible for fetching Schedule data from the V3 API.

  """
  import V3Api

  def all(params \\ []) do
    IO.inspect(params)
    get_json("/schedules/", params)
  end
end
