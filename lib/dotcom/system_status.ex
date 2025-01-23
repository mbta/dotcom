defmodule Dotcom.SystemStatus do
  @moduledoc """
  The system status feature is a widget that's intended to appear on the
  homepage, as well as eventually several other places throughout the site.
  The widget will show statuses for each of the subway lines (Red, Orange,
  Green, Blue), which might look like "Normal Service", or information
  about current or upcoming alerts.

  This module is responsible for reporting data in a format that can easily
  be plugged into a component on the frontend.
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
end
