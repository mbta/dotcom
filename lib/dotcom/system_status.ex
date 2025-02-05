defmodule Dotcom.SystemStatus do
  @moduledoc """
  This module exists to provide a simple view into the status of the
  subway system, for each line, showing whether its running normally,
  or whether there are alerts that impact service.
  """

  alias Dotcom.SystemStatus

  @doc """
  Returns a list of alerts that satisfy the following criteria:
  - They are for one of the subway or trolley lines (including Mattapan), and
  - They are either currently active, or will be later today
  """
  def subway_alerts_for_today() do
    subway_alerts_for_day(Timex.now())
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
    |> Alerts.Repo.by_route_ids(datetime)
    |> SystemStatus.Alerts.for_day(datetime)
    |> SystemStatus.Alerts.filter_relevant()
  end

  @doc """
  Returns a map indicating the subway status for each of the subway lines.
  """
  def subway_status() do
    subway_alerts_for_today() |> SystemStatus.Subway.subway_status(Timex.now())
  end
end
