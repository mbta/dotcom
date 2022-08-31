defmodule Predictions.PredictionsPubSub do
  @moduledoc """
  Allow channels to subscribe to prediction streams.
  """

  use GenServer

  alias Predictions.{Prediction, StreamSupervisor}
  alias Routes.Route

  defstruct predictions_by_route_id: %{}

  @type t :: %__MODULE__{
          predictions_by_route_id: predictions_by_route_id()
        }

  @type predictions_by_route_id :: %{Route.id_t() => [Prediction.t()]}

  @type broadcast_message :: {:new_predictions, [Prediction.t()]}

  # Client

  @spec start_link() :: GenServer.on_start()
  @spec start_link(Keyword.t()) :: GenServer.on_start()
  def start_link(opts \\ []) do
    name = Keyword.get(opts, :name, __MODULE__)

    GenServer.start_link(
      __MODULE__,
      opts,
      name: name
    )
  end

  @spec subscribe(Route.id_t()) :: [Prediction.t()]
  @spec subscribe(Route.id_t(), GenServer.server()) :: [Prediction.t()]
  def subscribe(route_id, server \\ __MODULE__) do
    StreamSupervisor.ensure_stream_is_started(route_id)
    {registry_key, predictions} = GenServer.call(server, {:subscribe, route_id})
    Registry.register(:prediction_subscriptions_registry, registry_key, route_id)
    predictions
  end

  # Server

  @impl GenServer
  @spec init(keyword) :: {:ok, t()}
  def init(opts) do
    subscribe_fn = Keyword.get(opts, :subscribe_fn, &Phoenix.PubSub.subscribe/2)
    subscribe_fn.(Predictions.PubSub, "predictions")
    {:ok, %__MODULE__{}}
  end

  @impl GenServer
  def handle_call(
        {:subscribe, route_id},
        _from,
        %__MODULE__{predictions_by_route_id: predictions_by_route_id} = state
      ) do
    registry_key = self()
    predictions = predictions_for_route_id(predictions_by_route_id, route_id)

    {:reply, {registry_key, predictions}, state}
  end

  @impl GenServer
  def handle_info(
        {:reset, [%Predictions.Prediction{route: %Routes.Route{id: route_id}} | _] = predictions},
        %__MODULE__{predictions_by_route_id: predictions_by_route_id} = state
      ) do
    new_state = %__MODULE__{
      state
      | predictions_by_route_id: Map.put(predictions_by_route_id, route_id, predictions)
    }

    broadcast(new_state)

    {:noreply, new_state}
  end

  def handle_info(
        {:add,
         [%Predictions.Prediction{route: %Routes.Route{id: route_id}} | _] = new_predictions},
        %__MODULE__{predictions_by_route_id: predictions_by_route_id} = state
      ) do
    new_predictions_by_route_id =
      Map.put(
        predictions_by_route_id,
        route_id,
        predictions_for_route_id(predictions_by_route_id, route_id) ++ new_predictions
      )

    new_state = %__MODULE__{
      state
      | predictions_by_route_id: new_predictions_by_route_id
    }

    broadcast(new_state)

    {:noreply, new_state}
  end

  def handle_info(
        {:update,
         [%Predictions.Prediction{route: %Routes.Route{id: route_id}} | _] = updated_predictions},
        %__MODULE__{predictions_by_route_id: predictions_by_route_id} = state
      ) do
    updated_prediction_ids = Enum.map(updated_predictions, & &1.id)

    predictions_sans_old =
      predictions_by_route_id
      |> predictions_for_route_id(route_id)
      |> Enum.reject(&Enum.member?(updated_prediction_ids, &1.id))

    new_predictions_by_route_id =
      Map.put(
        predictions_by_route_id,
        route_id,
        predictions_sans_old ++ updated_predictions
      )

    new_state = %__MODULE__{
      state
      | predictions_by_route_id: new_predictions_by_route_id
    }

    broadcast(new_state)

    {:noreply, new_state}
  end

  def handle_info(
        {:remove,
         [%Predictions.Prediction{route: %Routes.Route{id: route_id}} | _] = predictions_to_remove},
        %__MODULE__{predictions_by_route_id: predictions_by_route_id} = state
      ) do
    prediction_ids_to_remove = Enum.map(predictions_to_remove, & &1.id)

    predictions_sans_removed =
      predictions_by_route_id
      |> predictions_for_route_id(route_id)
      |> Enum.reject(&Enum.member?(prediction_ids_to_remove, &1.id))

    new_predictions_by_route_id =
      Map.put(
        predictions_by_route_id,
        route_id,
        predictions_sans_removed
      )

    new_state = %__MODULE__{
      state
      | predictions_by_route_id: new_predictions_by_route_id
    }

    broadcast(new_state)

    {:noreply, new_state}
  end

  @spec predictions_for_route_id(predictions_by_route_id(), Route.id_t()) :: [Prediction.t()]
  defp predictions_for_route_id(predictions_by_route_id, route_id),
    do: Map.get(predictions_by_route_id, route_id, [])

  @spec broadcast(t()) :: :ok
  defp broadcast(state) do
    registry_key = self()

    Registry.dispatch(:prediction_subscriptions_registry, registry_key, fn entries ->
      Enum.each(entries, &send_data(&1, state))
    end)
  end

  @spec send_data({pid, Route.id()}, t()) :: broadcast_message()
  defp send_data({pid, route_id}, %__MODULE__{
         predictions_by_route_id: predictions_by_route_id
       }) do
    send(
      pid,
      {:new_predictions, predictions_for_route_id(predictions_by_route_id, route_id)}
    )
  end
end
