defmodule DotcomWeb.Hooks.AssignRoute do
  @moduledoc """
  Assign the route, before both disconnected and connected mounts.
  """
  import Phoenix.Component, only: [assign: 3]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  def on_mount(:default, %{"route_id" => route_id}, _session, socket) do
    case @routes_repo.get(route_id) do
      nil ->
        # Raising this error will render the 404 page
        raise DotcomWeb.NotFoundError

      route ->
        {:cont, assign(socket, :route, route)}
    end
  end
end
