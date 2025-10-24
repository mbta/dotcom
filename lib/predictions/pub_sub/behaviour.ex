defmodule Predictions.PubSub.Behaviour do
  @moduledoc """
  Defines the behaviour for the Predictions PubSub.
  """

  @callback subscribe(String.t()) :: [Prediction.t()] | {:error, term()}
  @callback unsubscribe() :: term()
end
