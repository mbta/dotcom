defmodule DotcomWeb.Mode.CommuterRailController do
  use Dotcom.Gettext.Sigils

  def meta_description,
    do:
      ~t"Schedule information for MBTA Commuter Rail lines in the Greater Boston region, including real-time updates and arrival predictions."

  def route_type, do: 2

  def mode_name, do: ~t"Commuter Rail"

  def mode_icon, do: :commuter_rail

  def fares do
    DotcomWeb.ViewHelpers.mode_summaries(:commuter_rail)
  end
end
