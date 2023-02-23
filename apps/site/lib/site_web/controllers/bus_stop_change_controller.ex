defmodule SiteWeb.BusStopChangeController do
  @moduledoc """
  Identify the set of alerts most indicative of bus stop relocations and closures, and display this on a page.

  This is a WIP.
  """
  use SiteWeb, :controller

  alias Alerts.Alert

  # Assigns bus stop change alerts to conn.assigns.alerts
  plug(:bus_stop_alerts)

  # SiteWeb.Plugs.AlertsByTimeframe takes alerts from conn.assigns.alerts and
  # groups into current & upcoming
  plug(SiteWeb.Plugs.AlertsByTimeframe)

  def show(conn, _params) do
    if Laboratory.enabled?(conn, :bus_changes) do
      conn
      # Don't let Google crawl this page
      |> put_resp_header("x-robots-tag", "noindex")
      |> render("index.html")
    else
      redirect(conn, to: alert_path(conn, :index))
    end
  end

  defp bus_stop_alerts(
         %{query_params: %{"alerts_timeframe" => alerts_timeframe}} = conn,
         _params
       )
       when alerts_timeframe in ["current", "upcoming"] do
    alerts = Alerts.Repo.all(conn.assigns.date_time)
    assign_bus_stop_alerts(conn, alerts)
  end

  # TODO: Implement historical alert data
  defp bus_stop_alerts(conn, _params) do
    assign_bus_stop_alerts(conn, [])
  end

  defp assign_bus_stop_alerts(conn, alerts) do
    assign(conn, :alerts, Enum.filter(alerts, &is_stop_move_or_closure?/1))
  end

  defp is_stop_move_or_closure?(%Alert{effect: effect}),
    do: effect in [:stop_closure, :stop_moved]
end
