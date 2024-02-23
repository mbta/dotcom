defmodule Dotcom.Cache.Subscriber do
  @moduledoc """
  TODO
  """

  use GenServer

  @cache Application.compile_env!(:dotcom, :cache)
  @channel "cache_buster"

  def channel, do: @channel

  def start_link() do
    GenServer.start_link(__MODULE__, :ok, [])
  end

  @impl true
  def init(_) do
    Application.get_env(:dotcom, :redis)
    |> Redix.PubSub.start_link()
    |> subscribe(@channel)

    {:ok, %{}}
  end

  @impl true
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: channel}}, state) do
    IO.inspect(channel, label: "subscribed to channel")

    {:noreply, state}
  end

  def handle_info(
        {:redix_pubsub, _pid, _ref, :message, %{channel: @channel, payload: message}},
        state
      ) do
    IO.inspect(message, label: "deleting key from L1 cache")

    @cache.delete(message, level: 1)

    {:noreply, state}
  end

  def handle_message(message, state) do
    IO.inspect(message, label: "received message")

    {:noreply, state}
  end

  defp subscribe({:ok, pubsub}, channel) do
    Redix.PubSub.subscribe(pubsub, channel, self())
  end
end
