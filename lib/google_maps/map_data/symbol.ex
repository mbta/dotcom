defmodule GoogleMaps.MapData.Symbol do
  @moduledoc """
  Represents the Symbol version of a marker icon.
  Javascript parses the data into the correct format for the Google API.

  https://developers.google.com/maps/documentation/javascript/reference/marker#Symbol
  """

  alias GoogleMaps.MapData.Point

  defstruct [
    :anchor,
    :fill_color,
    :fill_opacity,
    :label_origin,
    :path,
    :rotation,
    :scale,
    :stroke_color,
    :stroke_opacity,
    :stroke_weight
  ]

  # https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath
  @type path ::
          :forward_closed_arrow
          | :forward_open_arrow
          | :backwards_closed_arrow
          | :backwards_open_arrow
          | :circle

  @type t :: %__MODULE__{
          anchor: Point.t() | nil,
          fill_color: String.t() | nil,
          fill_opacity: integer | nil,
          label_origin: Point.t() | nil,
          path: path | String.t(),
          rotation: float | nil,
          scale: integer | nil,
          stroke_color: String.t() | nil,
          stroke_opacity: integer | nil,
          stroke_weight: integer | nil
        }

  @spec new(Keyword.t()) :: t
  def new(opts) do
    {size, opts} = Keyword.pop(opts, :size)

    __MODULE__
    |> struct(opts)
    |> scale(size)
  end

  @spec scale(t, atom | nil) :: t
  defp scale(%__MODULE__{} = symbol, size) do
    %{symbol | scale: get_scale(size)}
  end

  @spec get_scale(atom | nil) :: integer
  defp get_scale(:tiny), do: 3
  defp get_scale(:small), do: 5
  defp get_scale(:mid), do: 8
  defp get_scale(:large), do: 10
  defp get_scale(nil), do: get_scale(:mid)
end
