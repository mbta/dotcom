defmodule Predictions.Repo.Behaviour do
  @moduledoc """
  Behavior for an API client for fetching prediction data.
  """

  @doc """
  Return predictions for given params
  """
  @callback all(Keyword.t()) :: [Predictions.Prediction.t()] | []
end
