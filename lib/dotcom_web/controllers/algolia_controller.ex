defmodule DotcomWeb.AlgoliaController do
  @moduledoc """
  Renders JSON endpoints for populating our Algolia indexes for GTFS routes and stops.
  """
  use Phoenix.Controller, formats: [:json]

  import Plug.Conn, only: [put_resp_header: 3]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  plug :cache_control
  plug :put_view, namespace: DotcomWeb, json: DotcomWeb.AlgoliaJSON

  def routes(conn, _) do
    routes = [@routes_repo.green_line() | @routes_repo.all()]
    render(conn, :index, routes: routes)
  end

  def stops(conn, _) do
    stops = @stops_repo.all() |> Enum.reject(& &1.child?)
    render(conn, :index, stops: stops)
  end

  # Let the browser cache & reuse the result
  # no-cache always revalidates, so will return freshest if available
  defp cache_control(conn, _) do
    conn
    |> put_resp_header("cache-control", "no-cache")
  end
end
