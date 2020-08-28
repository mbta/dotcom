defmodule Zones.Repo.StationZones do
  @moduledoc """
  Provide zone info for all stations.
  """

  @filename "priv/crzones.csv"
  @external_resource @filename

  def zone_info do
    @filename
    |> File.stream!()
    |> CSV.decode!()
    |> Enum.reduce(Map.new(), fn [station, zone], station_zone_map ->
      Map.put(station_zone_map, station, zone)
    end)
  end
end

defmodule Zones.Repo do
  @moduledoc """
  Manages a repository of station zone data.
  """

  import Zones.Repo.StationZones
  @station_zones zone_info()

  def get(stop) do
    @station_zones[stop]
  end

  def all do
    @station_zones
  end
end
