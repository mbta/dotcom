defmodule MBTA.Api.Trips do
  @moduledoc """
  Responsible for fetching Trip data from the MBTA Api.
  """

  alias MBTA.Api

  def by_id(id, opts \\ []) do
    Api.get_json("/trips/" <> id, opts)
  end

  def by_route(route_id, opts \\ []) do
    opts = Kernel.put_in(opts[:route], route_id)

    Api.get_json("/trips/", opts)
  end
end
