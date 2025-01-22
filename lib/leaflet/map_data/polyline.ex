defmodule Leaflet.MapData.Polyline do
  @moduledoc """
  Builds a struct for rendering a polyline on a Leaflet map.
  """
  alias RoutePatterns.RoutePattern

  @derive Jason.Encoder
  defstruct color: "#000000",
            dotted?: false,
            id: "",
            positions: [],
            weight: 5

  @type t :: %__MODULE__{
          color: String.t(),
          dotted?: boolean,
          id: String.t(),
          positions: [[float(), ...]],
          weight: integer
        }

  @default_opts [color: "#000000", weight: 5, dotted?: false]

  @spec new(RoutePattern.t() | String.t(), Keyword.t()) :: t()
  def new(route_pattern, user_opts \\ [])

  def new(%RoutePattern{representative_trip_polyline: polyline, shape_id: id}, user_opts) when is_binary(polyline) do
    positions =
      polyline
      |> Polyline.decode()
      |> Enum.map(fn {lng, lat} -> [lat, lng] end)

    opts = Keyword.merge(@default_opts, user_opts)

    %__MODULE__{
      color: opts[:color],
      dotted?: opts[:dotted?],
      id: id,
      positions: positions,
      weight: opts[:weight]
    }
  end

  def new(polyline, user_opts) when is_binary(polyline) do
    positions =
      polyline
      |> Polyline.decode()
      |> Enum.map(fn {lng, lat} -> [lat, lng] end)

    opts = Keyword.merge(@default_opts, user_opts)

    %__MODULE__{
      color: opts[:color],
      dotted?: opts[:dotted?],
      positions: positions,
      weight: opts[:weight]
    }
  end
end
