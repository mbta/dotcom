defmodule Predictions.Stream do
  @moduledoc """
  Uses V3Api.Stream to subscribe to the V3Api and receive prediction events.
  """

  use GenStage
  require Logger

  alias V3Api.Stream.Event
  alias Phoenix.PubSub
  alias Predictions.{Prediction, Repo, StreamParser}

  @type event_type :: :reset | :add | :update | :remove

  def start_link(opts) do
    {name, opts} = Keyword.pop(opts, :name, __MODULE__)

    GenStage.start_link(
      __MODULE__,
      opts,
      name: name
    )
  end

  def init(opts) do
    producer_consumer = Keyword.fetch!(opts, :subscribe_to)
    broadcast_fn = Keyword.get(opts, :broadcast_fn, &PubSub.broadcast/3)
    {:consumer, %{broadcast_fn: broadcast_fn}, subscribe_to: [producer_consumer]}
  end

  def handle_events(events, _from, state) do
    :ok = Enum.each(events, &send_event(&1, state.broadcast_fn))
    {:noreply, [], state}
  end

  defp send_event(
         %Event{
           event: type,
           data: %JsonApi{data: data}
         },
         broadcast_fn
       ) do
    data
    |> Enum.filter(&Repo.has_trip?/1)
    |> Enum.map(&StreamParser.parse/1)
    |> broadcast(type, broadcast_fn)
  end

  defp send_event(
         %Event{
           data: {:error, _} = error
         },
         _broadcast_fn
       ) do
    error
  end

  @typep broadcast_fn :: (atom, String.t(), any -> :ok | {:error, any})
  @spec broadcast([Prediction.t() | String.t()], event_type, broadcast_fn) :: :ok
  defp broadcast([], _type, _broadcast_fn), do: :ok

  defp broadcast(data, type, broadcast_fn) do
    Predictions.PubSub
    |> broadcast_fn.("predictions", {type, data})
    |> log_errors()
  end

  @spec log_errors(:ok | {:error, any}) :: :ok
  defp log_errors(:ok), do: :ok

  defp log_errors({:error, error}),
    do: Logger.error("module=#{__MODULE__} error=#{inspect(error)}")
end
