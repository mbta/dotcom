defmodule SiteWeb.Mode.CommuterRailController do
  use SiteWeb.Mode.HubBehavior,
    meta_description:
      "Schedule information for MBTA Commuter Rail lines in the Greater Boston region, " <>
        "including real-time updates and arrival predictions."

  import Phoenix.HTML.Link, only: [link: 2]

  def route_type, do: 2

  def mode_name, do: "Commuter Rail"

  def mode_icon, do: :commuter_rail

  def fare_description do
    [
      link_to_zone_fares(),
      " depend on the distance traveled (zones). Refer to the information below:"
    ]
  end

  def fares do
    SiteWeb.ViewHelpers.mode_summaries(:commuter_rail)
  end

  defp link_to_zone_fares do
    path = fare_path(SiteWeb.Endpoint, :show, "commuter-rail")
    link("Commuter Rail Fares", to: path)
  end
end
