defmodule MBTA.Api.RoutePatterns do
  @moduledoc """
  Responsible for fetching Route Pattern data from the V3 API.
  """

  alias MBTA.Api
  alias Routes.Route

  @type api_response_t() :: JsonApi.t() | {:error, any}

  @spec all(Keyword.t()) :: api_response_t()
  def all(params \\ []) do
    Api.get_json("/route_patterns/", params)
  end

  @spec get(Route.id_t(), keyword()) :: api_response_t()
  def get(id, opts \\ []) do
    Api.get_json("/route_patterns/#{id}", opts)
  end
end
