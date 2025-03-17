defmodule Dotcom.NodeServer do
  @moduledoc """
  A simple GenServer that logs the cluster `Node.list()` every minute.
  """

  require Logger

  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  @impl GenServer
  def init(_) do
    call_self(1)

    {:ok, nil}
  end

  @impl GenServer
  def handle_info(:run, _) do
    :ok = log_nodes()

    _ = call_self()

    {:noreply, nil}
  end

  defp log_nodes do
    [Node.self() | Node.list()]
    |> Enum.map(&Atom.to_string/1)
    |> Enum.sort()
    |> Enum.join(", ")
    |> (fn nodes -> Logger.notice("#{__MODULE__} [#{nodes}]") end).()
  end

  defp call_self(seconds \\ 60) do
    Process.send_after(self(), :run, :timer.seconds(seconds))
  end
end
