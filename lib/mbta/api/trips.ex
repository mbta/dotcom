defmodule MBTA.Api.Trips do
  @moduledoc """
  Responsible for fetching Trip data from the MBTA Api.
  """

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def by_id(id, params \\ []) do
    @mbta_api.get_json("/trips/" <> id, params)
  end

  def by_route(route_id, params \\ []) do
    params = Kernel.put_in(params[:route], route_id)

    @mbta_api.get_json("/trips/", params)
  end
end
