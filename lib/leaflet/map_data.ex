defmodule Leaflet.MapData do
  @moduledoc """
  Represents leaflet map data.
  """
  alias Leaflet.MapData.{
    Marker,
    Polyline
  }

  @type lat_lng :: %{latitude: float, longitude: float}

  @derive Jason.Encoder
  defstruct default_center: %{latitude: 42.360718, longitude: -71.05891},
            height: 0,
            markers: [],
            stop_markers: [],
            polylines: [],
            tile_server_url: "",
            width: 0,
            zoom: nil,
            id: ""

  @type t :: %__MODULE__{
          default_center: lat_lng,
          height: integer,
          markers: [Marker.t()],
          stop_markers: [Marker.t()],
          polylines: [Polyline.t()],
          tile_server_url: String.t(),
          width: integer,
          zoom: integer | nil,
          id: String.t()
        }

  def new({width, height}, zoom \\ nil) do
    %__MODULE__{
      width: width,
      height: height,
      zoom: zoom
    }
  end

  def add_marker(map_data, marker) do
    %{map_data | markers: [marker | map_data.markers]}
  end

  def add_stop_marker(map_data, marker) do
    %{map_data | stop_markers: [marker | map_data.stop_markers]}
  end

  def add_markers(map_data, markers) do
    Enum.reduce(markers, map_data, &add_marker(&2, &1))
  end

  def add_stop_markers(map_data, markers) do
    Enum.reduce(markers, map_data, &add_stop_marker(&2, &1))
  end

  def add_polyline(map_data, %Polyline{} = polyline) do
    %{map_data | polylines: [polyline | map_data.polylines]}
  end

  def add_polylines(map_data, polylines) do
    Enum.reduce(polylines, map_data, &add_polyline(&2, &1))
  end
end
