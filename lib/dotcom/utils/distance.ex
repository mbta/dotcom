defmodule Dotcom.Utils.Distance do
  @moduledoc """

  Helper functions for working with distances between Dotcom.Utils.Position items.

  """

  import Dotcom.Utils.Position

  alias Fares.ProposedLocations.Location
  alias Dotcom.Utils.Position

  @degrees_to_radians :math.pi() / 180
  # mean diameter in miles
  @globe_diameter 3958.7613 * 2

  @doc "Sorts the items by their distance from position."
  @spec sort([Position.t()] | [Location.t()], Position.t() | Location.t()) :: [Position.t()]
  def sort(items, position) do
    items
    |> Enum.sort_by(&haversine(position, &1))
  end

  @doc "Returns count items closest to position"
  @spec closest([Position.t()], Position.t(), non_neg_integer) :: [Position.t()]
  def closest(items, position, count)
  def closest([], _, _), do: []
  def closest(_, _, 0), do: []

  def closest(items, position, count) do
    items
    |> Enum.sort_by(&haversine(position, &1))
    |> Enum.take(count)
  end

  @doc "Return the haversine distance between the two positions"
  @spec haversine(Position.t() | Location.t(), Position.t() | Location.t()) :: float
  def haversine(first, second) do
    lat1 = latitude(first)
    lat2 = latitude(second)
    delta_lat = (lat1 - lat2) * @degrees_to_radians
    delta_lon = (longitude(first) - longitude(second)) * @degrees_to_radians
    lat1_radians = lat1 * @degrees_to_radians
    lat2_radians = lat2 * @degrees_to_radians

    @globe_diameter *
      :math.asin(
        :math.sqrt(
          sin2(delta_lat / 2) +
            :math.cos(lat1_radians) * :math.cos(lat2_radians) * sin2(delta_lon / 2)
        )
      )
  end

  defp sin2(value) do
    :math.pow(:math.sin(value), 2)
  end
end
