defmodule DotcomWeb.Plugs.RecentlyVisited do
  @moduledoc """
  A module Plug that reads the mbta_visited_routes cookie and
  assigns recommended routes based on the saved values.
  """

  alias DotcomWeb.Plugs.Cookies
  alias Plug.Conn
  alias Routes.Route

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @behaviour Plug

  @impl Plug
  def init([]), do: []

  @impl Plug
  def call(%Conn{cookies: cookies} = conn, _opts) do
    case Map.get(cookies, Cookies.route_cookie_name()) do
      "" -> conn
      nil -> conn
      <<routes::binary>> -> assign_recently_visited(conn, routes)
    end
  end

  defp assign_recently_visited(conn, routes) do
    route_list =
      routes
      |> String.split("|")
      |> Task.async_stream(&get_route/1)
      |> Enum.reduce([], &parse_route_response/2)
      |> Enum.reverse()

    Conn.assign(conn, :recently_visited, route_list)
  end

  defp get_route("Green") do
    "Green-B"
    |> @routes_repo.get()
    |> Route.to_naive()
  end

  defp get_route(route) do
    @routes_repo.get(route)
  end

  defp parse_route_response({:ok, %Route{} = route}, acc) do
    [route | acc]
  end

  defp parse_route_response(_, acc) do
    acc
  end
end
