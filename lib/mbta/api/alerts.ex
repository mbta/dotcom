defmodule MBTA.Api.Alerts do
  @moduledoc """
  Responsible for fetching Alert data from the V3 API.
  """

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def all(params \\ []) do
    @mbta_api.get_json("/alerts/", params)
  end
end
