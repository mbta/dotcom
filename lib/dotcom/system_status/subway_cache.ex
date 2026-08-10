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
    case stored_status() do
      nil -> status()
      status -> status
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

    {:ok, nil, :hibernate}
  end

  @impl true
  def handle_info(%{event: "alerts_updated"}, state) do
    old_status = stored_status()
    new_status = status()

    if new_status != old_status do
      :ets.insert(:subway_status, {"status", new_status})
      DotcomWeb.Endpoint.broadcast(@pubsub_topic, "subway_status_updated", new_status)
    end

    {:noreply, state, :hibernate}
  end

  defp status() do
    SystemStatus.subway_status()
  end

  defp stored_status() do
    :ets.lookup(:subway_status, "status")
    |> case do
      [{"status", status}] -> status
      _ -> nil
    end
  end
end
