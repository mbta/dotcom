defmodule SiteWeb.Plugs.Route do
  @moduledoc """

  Assigns @route based on a `route` parameter in the conn.

  """
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]

  @impl true
  def init([]), do: []

  @impl true
  def call(%{params: %{"route" => route_id}} = conn, []) do
    case Routes.Repo.get(route_id) do
      nil ->
        SiteWeb.ControllerHelpers.render_404(conn)

      route ->
        assign(conn, :route, route)
    end
  end

  def call(conn, []) do
    # Do nothing, there is no route to add
    conn
  end
end
