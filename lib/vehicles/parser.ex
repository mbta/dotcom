defmodule Vehicles.Parser do
  @moduledoc false
  alias Vehicles.Vehicle

  def parse(%JsonApi.Item{id: id, attributes: attributes, relationships: relationships}) do
    %Vehicle{
      id: id,
      route_id: optional_id(relationships["route"]),
      trip_id: optional_id(relationships["trip"]),
      stop_id: optional_id(relationships["stop"]),
      direction_id: attributes["direction_id"],
      status: status(attributes["current_status"]),
      longitude: attributes["longitude"],
      latitude: attributes["latitude"],
      bearing: attributes["bearing"] || 0,
      crowding: crowding(attributes["occupancy_status"])
    }
  end

  defp status("STOPPED_AT"), do: :stopped
  defp status("INCOMING_AT"), do: :incoming
  defp status("IN_TRANSIT_TO"), do: :in_transit

  defp optional_id([]), do: nil
  defp optional_id([%JsonApi.Item{id: id}]), do: id

  defp crowding("MANY_SEATS_AVAILABLE"), do: :not_crowded
  defp crowding("FEW_SEATS_AVAILABLE"), do: :some_crowding
  defp crowding("FULL"), do: :crowded
  defp crowding(_), do: nil
end
