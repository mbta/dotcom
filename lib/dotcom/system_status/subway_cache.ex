defmodule Dotcom.SystemStatus.SubwayCache do
  @moduledoc """
  A GenServer that periodically computes subway status and broadcasts changes when
  they happen
  """

  use GenServer

  alias Dotcom.SystemStatus
  alias Dotcom.SystemStatus.SubwayCache.Behaviour

  @behaviour Behaviour

  # Client

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  @impl Behaviour
  def subway_status() do
    GenServer.call(__MODULE__, :subway_status)
  end

  # Server

  @impl true
  def init(_opts) do
    Phoenix.PubSub.subscribe(Dotcom.PubSub, "alerts")

    {:ok, SystemStatus.Subway.subway_status([], Dotcom.Utils.DateTime.now())}
  end

  @impl true
  def handle_call(:subway_status, _from, status) do
    {:reply, status, status}
  end

  @impl true
  def handle_info(:alerts_updated, old_status) do
    new_status = status()

    if new_status != old_status do
      Phoenix.PubSub.broadcast(
        Dotcom.PubSub,
        "system_status:subway",
        {:subway_status, new_status}
      )
    end

    {:noreply, new_status}
  end

  defp status() do
    SystemStatus.subway_status()
  end
end
