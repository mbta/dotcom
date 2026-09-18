defmodule DotcomWeb.Hooks.Alerts do
  @moduledoc """
  Assign alerts to LiveViews
  """
  alias Alerts.Alert

  import Alerts.Alert, only: [global_banner_alert?: 1]
  import Dotcom.Alerts.StartTime, only: [active_in_next_n_days?: 3]
  import Phoenix.Component, only: [assign: 3]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]

  def on_mount(:stop_page, _params, _session, socket) do
    date_time = socket.assigns[:date_time] || @date_time_module.now()
    route_ids = socket.assigns[:routes_by_stop] || [] |> Enum.map(& &1.id)

    stop_alerts =
      socket.assigns.stop.id
      |> @alerts_repo.by_stop_id()

    banner_alerts =
      stop_alerts
      |> Kernel.++(routewide_alerts_for_route_ids(route_ids, date_time))
      |> Enum.filter(&stop_banner_alert?(&1, date_time))

    {:cont,
     socket
     |> assign(:alerts, stop_alerts)
     |> assign(:banner_alerts, banner_alerts)}
  end

  defp routewide_alerts_for_route_ids(route_ids, date_time) do
    route_ids
    |> @alerts_repo.by_route_ids(date_time)
    |> Enum.filter(&Alert.routewide?/1)
  end

  defp stop_banner_alert?(alert, now) do
    !global_banner_alert?(alert) &&
      banner_alert_active_effect?(alert) &&
      active_in_next_n_days?(alert, 7, now)
  end

  defp banner_alert_active_effect?(alert) do
    alert.effect in [
      :access_issue,
      :detour,
      :dock_closure,
      :dock_issue,
      :service_change,
      :elevator_closure,
      :notice,
      :shuttle,
      :station_closure,
      :station_issue,
      :stop_closure,
      :stop_moved,
      :stop_shoveling,
      :suspension
    ]
  end
end
