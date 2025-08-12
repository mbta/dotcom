defmodule Dotcom.Cache.Get.Publisher do
  @moduledoc """
  """

  use GenServer

  @channel "dotcom:cache:get"
  @redis Application.compile_env!(:dotcom, :redis)
  @redix_pub_sub Application.compile_env!(:dotcom, :redix_pub_sub)

  @impl GenServer
  @doc """
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
  def handle_cast({:load, key}, {uuid, _}) do
    publish(uuid, key)

    {:noreply, {uuid, []}}
  end

  @impl true
  @doc """
  """
  def handle_call(:get, _, {uuid, values}) do
    {:reply, diff(values), {uuid, values}}
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
      {:noreply, {uuid, values ++ [:erlang.binary_to_term(message)]}}
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

  defp diff([]) do
    {:gone, ""}
  end

  defp diff([value]) do
    {:ok, wrap(value)}
  end

  defp diff(values) do
    {_, reduced_values} = reduce_values(values)

    if reduced_values === [] do
      representative_value =
        values
        |> List.first()
        |> wrap()

      {:ok, representative_value}
    else
      differing_values =
        reduced_values
        |> Enum.map(&wrap/1)
        |> Enum.join("\n---\n")

      {:conflict, differing_values}
    end
  end

  defp reduce_values(values) do
    Enum.reduce(values, {values, []}, fn new_value, {set_values, matched_values} ->
      unless Enum.all?(set_values, fn set_value -> set_value === new_value end) do
        {set_values, matched_values ++ [new_value]}
      else
        {set_values, matched_values}
      end
    end)
  end

  defp wrap(value) when is_binary(value), do: value

  defp wrap(value), do: Kernel.inspect(value)
end
