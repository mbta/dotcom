defmodule Dotcom.SystemStatus.CommuterRail do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  commuter rail system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]

  alias Dotcom.SystemStatus
  alias Routes.Route

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @repos_module Application.compile_env!(:dotcom, :repo_modules)

  @alerts_repo @repos_module[:alerts]
  @routes_repo @repos_module[:routes]

  def commuter_rail_status() do
    commuter_rail_routes()
    |> Map.new(fn route ->
      {route.id, commuter_rail_route_alerts(route)}
    end)
  end

  def commuter_rail_alerts() do
    commuter_rail_routes()
    |> Enum.map(&commuter_rail_route_alerts/1)
    |> Map.new()
  end

  defp commuter_rail_route_alerts(%Route{id: id}) do
    [id]
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.filter(&service_impacting_alert?/1)
    |> SystemStatus.alerts_to_statuses(@date_time_module.now)
  end

  defp commuter_rail_routes() do
    @routes_repo.all()
    |> Enum.filter(&Routes.Route.commuter_rail?/1)
    |> Enum.sort_by(& &1.sort_order)
  end
end
