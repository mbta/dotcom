defmodule SiteWeb.BusStopChangeController do
  use SiteWeb, :controller

  alias Alerts.Alert

  def index(conn, _params) do
    if Laboratory.enabled?(conn, :bus_changes) do
      conn
      # Don't let Google crawl this page
      |> put_resp_header("x-robots-tag", "noindex")
      # |> assign(:meta_description, "TBA")
      |> assign(:alerts, bus_stop_alerts(conn.assigns.date_time))
      |> render("index.html", %{})
    else
      redirect(conn, to: alert_path(conn, :index))
    end
  end

  """
  Identify the set of alerts most indicative of bus stop relocations and closures.
  This is a WIP.
  """

  defp bus_stop_alerts(date_time) do
    Alerts.Repo.all(date_time)
    |> Enum.filter(fn %Alert{
                        active_period: _active_period,
                        effect: effect,
                        lifecycle: _lifecycle
                      } = alert ->
      is_closed? = effect in [:stop_closure, :stop_moved, :service_change]

      other_adverse_effects? =
        effect in [
          :snow_route,
          :schedule_change,
          :dock_closure,
          :detour,
          :cancellation,
          :access_issue,
          :station_issue,
          :stop_shoveling,
          :station_closure,
          :suspension,
          :shuttle,
          :no_service,
          :facility_issue
        ]

      stop_set = Alert.get_entity(alert, :stop) |> MapSet.delete(nil)
      affects_stop? = MapSet.size(stop_set) > 0
      # if affects_stop?, do: IO.inspect(stop_set, label: alert.id)
      is_closed? || (affects_stop? && other_adverse_effects?)
    end)
  end
end
