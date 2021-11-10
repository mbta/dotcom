defmodule V3Api.Trips do
  @moduledoc """

  Responsible for fetching Trip data from the V3 API.

  """
  import V3Api

  def by_id(id, opts \\ []) do
    get_json("/trips/" <> id, opts)
  end

  def by_route(route_id, opts \\ []) do
    opts = put_in(opts[:route], route_id)
    get_json("/trips/", opts)
  end
end
