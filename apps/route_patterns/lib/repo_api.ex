defmodule RoutePatterns.RepoApi do
  @moduledoc """
  Behavior for an API client for fetching route pattern data.
  """

  alias RoutePatterns.RoutePattern
  alias Routes.Route

  @doc """
  Returns a single route pattern by ID
  """
  @callback get(RoutePattern.id_t()) :: RoutePattern.t() | nil
  @callback get(RoutePattern.id_t(), keyword()) :: RoutePattern.t() | nil

  @doc """
  Return all route patterns for a route ID
  """
  @callback by_route_id(Route.id_t()) :: RoutePattern.t()
  @callback by_route_id(Route.id_t(), keyword()) :: RoutePattern.t()
end
