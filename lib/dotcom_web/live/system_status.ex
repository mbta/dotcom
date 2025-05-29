defmodule DotcomWeb.Live.SystemStatus do
  @moduledoc """
  A temporary LiveView showing PubSub and Nebulex for real-time cached data.
  """

  use DotcomWeb, :live_view

  import Dotcom.SystemStatus.CommuterRail, only: [commuter_rail_status: 0]
  import DotcomWeb.Components.SystemStatus.CommuterRailStatus, only: [alerts_commuter_rail_status: 1]

  def mount(_params, _session, socket) do
    if connected?(socket) do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, "commuter-rail-system-status")
    end

    {:ok, assign(socket, :status, commuter_rail_status())}
  end

  def handle_info({:commuter_rail_status, status}, socket) do
    {:noreply, assign(socket, :status, status)}
  end

  def render(assigns) do
    ~H"""
    <div class="p-4">
      <.alerts_commuter_rail_status commuter_rail_status={@status} />
    </div>
    """
  end
end
