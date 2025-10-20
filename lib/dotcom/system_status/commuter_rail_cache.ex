defmodule Dotcom.SystemStatus.CommuterRailCache do
  @moduledoc """
  A GenServer that periodically computes commuter rail status and broadcasts changes when
  they happen
  """

  use GenServer

  alias Dotcom.SystemStatus.CommuterRail
  alias Dotcom.SystemStatus.CommuterRailCache.Behaviour

  @behaviour Behaviour

  @pubsub_topic "system_status:commuter_rail"

  # Client

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  @impl Behaviour
  def commuter_rail_status() do
    GenServer.call(__MODULE__, :commuter_rail_status)
  end

  @impl Behaviour
  def subscribe() do
    DotcomWeb.Endpoint.subscribe(@pubsub_topic)
  end

  # Server

  @impl true
  def init(_opts) do
    Alerts.Cache.Store.subscribe()

    {:ok, CommuterRail.commuter_rail_status()}
  end

  @impl true
  def handle_call(:commuter_rail_status, _from, status) do
    {:reply, status, status}
  end

  @impl true
  def handle_info(%{event: "alerts_updated"}, old_status) do
    new_status = CommuterRail.commuter_rail_status()

    if new_status != old_status do
      DotcomWeb.Endpoint.broadcast(@pubsub_topic, "commuter_rail_status_updated", new_status)
    end

    {:noreply, new_status}
  end
end
