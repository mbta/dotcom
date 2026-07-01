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

  @spec assign_recently_visited(Conn.t(), String.t()) :: Conn.t()
  defp assign_recently_visited(conn, routes) do
    route_list =
      routes
      |> String.split("|")
      |> Task.async_stream(&@routes_repo.get/1, max_concurrency: 4, on_timeout: :kill_task)
      |> Stream.filter(&match?({:ok, %Route{listed?: true}}, &1))
      |> Stream.map(fn {:ok, route} -> route end)

    Conn.assign(conn, :recently_visited, route_list)
  end
end
