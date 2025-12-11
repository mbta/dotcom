defmodule Services.Repo.Behaviour do
  @moduledoc """
  The behaviour for interacting with V3 API services
  """

  alias Routes.Route
  alias Services.Service

  @callback by_route_id(Route.id_t()) :: [Service.t()]
  @callback by_route_id(Route.id_t(), Keyword.t()) :: [Service.t()]
  @callback by_route_id([Route.id_t()], Keyword.t()) :: [Service.t()]
end
