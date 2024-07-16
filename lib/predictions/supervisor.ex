defmodule Predictions.Supervisor do
  @moduledoc """
  Supervisor for the Predictions application.

  Children include:
  - StreamSupervisor: Dynamically sets up per-route streams of predictions from the API.
  """

  use Supervisor

  @predictions_phoenix_pub_sub Application.compile_env!(:dotcom, [:predictions_phoenix_pub_sub])

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children = [
      {Phoenix.PubSub, [name: @predictions_phoenix_pub_sub]},
      {Registry, keys: :unique, name: :prediction_streams_registry},
      {Registry, keys: :duplicate, name: :prediction_subscriptions_registry},
      Predictions.Store,
      Predictions.StreamSupervisor,
      Predictions.PubSub
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
