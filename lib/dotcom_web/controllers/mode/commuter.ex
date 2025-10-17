defmodule DotcomWeb.Mode.CommuterRailController do
  use Dotcom.Gettext.Sigils

  use DotcomWeb.Mode.HubBehavior,
    meta_description:
      ~t"Schedule information for MBTA Commuter Rail lines in the Greater Boston region, including real-time updates and arrival predictions."

  import DotcomWeb.Router.Helpers, only: [fare_path: 3]
  import PhoenixHTMLHelpers.Link, only: [link: 2]

  def route_type, do: 2

  def mode_name, do: ~t"Commuter Rail"

  def mode_icon, do: :commuter_rail

  def fare_description do
    gettext(
      "%{link} depend on the distance traveled (zones). Refer to the information below:",
      link: link_to_zone_fares()
    )
  end

  def fares do
    DotcomWeb.ViewHelpers.mode_summaries(:commuter_rail)
  end

  defp link_to_zone_fares do
    path = fare_path(DotcomWeb.Endpoint, :show, "commuter-rail")

    link(~t"Commuter Rail Fares", to: path)
  end
end
