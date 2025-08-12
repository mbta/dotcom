defmodule Dotcom.Cache.Get.Subscriber do
  @moduledoc """
  Every node runs a subscriber.

  Subscribers wait to hear from a publisher telling them what key they want a value for.
  Subscribers look up their value and publish it back (if any value exists).
  """

  use GenServer

  @cache Application.compile_env!(:dotcom, :cache)
  @channel "dotcom:cache:get"
  @redis Application.compile_env!(:dotcom, :redis)
  @redix_pub_sub Application.compile_env!(:dotcom, :redix_pub_sub)

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil)
  end

  @impl GenServer
  @doc """
  Start by subscribing to the network-wide channel for publishing value requests.
  """
  def init(_) do
    Application.get_env(:dotcom, :redis_config)
    |> @redix_pub_sub.start_link()
    |> subscribe(@channel)
  end

  @impl GenServer
  # Indicates a successful subscription.
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: _}}, _) do
    {:noreply, nil}
  end

  # Processes the request to get the node value.
  # If the value is no present, it does nothing.
  def handle_info(
        {:redix_pubsub, _pid, _ref, :message, %{channel: @channel, payload: message}},
        _
      ) do
    [sender | key] = String.split(message, "|")

    value = Enum.join(key, "|") |> @cache.get()

    if value do
      publish(sender, value)
    end

    {:noreply, nil}
  end

  # Sends the value back to the requestor's channel.
  defp publish(sender, value) do
    @redis.command([
      "PUBLISH",
      "#{@channel}:#{sender}",
      :erlang.term_to_binary(value)
    ])
  end

  # Subscribe to the network-wide channel.
  defp subscribe({:ok, pubsub}, channel) do
    @redix_pub_sub.subscribe(pubsub, channel, self())
  end
end
