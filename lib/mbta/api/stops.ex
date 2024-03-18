defmodule MBTA.Api.Stops do
  @moduledoc """
  Responsible for fetching Stop data from the V3 API.
  """

  alias MBTA.Api

  def all(params \\ []) do
    Api.get_json("/stops/", params)
  end

  def by_gtfs_id(gtfs_id, params, opts \\ []) do
    Api.get_json(
      "/stops/#{gtfs_id}",
      params,
      opts
    )
  end
end
