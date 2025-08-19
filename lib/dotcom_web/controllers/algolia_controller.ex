defmodule DotcomWeb.AlgoliaController do
  @moduledoc """
  Renders JSON endpoints for populating our Algolia indexes for GTFS routes and stops.
  """
  use Phoenix.Controller, formats: [:json]

  import Plug.Conn, only: [get_req_header: 2, halt: 1, send_resp: 3]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  plug :allow_algolia_ip
  plug :put_view, namespace: DotcomWeb, json: DotcomWeb.AlgoliaJSON

  def routes(conn, _) do
    routes = [@routes_repo.green_line() | @routes_repo.all()]
    render(conn, :index, routes: routes)
  end

  def stops(conn, _) do
    stops = @stops_repo.all() |> Enum.reject(& &1.child?)
    render(conn, :index, stops: stops)
  end

  # https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/overview/#allow-algolia-ip-addresses
  @algolia_ip_addresses ["104.196.103.173", "35.234.69.129"]

  defp allow_algolia_ip(conn, _) do
    case get_req_header(conn, "x-forwarded-for") do
      [ip] when is_binary(ip) and ip in @algolia_ip_addresses ->
        conn

      _ ->
        conn
        |> send_resp(:unauthorized, "Unexpected IP address")
        |> halt()
    end
  end
end
