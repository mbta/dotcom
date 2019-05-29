defmodule V3Api.Stops do
  @moduledoc """

  Responsible for fetching Stop data from the V3 API.

  """
  import V3Api

  def all(params \\ []) do
    get_json("/stops/", params)
  end

  def by_gtfs_id(gtfs_id, params, opts \\ []) do
    get_json(
      "/stops/#{URI.encode(gtfs_id, &URI.char_unreserved?/1)}",
      params,
      opts
    )
  end
end
