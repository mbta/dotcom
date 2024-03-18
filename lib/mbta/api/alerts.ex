defmodule MBTA.Api.Alerts do
  @moduledoc """
  Responsible for fetching Alert data from the V3 API.
  """

  alias MBTA.Api

  @spec all() :: JsonApi.t() | {:error, any}
  def all(params \\ []) do
    Api.get_json("/alerts/", params)
  end
end
