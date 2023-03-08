defmodule SiteWeb.RouteController do
  @moduledoc """
  Page for display of information about in individual stop or station.
  """
  use SiteWeb, :controller
  alias Routes.Repo

  def get_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    routes = Repo.by_stop(stop_id)
    json(conn, routes)
  end
end
