defmodule Dotcom.SystemStatus.CommuterRail do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  commuter rail system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]

  alias Routes.Route

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @repos_module Application.compile_env!(:dotcom, :repo_modules)

  @alerts_repo @repos_module[:alerts]
  @routes_repo @repos_module[:routes]
  @schedules_repo @repos_module[:schedules_condensed]

  def commuter_rail_status() do
    commuter_rail_routes()
    |> Enum.map(&route_info/1)
    |> Map.new()
  end

  defp commuter_rail_route_alerts(id) do
    [id]
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.filter(&service_impacting_alert?/1)
  end

  defp commuter_rail_routes() do
    @routes_repo.all()
    |> Enum.filter(&Routes.Route.commuter_rail?/1)
    |> Enum.sort_by(& &1.sort_order)
  end

  defp alert_counts(alerts) do
    alerts
    |> Enum.group_by(& &1.effect)
    |> Enum.map(fn {effect, alerts} ->
      {effect, Kernel.length(alerts)}
    end)
  end

  defp service_today?(id) do
    [id]
    |> @schedules_repo.by_route_ids()
    |> Kernel.length()
    |> Kernel.>=(1)
  end

  defp route_info(%Route{id: id, name: name}) do
    alert_counts =
      id
      |> commuter_rail_route_alerts()
      |> alert_counts()

    service_today? = service_today?(id)

    {id, %{alert_counts: alert_counts, name: name, service_today?: service_today?}}
  end
end
