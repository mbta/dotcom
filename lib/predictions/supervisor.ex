defmodule Predictions.Supervisor do
  @moduledoc """
  Supervisor for the Predictions application.

  Children include:
  - StreamSupervisor: Dynamically sets up per-route streams of predictions from the API.
  """

  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children = [
      {Phoenix.PubSub, [name: Predictions.PubSub]},
      {Registry, keys: :unique, name: :prediction_streams_registry},
      {Registry, keys: :duplicate, name: :prediction_subscriptions_registry},
      Predictions.Store,
      Predictions.StreamSupervisor,
      Predictions.PredictionsPubSub
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
