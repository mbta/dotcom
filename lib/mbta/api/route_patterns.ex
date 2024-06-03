defmodule MBTA.Api.RoutePatterns do
  @moduledoc """
  Responsible for fetching Route Pattern data from the V3 API.
  """

  import MBTA.Api, only: [is_valid_potential_id: 1]

  alias Routes.Route

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  @type api_response_t() :: JsonApi.t() | {:error, any}

  @spec all(Keyword.t()) :: api_response_t()
  def all(params \\ []) do
    @mbta_api.get_json("/route_patterns/", params)
  end

  @spec get(Route.id_t(), keyword()) :: api_response_t()
  def get(id, params \\ []) when is_valid_potential_id(id) do
    @mbta_api.get_json("/route_patterns/#{id}", params)
  end
end
