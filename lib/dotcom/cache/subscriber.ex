defmodule Dotcom.Cache.Subscriber do
  @moduledoc """
  A GenServer that listens for cache invalidation messages and invalidates the cache.
  """

  require Logger

  use GenServer

  alias Dotcom.Cache.Publisher

  @cache Application.compile_env!(:dotcom, :cache)
  @channel Publisher.channel()

  def start_link(uuid) do
    GenServer.start_link(__MODULE__, uuid, [])
  end

  @impl GenServer
  @doc """
  Gets the unique id from the Publisher which starts the Subscriber.
  Starts a Redix.PubSub process and subscribes to channel given by the Publisher.
  """
  def init(uuid) do
    Application.get_env(:dotcom, :redis)
    |> Redix.PubSub.start_link()
    |> subscribe(@channel)

    {:ok, uuid}
  end

  @impl GenServer
  @doc """
  If we get a subscription message, we just return the state.

  If we get a cache invalidation message, we check if the message was published from this Elixir node.
  If not, it invalidates the given key from the Local cache (L1).
  """
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: _}}, uuid) do
    {:noreply, uuid}
  end

  def handle_info(
        {:redix_pubsub, _pid, _ref, :message, %{channel: @channel, payload: message}},
        uuid
      ) do
    [sender_id, key] = String.split(message, "|")

    if sender_id != uuid do
      Logger.notice("dotcom.cache.subscriber.eviction uuid=#{uuid} key=#{key}")

      @cache.delete(key, level: 1)
    end

    {:noreply, uuid}
  end

  defp subscribe({:ok, pubsub}, channel) do
    Redix.PubSub.subscribe(pubsub, channel, self())
  end
end
