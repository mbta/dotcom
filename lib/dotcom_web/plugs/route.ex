defmodule DotcomWeb.Plugs.Route do
  @moduledoc """

  Assigns @route based on a `route` parameter in the conn.

  """

  @behaviour Plug

  import Plug.Conn, only: [assign: 3]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @impl true
  def init([]), do: []

  @impl true
  def call(%{params: %{"route" => route_id}} = conn, []) do
    case @routes_repo.get(route_id) do
      nil ->
        DotcomWeb.ControllerHelpers.render_404(conn)

      route ->
        assign(conn, :route, route)
    end
  end
end
