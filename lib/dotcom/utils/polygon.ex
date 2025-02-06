defmodule Dotcom.Utils.Polygon do
  @moduledoc """
  Utilities to work with polygons. A polygon is represented as list of items implementing Dotcom.Utils.Position behaviour
  """
  alias Dotcom.Utils.Position

  @doc """
  Checks if a point is inside a polygon or not
  ## Example
      iex> Dotcom.Utils.Polygon.inside?([{0, 0}, {0, 2}, {2, 2}, {2, 0}], {1, 1})
      true
      iex> Dotcom.Utils.Polygon.inside?([{0, 0}, {0, 2}, {2, 2}, {2, 0}], {1, 3})
      false
  """
  @spec inside?(nonempty_list(Position.t()), Position.t()) :: boolean
  def inside?(polygons, pos) do
    x_point = Position.latitude(pos)
    y_point = Position.longitude(pos)
    start_point = length(polygons) - 1

    {inside, _} =
      polygons
      |> Enum.with_index()
      |> Enum.reduce({false, start_point}, fn {{xi, yi}, idx}, {inside, itr_point} ->
        {xj, yj} = Enum.at(polygons, itr_point)

        intersect =
          yi > y_point != yj > y_point && x_point < (xj - xi) * (y_point - yi) / (yj - yi) + xi

        inside = if intersect, do: not inside, else: inside
        {inside, idx}
      end)

    inside
  end
end
