defmodule DotcomWeb.RouteController do
  @moduledoc """
  Endpoints for getting route data.
  """
  use DotcomWeb, :controller
  alias Routes.Route

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @spec get_by_route_ids(Plug.Conn.t(), map) :: Plug.Conn.t()
  def get_by_route_ids(conn, %{"route_ids" => route_ids} = _params) do
    routes =
      route_ids
      |> String.split(",")
      |> Stream.map(&@routes_repo.get/1)
      |> Stream.reject(&is_nil/1)
      |> Enum.map(&Route.to_json_safe/1)

    json(conn, routes)
  end
end
