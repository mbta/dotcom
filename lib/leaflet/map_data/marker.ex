defmodule Leaflet.MapData.Marker do
  @moduledoc """
  Represents a leaflet map marker.
  """
  @derive Jason.Encoder
  defstruct id: nil,
            icon: nil,
            icon_opts: nil,
            latitude: 0.0,
            longitude: 0.0,
            rotation_angle: 0,
            size: nil,
            tooltip: nil,
            tooltip_text: nil,
            z_index: nil,
            shape_id: nil,
            vehicle_crowding: nil

  @type t :: %__MODULE__{
          id: integer | nil,
          icon: String.t() | nil,
          icon_opts: map,
          latitude: float,
          longitude: float,
          rotation_angle: integer,
          size: [integer] | nil,
          tooltip: String.t() | nil,
          tooltip_text: String.t() | nil,
          z_index: integer,
          shape_id: String.t() | nil,
          vehicle_crowding: Vehicles.Vehicle.crowding()
        }

  def new(latitude, longitude, opts \\ []) do
    %__MODULE__{
      icon: Keyword.get(opts, :icon),
      icon_opts: Keyword.get(opts, :icon_opts),
      id: Keyword.get(opts, :id),
      latitude: latitude,
      longitude: longitude,
      rotation_angle: Keyword.get(opts, :rotation_angle, 0),
      size: Keyword.get(opts, :size),
      tooltip: Keyword.get(opts, :tooltip),
      tooltip_text: Keyword.get(opts, :tooltip_text),
      z_index: Keyword.get(opts, :z_index),
      shape_id: Keyword.get(opts, :shape_id),
      vehicle_crowding: Keyword.get(opts, :vehicle_crowding)
    }
  end
end
