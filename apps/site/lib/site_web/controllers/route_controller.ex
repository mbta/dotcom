defmodule SiteWeb.RouteController do
  @moduledoc """
  Endpoints for getting route data.
  """
  use SiteWeb, :controller
  alias Routes.{Repo, Route}

  @spec get(Plug.Conn.t(), map) :: Plug.Conn.t()
  def get(conn, %{"route_ids" => route_ids} = _params) do
    routes =
      route_ids
      |> String.split(",")
      |> Stream.map(&Repo.get/1)
      |> Stream.reject(&is_nil/1)
      |> Enum.map(&Route.to_json_safe/1)

    json(conn, routes)
  end
end
