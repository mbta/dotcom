defmodule Dotcom.Predictions.Manager do
  @moduledoc """
  Lets consumers subscribe to predictions changes

  _ = Dotcom.Predictions.Manager.subscribe(self(), params)

  def handle_info({:predictions_update, _update}, state) do
    # IO.inspect(update, label: "predictions_update")
    {:noreply, state}
  end
  """

  # `restart: :transient` is necessary here because when the
  # subscriber count drops to 0, we want the GenServer to gracefully
  # shutdown. With the default value of `:permanent`, it would shut
  # down but then try to start back up again, detect that it has no
  # subscribers, shut down again, start back up again, and so on.
  use GenServer, restart: :transient

  alias Dotcom.Predictions.EventSupervisor

  # Client
  def subscribe(caller_pid, params) do
    topic = topic_name(params)

    :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
    _ = DotcomWeb.Presence.track(self(), topic, "predictions", %{})

    DynamicSupervisor.start_child(Dotcom.Predictions.Supervisor, {__MODULE__, params})
    |> case do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
    |> GenServer.cast({:subscribe, caller_pid})
  end

  def unsubscribe(_caller_pid, params) do
    :ok =
      params
      |> topic_name()
      |> DotcomWeb.Endpoint.unsubscribe()

    params
    |> process_name()
    |> GenServer.whereis()
  end

  def start_link(params) do
    GenServer.start_link(__MODULE__, params, name: process_name(params))
  end

  # Server
  def init(params) do
    EventSupervisor.start_link(%{params: params, publish_to: self()})

    {:ok,
     %{
       params: params,
       predictions: :loading,
       subscribers: MapSet.new(),
       topic: topic_name(params)
     }}
  end

  def terminate(_reason, %{params: params}) do
    EventSupervisor.stop(%{params: params})
  end

  def handle_cast(
        {:subscribe, pid},
        %{predictions: predictions, subscribers: subscribers} = state
      ) do
    new_subscribers =
      subscribers
      |> MapSet.put(pid)

    publish_predictions_if_any(pid, predictions)

    {:noreply, %{state | subscribers: new_subscribers}}
  end

  def handle_cast({:unsubscribe, pid}, %{subscribers: subscribers} = state) do
    new_subscribers =
      subscribers
      |> MapSet.delete(pid)

    new_state = %{state | subscribers: new_subscribers}

    if Enum.empty?(new_subscribers) do
      {:stop, :normal, new_state}
    else
      {:noreply, new_state}
    end
  end

  def handle_info(
        {:predictions_update, %{predictions: predictions} = data},
        %{topic: topic} = state
      ) do
    _ = Phoenix.PubSub.broadcast(Dotcom.PubSub, topic, {:predictions_update, data})

    {:noreply, %{state | predictions: {:ok, predictions}}}
  end

  defp process_name(params) do
    {:global, {__MODULE__, params}}
  end

  def topic_name(%{route_id: route_id, direction_id: direction_id, stop_id: stop_id}) do
    "predictions:#{route_id}:#{direction_id}:#{stop_id}"
  end

  defp publish_predictions_if_any(_pid, :loading) do
  end

  defp publish_predictions_if_any(pid, {:ok, predictions}) do
    send(
      pid,
      {:predictions_update, %{predictions: predictions, events: [{"reset", predictions}]}}
    )
  end
end
