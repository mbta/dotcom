defmodule Vehicles.Parser do
  @moduledoc false
  alias Vehicles.Vehicle

  @spec parse(JsonApi.Item.t()) :: Vehicle.t()
  def parse(
        %JsonApi.Item{id: id, attributes: attributes, relationships: relationships},
        opts \\ []
      ) do
    %Vehicle{
      id: id,
      route_id: optional_id(relationships["route"]),
      trip_id: optional_id(relationships["trip"]),
      shape_id: shape(relationships["trip"], opts),
      stop_id: stop_id(relationships["stop"], opts),
      direction_id: attributes["direction_id"],
      status: status(attributes["current_status"]),
      longitude: attributes["longitude"],
      latitude: attributes["latitude"],
      bearing: attributes["bearing"] || 0,
      crowding: crowding(attributes["occupancy_status"])
    }
  end

  @spec status(String.t()) :: Vehicle.status()
  defp status("STOPPED_AT"), do: :stopped
  defp status("INCOMING_AT"), do: :incoming
  defp status("IN_TRANSIT_TO"), do: :in_transit

  @spec optional_id([JsonApi.Item.t()]) :: String.t() | nil
  defp optional_id([]), do: nil
  defp optional_id([%JsonApi.Item{id: id}]), do: id

  @spec stop_id([JsonApi.Item.t()], Keyword.t()) :: Stops.Stop.id_t() | nil
  defp stop_id([%JsonApi.Item{id: stop_id}], opts) do
    parent_stations = Keyword.get(opts, :parent_stations, %{})
    Map.get(parent_stations, stop_id, stop_id)
  end

  defp stop_id(_, _) do
    nil
  end

  @spec shape([JsonApi.Item.t()], Keyword.t()) :: Routes.Shape.id_t() | nil
  defp shape([%JsonApi.Item{id: trip_id}], opts) do
    trip_shapes = Keyword.get(opts, :trip_shapes, %{})
    Map.get(trip_shapes, trip_id, nil)
  end

  defp shape(_, _) do
    nil
  end

  @spec crowding(String.t()) :: Vehicle.crowding() | nil
  defp crowding("MANY_SEATS_AVAILABLE"), do: :not_crowded
  defp crowding("FEW_SEATS_AVAILABLE"), do: :some_crowding
  defp crowding("FULL"), do: :crowded
  defp crowding(_), do: nil
end
