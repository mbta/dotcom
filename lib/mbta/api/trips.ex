defmodule MBTA.Api.Trips do
  @moduledoc """
  Responsible for fetching Trip data from the MBTA Api.
  """

  import MBTA.Api, only: [is_valid_potential_id: 1]

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def by_id(id, params \\ [])

  def by_id(id, params) when is_valid_potential_id(id) do
    @mbta_api.get_json("/trips/#{id}", params)
  end

  def by_id(id, _), do: {:error, {:invalid_id, id}}

  def by_route(route_id, params \\ []) do
    params = Kernel.put_in(params[:route], route_id)

    @mbta_api.get_json("/trips/", params)
  end
end
