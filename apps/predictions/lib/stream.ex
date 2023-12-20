defmodule Predictions.Stream do
  @moduledoc """
  Uses V3Api.Stream to subscribe to the V3Api and receive prediction events.
  """

  use GenStage
  require Logger

  alias Phoenix.PubSub
  alias Predictions.{Repo, Store, StreamParser}
  alias V3Api.Stream.Event

  @type event_type :: :reset | :add | :update | :remove

  def start_link(opts) do
    {name, opts} = Keyword.pop(opts, :name, __MODULE__)

    GenStage.start_link(
      __MODULE__,
      opts,
      name: name
    )
  end

  @impl GenStage
  def init(opts) do
    producer_consumer = Keyword.fetch!(opts, :subscribe_to)

    initial_state =
      Map.new()
      |> Map.put_new(:broadcast_fn, Keyword.get(opts, :broadcast_fn, &PubSub.broadcast/3))
      |> Map.put_new(:started?, false)

    {:consumer, initial_state, subscribe_to: [producer_consumer]}
  end

  @impl GenStage
  def handle_events(events, _from, state) do
    events
    |> Enum.filter(fn %Event{data: event_data} ->
      if is_tuple(event_data), do: log_errors(event_data)
      match?(%JsonApi{}, event_data)
    end)
    |> Enum.group_by(& &1.event)
    |> Enum.each(&handle_by_type/1)

    {:noreply, [], initial_broadcast(state)}
  end

  @spec handle_by_type({Event.event(), [Event.t()]}) :: :ok
  defp handle_by_type({:remove, events}) do
    prediction_ids =
      events
      |> Enum.flat_map(fn %Event{data: %JsonApi{data: data}} ->
        data
        |> Enum.filter(&(&1.type == "prediction"))
        |> Enum.map(& &1.id)
      end)

    Store.update({:remove, prediction_ids})
  end

  defp handle_by_type({event_type, events}) when event_type in [:add, :update] do
    batch = Enum.flat_map(events, &to_predictions(&1.data))
    Store.update({event_type, batch})
  end

  # Broadcast when the first event for this stream is received
  def initial_broadcast(%{started?: false} = state) do
    broadcast(state.broadcast_fn)
    %{state | started?: true}
  end

  def initial_broadcast(state), do: state

  defp to_predictions(%JsonApi{data: data}) do
    data
    |> Enum.filter(&(&1.type == "prediction"))
    |> Enum.filter(&Repo.has_trip?/1)
    |> Enum.map(&StreamParser.parse/1)
  end

  defp to_predictions({:error, _} = error) do
    _ = log_errors(error)
    []
  end

  @typep broadcast_fn :: (atom, String.t(), any -> :ok | {:error, any})
  @spec broadcast(broadcast_fn) :: :ok
  defp broadcast(broadcast_fn) do
    Predictions.PubSub
    |> broadcast_fn.("predictions", :broadcast)
    |> log_errors()
  end

  @spec log_errors(:ok | {:error, any}) :: :ok
  defp log_errors(:ok), do: :ok

  defp log_errors({:error, error}),
    do: Logger.error("module=#{__MODULE__} error=#{inspect(error)}")
end
