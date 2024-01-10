defmodule PolylineHelpers do
  @moduledoc """
  Helpers for working with polylines
  """

  @doc """
  Polylines may be too long or verbose.
  this will apply the following optimizatoins:
  - if the line has more than ~400 points (500 bytes), it will decrease the number
  - if the polylines that are reduced have duplicate points, they are removed
  - the precision of individual points is set to 4 decimal places
  """
  @spec condense([String.t()]) :: [String.t()]
  def condense(polylines) do
    polylines
    |> Enum.reduce({[], MapSet.new()}, &do_condence_reduce/2)
    |> elem(0)
  end

  @spec do_condence_reduce(String.t(), {[String.t()], MapSet.t()}) :: {[String.t()], MapSet.t()}
  defp do_condence_reduce(polyline, {polylines, point_set}) do
    floor = fn x -> Float.floor(x, 4) end

    {new_decoded_polyline, new_point_set} =
      polyline
      |> Polyline.decode()
      |> do_pointlist_smoothing(polyline)
      |> Enum.map(fn {lat, lng} -> {floor.(lat), floor.(lng)} end)
      |> filter_distinct_points(point_set)

    if new_decoded_polyline == [] do
      {polylines, new_point_set}
    else
      polyline = Polyline.encode(new_decoded_polyline)
      {[polyline | polylines], new_point_set}
    end
  end

  @spec do_pointlist_smoothing([{float, float}], String.t()) :: [{float, float}]
  defp do_pointlist_smoothing(points, polyline) do
    score = div(byte_size(polyline), 500)

    if score == 0 do
      points
    else
      # this will properionally grow to reasonable levels of point extractions where:
      # score of 1: take every other, 2: take every fourth, 3 or above: take every sixth
      shortening_factor = 2 * min(score, 3)

      # we always include the last because otherwise the line may not end at correct coordinate
      Enum.take_every(points, shortening_factor) ++ [List.last(points)]
    end
  end

  @spec filter_distinct_points([{float, float}], MapSet.t()) :: {[{float, float}], MapSet.t()}
  defp filter_distinct_points(points, all_points) do
    # points is a List of points which makes them easier to encode into polylines without conversion
    # all points is a MapSet because it is more efficient for it to be distinct in terms of how it is used
    {points -- MapSet.to_list(all_points), MapSet.union(MapSet.new(points), all_points)}
  end
end
