defmodule Dotcom.SystemStatus do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  subway system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  alias Dotcom.SystemStatus

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Returns a list of alerts that satisfy the following criteria:
  - They are for one of the subway or trolley lines (including Mattapan), and
  - They are either currently active, or will be later today
  """
  @spec subway_alerts_for_today :: [Alerts.Alert.t()]
  def subway_alerts_for_today() do
    subway_alerts_for_day(@date_time_module.now())
  end

  defp subway_alerts_for_day(datetime) do
    [
      "Red",
      "Orange",
      "Blue",
      "Green-B",
      "Green-C",
      "Green-D",
      "Green-E",
      "Mattapan"
    ]
    |> @alerts_repo.by_route_ids(datetime)
    |> SystemStatus.Alerts.for_day(datetime)
    |> SystemStatus.Alerts.filter_relevant()
  end

  @doc """
  Returns a map indicating the subway status for each of the subway lines.
  """
  @spec subway_status :: %{Routes.Route.id_t() => SystemStatus.Subway.status_entry_group()}
  def subway_status() do
    subway_alerts_for_today() |> SystemStatus.Subway.subway_status(@date_time_module.now())
  end
end
