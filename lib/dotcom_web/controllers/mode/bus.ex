defmodule DotcomWeb.Mode.BusController do
  use Dotcom.Gettext.Sigils

  use DotcomWeb.Mode.HubBehavior,
    meta_description:
      ~t"Schedule information for MBTA bus routes in the Greater Boston region, including real-time updates and arrival predictions."

  import DotcomWeb.Router.Helpers, only: [fare_path: 3]
  import PhoenixHTMLHelpers.Tag, only: [content_tag: 3]
  import Phoenix.HTML, only: [safe_to_string: 1]

  def route_type, do: 3

  def mode_name, do: ~t"Bus"

  def mode_icon, do: :bus

  def fare_description do
    gettext("For Express Bus fares, read the complete %{link} page.", link: link_to_bus_fares())
  end

  def fares do
    DotcomWeb.ViewHelpers.mode_summaries(:bus)
  end

  defp link_to_bus_fares do
    path = fare_path(DotcomWeb.Endpoint, :show, "bus-subway")
    tag = content_tag(:a, ~t"Bus Fares", href: path)

    safe_to_string(tag)
  end
end
