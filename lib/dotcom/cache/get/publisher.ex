defmodule Dotcom.Cache.Get.Publisher do
  @moduledoc """
  Allows us to get the value of a key across all nodes.
  Uses publishing and subscribing in Redis.
  """

  use GenServer

  @channel "dotcom:cache:get"
  @redis Application.compile_env!(:dotcom, :redis)
  @redix_pub_sub Application.compile_env!(:dotcom, :redix_pub_sub)

  @impl GenServer
  @doc """
  Gets the unique id from the Publisher which starts the Subscriber.
  Starts a Redix.PubSub process and subscribes to the channel given by the Publisher.
  """
  def init(uuid) do
    Application.get_env(:dotcom, :redis_config)
    |> @redix_pub_sub.start_link()
    |> subscribe("#{@channel}:#{uuid}")

    {:ok, {uuid, []}}
  end

  @impl true
  @doc """
  """
  def handle_call({:load, key}, _, {uuid, _}) do
    publish(uuid, key)

    {:reply, [], {uuid, []}}
  end

  def handle_call(:get, _, {uuid, values}) do
    {:reply, values, {uuid, values}}
  end

  @impl GenServer
  @doc """
  """
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: _}}, state) do
    {:noreply, state}
  end

  def handle_info(
        {:redix_pubsub, _pid, _ref, :message, %{channel: channel, payload: message}},
        {uuid, values}
      ) do
    if channel === "#{@channel}:#{uuid}" do
      {:noreply, {uuid, values ++ [message]}}
    else
      {:noreply, {uuid, values}}
    end
  end

  defp publish(sender, key) do
    @redis.command([
      "PUBLISH",
      @channel,
      "#{sender}|#{key}"
    ])
  end

  defp subscribe({:ok, pubsub}, channel) do
    @redix_pub_sub.subscribe(pubsub, channel, self())
  end
end
