defmodule Dotcom.Cache.Get.Subscriber do
  @moduledoc """
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
  """
  def init(_) do
    Application.get_env(:dotcom, :redis_config)
    |> @redix_pub_sub.start_link()
    |> subscribe(@channel)

    {:ok, nil}
  end

  @impl GenServer
  @doc """
  """
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: _}}, _) do
    {:noreply, nil}
  end

  def handle_info(
        {:redix_pubsub, _pid, _ref, :message, %{channel: @channel, payload: message}},
        _
      ) do
    [sender | key] = String.split(message, "|")

    value = Enum.join(key, "|") |> @cache.get()

    publish(sender, value)

    {:noreply, nil}
  end

  defp publish(sender, value) do
    @redis.command([
      "PUBLISH",
      "#{@channel}:#{sender}",
      value
    ])
  end

  defp subscribe({:ok, pubsub}, channel) do
    @redix_pub_sub.subscribe(pubsub, channel, self())
  end
end
