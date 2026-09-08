defmodule DotcomWeb.Hooks.AssignRoute do
  @moduledoc """
  Assign the route, before both disconnected and connected mounts.
  """
  import Phoenix.Component, only: [assign: 3]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @doc """
  Uses the route ID in the params to look up the corresponding
  route, and assigns that route to the socket as `:route`.

  If the route doesn't exist, then raises a
  `DotcomWeb.NotFoundError` in order to get
  `DotcomWeb.Router.handle_errors/2` to render the 404 page.
  """
  def on_mount(:default, %{"route_id" => route_id}, _session, socket) do
    case @routes_repo.get(route_id) do
      nil -> raise DotcomWeb.NotFoundError
      route -> {:cont, assign(socket, :route, route)}
    end
  end
end
