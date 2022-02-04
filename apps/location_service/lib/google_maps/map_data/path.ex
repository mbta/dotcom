defmodule GoogleMaps.MapData.Path do
  @moduledoc """
  Represents a google map polyline path
  """

  @default_opts [color: "", weight: 5, dotted?: false]

  defstruct polyline: "",
            color: "",
            weight: 5,
            dotted?: false

  @type t :: %__MODULE__{
          polyline: String.t(),
          color: String.t(),
          weight: integer,
          dotted?: boolean
        }

  def new(polyline, user_opts \\ []) do
    opts = Keyword.merge(@default_opts, user_opts)

    %__MODULE__{
      polyline: polyline,
      color: opts[:color],
      weight: opts[:weight],
      dotted?: opts[:dotted?]
    }
  end

  @doc "formats a single path for a static map url"
  @spec format_static_path(t) :: String.t()
  def format_static_path(path) do
    formatted_color = "0x" <> path.color <> "FF"
    "weight:#{path.weight}|color:#{formatted_color}|enc:#{path.polyline}"
  end
end
