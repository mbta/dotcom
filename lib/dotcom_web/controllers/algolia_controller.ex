defmodule DotcomWeb.AlgoliaController do
  @moduledoc """
  Renders JSON endpoints for populating our Algolia indexes for GTFS routes and stops.
  """
  use Phoenix.Controller, formats: [:json]

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  plug :allow_algolia_ip
  plug :put_view, namespace: DotcomWeb, json: DotcomWeb.AlgoliaJSON

  def routes(conn, _) do
    render(conn, :index, routes: [@routes_repo.green_line() | @routes_repo.all()])
  end

  def stops(conn, _) do
    render(conn, :index, stops: @stops_repo.all())
  end

  # https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/overview/#allow-algolia-ip-addresses
  @algolia_ip_addresses ["104.196.103.173", "35.234.69.129"]

  defp allow_algolia_ip(%{remote_ip: ip} = conn, _) when ip not in @algolia_ip_addresses,
    do: Plug.Conn.halt(conn)

  defp allow_algolia_ip(conn, _), do: conn
end
