defmodule MBTA.Api.Services do
  @moduledoc """
  Fetches Service data from the MBTA V3 API.
  """

  import MBTA.Api, only: [is_valid_potential_id: 1]

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def all(params \\ []) do
    @mbta_api.get_json("/services/", params)
  end

  def get(id, params \\ []) when is_valid_potential_id(id) do
    @mbta_api.get_json("/services/#{id}", params)
  end
end
