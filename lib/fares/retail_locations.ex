defmodule Fares.RetailLocations do
  alias __MODULE__.Data
  alias __MODULE__.Location

  @doc """
    Takes a latitude and longitude and returns the four closest retail locations for purchasing fares.
  """
  @spec get_nearby(Dotcom.Utils.Position.t()) :: [{Location.t(), float}]
  def get_nearby(lat_long) do
    Data.build_r_tree()
    |> Data.k_nearest_neighbors(lat_long, 4)
    |> Enum.map(fn l -> {l, Dotcom.Utils.Distance.haversine(l, lat_long)} end)
  end
end
