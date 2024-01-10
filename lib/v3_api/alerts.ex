defmodule V3Api.Alerts do
  @moduledoc """

  Responsible for fetching Alert data from the V3 API.

  """
  import V3Api

  @spec all() :: JsonApi.t() | {:error, any}
  def all(params \\ []) do
    get_json("/alerts/", params)
  end
end
