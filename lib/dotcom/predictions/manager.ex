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

  @check_interval_ms 5000

  # Client
  def subscribe(params) do
    topic = topic_name(params)

    :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
    _ = DotcomWeb.Presence.track(self(), topic, "predictions", %{})

    DynamicSupervisor.start_child(Dotcom.Predictions.Supervisor, {__MODULE__, params})
    |> case do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
    |> GenServer.cast({:subscribe, self()})
  end

  def unsubscribe(params) do
    topic = topic_name(params)

    :ok = Phoenix.PubSub.unsubscribe(Dotcom.PubSub, topic)
  end

  def start_link(params) do
    GenServer.start_link(__MODULE__, params, name: process_name(params))
  end

  # Server
  def init(params) do
    _ = EventSupervisor.start_link(%{params: params, publish_to: self()})

    Process.send_after(self(), :check_subscribers, @check_interval_ms)

    {:ok,
     %{
       params: params,
       predictions: :loading,
       topic: topic_name(params)
     }}
  end

  def handle_cast(
        {:subscribe, pid},
        %{predictions: predictions} = state
      ) do
    publish_predictions_if_any(pid, predictions)

    {:noreply, state}
  end

  def handle_info(:check_subscribers, %{topic: topic} = state) do
    case topic_subscriber_count(topic) do
      0 ->
        {:stop, :normal, state}

      _count ->
        Process.send_after(self(), :check_subscribers, @check_interval_ms)
        {:noreply, state}
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

  defp topic_subscriber_count(topic) do
    case DotcomWeb.Presence.list(topic) do
      %{"predictions" => %{metas: list}} -> Enum.count(list)
      _other -> 0
    end
  end
end
