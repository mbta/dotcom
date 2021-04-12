defmodule RoutePatterns.RepoApi do
  @moduledoc """
  Behavior for an API client for fetching route pattern data.
  """

  alias RoutePatterns.RoutePattern
  alias Routes.Route

  @doc """
  Return all route patterns for a route ID
  """
  @callback by_route_id(Route.id_t()) :: [RoutePattern.t()]
  @callback by_route_id(Route.id_t(), keyword()) :: [RoutePattern.t()]
end
