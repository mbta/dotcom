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
    :ets.lookup(:subway_status, "status")
    |> case do
      [{"status", status}] ->
        status

      _ ->
        status = status()
        :ets.insert(:subway_status, {"status", status})

        status
    end
  end

  @impl Behaviour
  def subscribe() do
    DotcomWeb.Endpoint.subscribe(@pubsub_topic)
  end

  # Server

  @impl true
  def init(_opts) do
    Alerts.Cache.Store.subscribe()

    status = status()

    :ets.new(:subway_status, [:named_table, :set, :protected, read_concurrency: true])
    :ets.insert(:subway_status, {"status", status})

    {:ok, status}
  end

  @impl true
  def handle_info(%{event: "alerts_updated"}, old_status) do
    new_status = status()

    if new_status != old_status do
      :ets.insert(:subway_status, {"status", new_status})
      DotcomWeb.Endpoint.broadcast(@pubsub_topic, "subway_status_updated", new_status)
    end

    {:noreply, new_status}
  end

  defp status() do
    SystemStatus.subway_status()
  end
end
