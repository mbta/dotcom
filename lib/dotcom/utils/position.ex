defprotocol Dotcom.Utils.Position do
  @moduledoc "A protocol to map various datatypes to a latitude and longitude"

  @doc "The latitude of the item"
  def latitude(item)

  @doc "The longitude of the item"
  def longitude(item)
end

defimpl Dotcom.Utils.Position, for: Map do
  def latitude(%{latitude: latitude}), do: latitude
  def longitude(%{longitude: longitude}), do: longitude
end

defimpl Dotcom.Utils.Position, for: Tuple do
  def latitude({latitude, _}), do: latitude
  def longitude({_, longitude}), do: longitude
end
