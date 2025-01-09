defmodule Dotcom.SystemStatus do
  alias Dotcom.SystemStatus

  def subway_alerts_for_today() do
    subway_alerts_for_today(Timex.now())
  end

  def subway_alerts_for_today(now) do
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
    |> Alerts.Repo.by_route_ids(now)
    |> SystemStatus.Alerts.for_today(now)
    |> SystemStatus.Alerts.filter_relevant()
  end
end
