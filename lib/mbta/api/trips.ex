defmodule MBTA.Api.Trips do
  @moduledoc """
  Responsible for fetching Trip data from the MBTA Api.
  """

  @mbta_api Application.compile_env!(:dotcom, :mbta_api)

  def by_id(id, opts \\ []) do
    @mbta_api.get_json("/trips/" <> id, opts)
  end

  def by_route(route_id, opts \\ []) do
    opts = Kernel.put_in(opts[:route], route_id)

    @mbta_api.get_json("/trips/", opts)
  end
end
