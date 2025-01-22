defmodule DotcomWeb.VehicleChannel do
  @moduledoc """
  Channel allowing clients to subscribe to streams of vehicles
  """
  use DotcomWeb, :channel

  intercept(["reset", "add", "update", "remove"])

  @impl Phoenix.Channel
  def join("vehicles-v2:" <> _params, %{}, socket) do
    {:ok, socket}
  end

  @impl Phoenix.Channel
  def handle_in("init", %{"route_id" => route_id, "direction_id" => direction_id}, socket) do
    vehicles = Vehicles.Repo.route(route_id, direction_id: String.to_integer(direction_id))
    push(socket, "data", %{event: "reset", data: vehicles})
    {:noreply, socket}
  end

  @impl Phoenix.Channel
  def handle_out(event, %{data: vehicles}, socket) when event in ["reset", "add", "update", "remove"] do
    # Pushing as "data" message for consistency with vehicle_channel
    push(socket, "data", %{event: event, data: vehicles})
    {:noreply, socket}
  end
end
