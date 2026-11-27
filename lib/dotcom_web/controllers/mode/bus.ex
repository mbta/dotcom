defmodule DotcomWeb.Mode.BusController do
  use Dotcom.Gettext.Sigils

  def meta_description,
    do:
      ~t"Schedule information for MBTA bus routes in the Greater Boston region, including real-time updates and arrival predictions."

  def route_type, do: 3

  def mode_name, do: ~t"Bus"

  def mode_icon, do: :bus

  def fares do
    DotcomWeb.ViewHelpers.mode_summaries(:bus)
  end
end
