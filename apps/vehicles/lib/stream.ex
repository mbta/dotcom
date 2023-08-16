defmodule Vehicles.Stream do
  @moduledoc """
  Uses V3Api.Stream to subscribe to the V3Api and receive events.
  """

  use GenStage
  alias Phoenix.PubSub
  alias Vehicles.Parser
  require Logger

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

    {:consumer, %{broadcast_fn: broadcast_fn, trip_shapes: %{}, parent_stations: %{}},
     subscribe_to: [producer_consumer]}
  end

  def handle_events(events, _from, state) do
    state = Enum.reduce(events, state, &send_event/2)
    {:noreply, [], state}
  end

  defp send_event(
         %V3Api.Stream.Event{
           event: :remove,
           data: %JsonApi{data: data}
         },
         state
       ) do
    state = Enum.reduce(data, state, &remove_items/2)

    data
    |> Enum.filter(&(&1.type == "vehicle"))
    |> Enum.map(& &1.id)
    |> broadcast(:remove, state.broadcast_fn)

    state
  end

  defp send_event(
         %V3Api.Stream.Event{
           event: type,
           data: %JsonApi{data: data}
         },
         state
       ) do
    state = Enum.reduce(data, state, &add_items/2)

    data
    |> Enum.filter(&(&1.type == "vehicle"))
    |> Enum.map(
      &Parser.parse(&1, parent_stations: state.parent_stations, trip_shapes: state.trip_shapes)
    )
    |> broadcast(type, state.broadcast_fn)

    state
  end

  @typep broadcast_fn :: (atom, String.t(), any -> :ok | {:error, any})
  @spec broadcast([Vehicles.Vehicle.t() | String.t()], event_type, broadcast_fn) :: :ok
  defp broadcast(data, type, broadcast_fn)

  defp broadcast([_ | _] = data, type, broadcast_fn) do
    Vehicles.PubSub
    |> broadcast_fn.("vehicles", {type, data})
    |> do_broadcast()
  end

  defp broadcast(_data, _type, _broadcast_fn) do
    :ok
  end

  @spec do_broadcast(:ok | {:error, any}) :: :ok
  defp do_broadcast(:ok) do
    :ok
  end

  defp do_broadcast({:error, error}) do
    Logger.error("module=#{__MODULE__} error=#{inspect(error)}")
  end

  defp add_items(%{type: "stop", id: id} = item, state) do
    parent_station_id =
      case item do
        %{relationships: %{"parent_station" => [%{id: parent_station_id} | _]}} ->
          parent_station_id

        _ ->
          id
      end

    %{state | parent_stations: Map.put(state.parent_stations, id, parent_station_id)}
  end

  defp add_items(%{type: "trip", id: id} = item, state) do
    shape_id =
      case item do
        %{relationships: %{"shape" => [%{id: shape_id} | _]}} ->
          shape_id

        _ ->
          nil
      end

    %{state | trip_shapes: Map.put(state.trip_shapes, id, shape_id)}
  end

  defp add_items(%{type: "vehicle"}, state) do
    state
  end

  defp remove_items(%{type: "stop", id: id}, state) do
    %{state | parent_stations: Map.delete(state.parent_stations, id)}
  end

  defp remove_items(%{type: "trip", id: id}, state) do
    %{state | trip_shapes: Map.delete(state.trip_shapes, id)}
  end

  defp remove_items(%{}, state) do
    state
  end
end
