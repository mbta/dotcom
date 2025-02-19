defmodule Dotcom.SystemStatus do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  subway system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  alias Dotcom.SystemStatus

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Returns a list of today's disuptions, omitting alerts which have ended before now 
  """
  @spec subway_alerts_for_today :: [Alerts.Alert.t()]
  def subway_alerts_for_today() do
    Dotcom.Alerts.Disruptions.Subway.todays_disruptions()
    |> Map.get(:today, [])
    |> SystemStatus.Alerts.for_day(@date_time_module.now())
  end

  @doc """
  Returns a map indicating the subway status for each of the subway lines.
  """
  @spec subway_status :: %{Routes.Route.id_t() => SystemStatus.Subway.status_entry_group()}
  def subway_status() do
    subway_alerts_for_today() |> SystemStatus.Subway.subway_status(@date_time_module.now())
  end
end
