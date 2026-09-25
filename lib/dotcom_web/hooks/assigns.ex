defmodule DotcomWeb.Hooks.Assigns do
  @moduledoc """
  Assign various things on LiveView mount.
  """

  import Phoenix.Component, only: [assign: 3]
  import Phoenix.LiveView, only: [get_connect_info: 2, push_navigate: 2]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  # Will 404 if the stop isn't found, or redirect to parent stop if needed
  # Otherwise, assigns stop & associated routes
  def on_mount(:stop_page, %{"stop_id" => stop_id}, _session, socket) do
    stop =
      stop_id
      |> URI.decode_www_form()
      |> @stops_repo.get()

    case stop do
      nil ->
        raise DotcomWeb.NotFoundError

      stop ->
        if @stops_repo.has_parent?(stop) do
          {:halt, push_navigate(socket, to: "/stops/#{stop.parent_id}")}
        else
          socket
          |> assign(:stop, stop)
          |> assign(
            :routes_by_stop,
            @routes_repo.by_stop(stop_id, include: "stop.connecting_stops")
          )
          |> then(&{:cont, &1})
        end
    end
  end

  def on_mount(:user_agent, _, _, socket) do
    {:cont, assign(socket, :user_agent, get_connect_info(socket, :user_agent))}
  end

  # catch-all
  def on_mount(_, _, _, socket) do
    {:cont, socket}
  end
end
