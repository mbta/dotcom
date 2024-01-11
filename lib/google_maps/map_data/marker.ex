defmodule GoogleMaps.MapData.Marker do
  @moduledoc """
  Represents a google map marker. Markers with `visible?` as
  false will not be shown on the map, but will still be used in
  centering the map.
  """

  alias GoogleMaps.MapData.Symbol

  defmodule Label do
    @type t :: %__MODULE__{
            color: String.t() | nil,
            font_family: String.t() | nil,
            font_size: String.t() | nil,
            font_weight: String.t() | nil,
            text: String.t() | nil
          }

    defstruct [
      :color,
      :font_family,
      :font_size,
      :font_weight,
      :text
    ]
  end

  @type size :: :tiny | :small | :mid | :large
  @default_opts [icon: nil, size: :mid, visible?: true, tooltip: nil, z_index: 0]

  defstruct id: nil,
            latitude: 0.0,
            longitude: 0.0,
            icon: nil,
            visible?: true,
            size: :mid,
            tooltip: nil,
            z_index: 0,
            label: nil

  @type t :: %__MODULE__{
          id: integer | nil,
          latitude: float,
          longitude: float,
          icon: String.t() | Symbol.t() | nil,
          visible?: boolean,
          size: size,
          tooltip: String.t() | nil,
          z_index: integer,
          label: Label.t() | nil
        }

  def new(latitude, longitude, opts \\ []) do
    map_options = Keyword.merge(@default_opts, opts)

    %__MODULE__{
      id: map_options[:id],
      latitude: latitude,
      longitude: longitude,
      icon: map_options[:icon],
      visible?: map_options[:visible?],
      size: map_options[:size],
      tooltip: map_options[:tooltip],
      z_index: map_options[:z_index],
      label: map_options[:label]
    }
  end

  @doc "Formats a single marker for a static map"
  @spec format_static_marker(t) :: String.t()
  def format_static_marker(marker) do
    Enum.join([marker.latitude, marker.longitude], ",")
  end
end
