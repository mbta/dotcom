# credo:disable-for-this-file Credo.Check.Refactor.Nesting
defmodule Dotcom.Cache.Get.Publisher do
  @moduledoc """
  A GenServer that allows us to inspect values across all cache nodes.

  Each instance is unique and starts by subscribing to a one-off channel.
  It then publishes the key it wants the value for.
  Each node gets that message and publishes its value.
  This publisher collects all of those responses.

  A consumer can then ask for the diff of those values.

  This GenServer can be used for multiple rounds of loading and reporting values.
  """

  use GenServer

  @channel "dotcom:cache:get"
  @redis Application.compile_env!(:dotcom, :redis)
  @redix_pub_sub Application.compile_env!(:dotcom, :redix_pub_sub)

  @impl GenServer
  @doc """
  Start a unique instance and subscribe to a one-off channel.
  """
  def init(uuid) do
    {:ok, _} =
      Application.get_env(:dotcom, :redis_config)
      |> @redix_pub_sub.start_link()
      |> subscribe("#{@channel}:#{uuid}")

    {:ok, {uuid, []}}
  end

  @impl true
  @doc """
  Given a specific key, publish to all subscribers that we want their value for that key.
  """
  def handle_cast({:load, key}, {uuid, _}) do
    publish(uuid, key)

    {:noreply, {uuid, []}}
  end

  @impl true
  @doc """
  Report back the diff for all of the values.
  """
  def handle_call(:get, _, {uuid, values}) do
    {:reply, diff(values), {uuid, values}}
  end

  @impl GenServer
  # Indicates that the subscription was successful.
  def handle_info({:redix_pubsub, _pid, _ref, :subscribed, %{channel: _}}, state) do
    {:noreply, state}
  end

  # Receives a message from subscribers and adds the new value to the list of values.
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

  # Publish a message to subscribers with the uuid indicating who they should respond to.
  defp publish(uuid, key) do
    @redis.command([
      "PUBLISH",
      @channel,
      "#{uuid}|#{key}"
    ])
  end

  # Subscribe to the one-off channel that this GenServer created.
  defp subscribe({:ok, pubsub}, channel) do
    @redix_pub_sub.subscribe(pubsub, channel, self())
  end

  # If there are no values (all subscribers were empty) then we indicate that no key was found.
  defp diff([]) do
    {:gone, ""}
  end

  # If there is just one value, we report that value.
  defp diff([value]) do
    {:ok, wrap(value)}
  end

  # If there are multiple values, then we try to find the diff of the values.
  #
  # If there is no diff (they are all the same), we return a representative value.
  # If there are diffs, we return them all with a separator.
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
        |> Enum.map_join("\n---\n", &wrap/1)

      {:conflict, differing_values}
    end
  end

  # We check every value against every other value to see if there are any diffs.
  defp reduce_values(values) do
    Enum.reduce(values, {values, []}, fn new_value, {set_values, matched_values} ->
      if Enum.all?(set_values, fn set_value -> set_value === new_value end) do
        {set_values, matched_values}
      else
        {set_values, matched_values ++ [new_value]}
      end
    end)
  end

  # Wrap the value for presentation as a string.
  #
  # Strings don't need to be wrapped.
  defp wrap(value) when is_binary(value), do: value

  # Non-strings just get inspected.
  defp wrap(value), do: Kernel.inspect(value)
end
