defprotocol Util.Position do
  @moduledoc "A protocol to map various datatypes to a latitude and longitude"

  @doc "The latitude of the item"
  def latitude(item)

  @doc "The longitude of the item"
  def longitude(item)
end

defimpl Util.Position, for: Map do
  def latitude(%{latitude: latitude}), do: latitude
  def longitude(%{longitude: longitude}), do: longitude
end

defimpl Util.Position, for: Tuple do
  def latitude({latitude, _}), do: latitude
  def longitude({_, longitude}), do: longitude
end

defimpl Util.Position, for: OpenTripPlannerClient.Schema.Place do
  def latitude(%OpenTripPlannerClient.Schema.Place{lat: latitude}), do: latitude
  def longitude(%OpenTripPlannerClient.Schema.Place{lon: longitude}), do: longitude
end
