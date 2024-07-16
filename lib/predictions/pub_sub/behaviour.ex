defmodule Predictions.PubSub.Behaviour do
  @callback subscribe(String.t()) :: [Prediction.t()] | {:error, term()}
end
