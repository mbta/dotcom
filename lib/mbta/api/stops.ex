defmodule MBTA.Api.Stops do
  @moduledoc """
  Responsible for fetching Stop data from the V3 API.
  """

  import MBTA.Api, only: [is_valid_potential_id: 1]

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def all(params \\ []) do
    @mbta_api.get_json("/stops/", params ++ [include: "child_stops"])
  end

  def by_gtfs_id(gtfs_id, params \\ [])

  def by_gtfs_id(gtfs_id, params) when is_valid_potential_id(gtfs_id) do
    @mbta_api.get_json("/stops/#{gtfs_id}", params)
  end

  def by_gtfs_id(gtfs_id, _), do: {:error, {:invalid_id, gtfs_id}}
end
