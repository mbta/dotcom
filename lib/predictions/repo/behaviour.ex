defmodule Predictions.Repo.Behaviour do
  @moduledoc """
  Behavior for an API client for fetching prediction data.
  """

  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Stops.Stop

  @doc """
  Return predictions for given params
  """
  @callback all(Keyword.t()) :: [Predictions.Prediction.t()] | []

  @doc """
  Return predictions for give prarams ignoring the cache
  """
  @callback all_no_cache(Keyword.t()) :: [Predictions.Prediction.t()] | []
end
