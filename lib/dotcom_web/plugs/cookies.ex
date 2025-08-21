defmodule DotcomWeb.Plugs.Cookies do
  @moduledoc """
  A module Plug that creates a cookie with a unique ID if this cookie does not already exist.
  """

  require Logger

  alias Plug.Conn

  @behaviour Plug
  @id_cookie_name "mbta_id"
  @route_cookie_name "mbta_visited_routes"

  @id_cookie_options [
    http_only: false,
    # 20 years
    max_age: 20 * 365 * 24 * 60 * 60
  ]

  @route_cookie_options [
    http_only: true,
    # 30 days
    max_age: 30 * 24 * 60 * 60
  ]

  @impl true
  def init([]), do: []

  @impl true
  def call(conn, _) do
    conn
    |> set_id_cookie()
    |> set_route_cookie()
  end

  def id_cookie_name, do: @id_cookie_name
  def route_cookie_name, do: @route_cookie_name

  @doc """
  Sets a unique id cookie if it does not already exist.
  If the user-agent is not Playwright (meaning it is a real user), then the id is added to the Logger metadata.
  """
  def set_id_cookie(%{cookies: %{@id_cookie_name => mbta_id}} = conn) do
    conn
    |> maybe_set_metadata(mbta_id)
  end

  def set_id_cookie(conn) do
    mbta_id = unique_id()

    conn
    |> maybe_set_metadata(mbta_id)
    |> Conn.put_resp_cookie(@id_cookie_name, mbta_id, @id_cookie_options)
  end

  defp maybe_set_metadata(conn, mbta_id) do
    unless Conn.get_req_header(conn, "user-agent") == ["Playwright"] do
      Logger.metadata(mbta_id: mbta_id)
    end

    conn
  end

  defp unique_id do
    {node(), System.unique_integer()}
    |> :erlang.phash2()
    |> to_string()
  end

  @modes ["subway", "bus", "commuter-rail", "commuter_rail", "ferry"]

  @doc """
  Sets a cookie when user visits a schedule page. Cookie lists the 4 most recently visited
  routes, separated by a pipe ("|"), in order of most recently visited.
  """
  def set_route_cookie(%Conn{path_info: ["schedules", route | _]} = conn)
      when route not in @modes do
    conn.cookies
    |> Map.get(@route_cookie_name, "")
    |> String.split("|")
    |> build_route_cookie(route)
    |> do_set_route_cookie(conn)
  end

  def set_route_cookie(%Conn{} = conn) do
    conn
  end

  defp do_set_route_cookie(cookie, conn) do
    Conn.put_resp_cookie(conn, @route_cookie_name, cookie, @route_cookie_options)
  end

  defp build_route_cookie([""], route) do
    route
  end

  defp build_route_cookie(routes, route) do
    old_routes =
      routes
      |> Enum.reject(&(&1 == route))
      |> Enum.take(3)

    Enum.join([route | old_routes], "|")
  end
end
