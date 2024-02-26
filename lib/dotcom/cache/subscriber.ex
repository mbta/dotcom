defmodule Dotcom.Cache.Subscriber do
  @moduledoc """
  TODO
  """

  use GenServer

  alias Dotcom.Cache.Publisher

  @cache Application.compile_env!(:dotcom, :cache)
  @channel Publisher.channel()

  def start_link(uuid) do
    GenServer.start_link(__MODULE__, uuid, [])
  end

  @impl true
  def init(uuid) do
    Application.get_env(:dotcom, :redis)
    |> Redix.PubSub.start_link()
    |> subscribe(@channel)

    {:ok, uuid}
  end

  @impl true
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: _}}, uuid) do
    {:noreply, uuid}
  end

  def handle_info(
        {:redix_pubsub, _pid, _ref, :message, %{channel: @channel, payload: message}},
        uuid
      ) do
    [sender_id, key] = String.split(message, "|")

    if sender_id != uuid do
      @cache.delete(key, level: 1)
    end

    {:noreply, uuid}
  end

  defp subscribe({:ok, pubsub}, channel) do
    Redix.PubSub.subscribe(pubsub, channel, self())
  end
end
