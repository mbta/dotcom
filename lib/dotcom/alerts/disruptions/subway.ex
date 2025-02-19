defmodule Dotcom.Alerts.Disruptions.Subway do
  @moduledoc """
  Disruptions are alerts that have `service_impacting_effects` grouped by `service_range`.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import Dotcom.Routes, only: [subway_route_ids: 0]
  import Dotcom.Utils.ServiceDateTime, only: [service_range: 1]

  alias Alerts.Alert
  alias Dotcom.Utils

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Disruptions that occur any time after today's service range.
  """
  @spec future_disruptions() :: %{Utils.ServiceDateTime.named_service_range() => [Alert.t()]}
  def future_disruptions() do
    disruption_groups() |> Map.take([:later_this_week, :next_week, :after_next_week])
  end

  @doc """
  Disruptions that occur during today's service range.
  """
  @spec todays_disruptions() :: %{today: [Alert.t()]}
  def todays_disruptions() do
    disruption_groups() |> Map.take([:today])
  end

  # Groups all disruption alerts by service range.
  #
  # 1. Gets all alerts for subway routes.
  # 2. Filters out non-service-impacting alerts
  # 3. Groups them according to service range.
  defp disruption_groups() do
    subway_route_ids()
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.filter(&service_impacting_alert?/1)
    |> Enum.reduce(%{}, &group_alerts/2)
  end

  # Looks at every active period for an alert and groups that alert by service range.
  # Alerts can overlap service ranges, in which case we want them to appear in both.
  defp group_alerts(alert, groups) do
    alert
    |> Map.get(:active_period)
    |> Enum.map(fn {start, stop} -> [service_range(start), service_range(stop)] end)
    |> List.flatten()
    |> Enum.uniq()
    |> Enum.reduce(groups, fn service_range, groups ->
      Map.update(groups, service_range, [alert], &(&1 ++ [alert]))
    end)
  end
end
