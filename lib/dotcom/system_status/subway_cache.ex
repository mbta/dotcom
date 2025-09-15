defmodule Dotcom.SystemStatus.SubwayCache do
  @moduledoc """
  A GenServer that periodically computes subway status and broadcasts changes when
  they happen
  """

  use GenServer

  alias Dotcom.SystemStatus
  alias Dotcom.SystemStatus.SubwayCache.Behaviour

  @behaviour Behaviour

  @pubsub_topic "system_status:subway"

  # Client

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  @impl Behaviour
  def subway_status() do
    GenServer.call(__MODULE__, :subway_status)
  end

  @impl Behaviour
  def subscribe() do
    DotcomWeb.Endpoint.subscribe(@pubsub_topic)
  end

  # Server

  @impl true
  def init(_opts) do
    Phoenix.PubSub.subscribe(Dotcom.PubSub, "alerts")

    {:ok, status()}
  end

  @impl true
  def handle_call(:subway_status, _from, status) do
    {:reply, status, status}
  end

  @impl true
  def handle_info(:alerts_updated, old_status) do
    new_status = status()

    if new_status != old_status do
      DotcomWeb.Endpoint.broadcast(@pubsub_topic, "subway_status_updated", new_status)
    end

    {:noreply, new_status}
  end

  defp status() do
    SystemStatus.subway_status()
  end
end
