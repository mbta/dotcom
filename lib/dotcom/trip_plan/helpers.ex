defmodule Dotcom.TripPlan.Helpers do
  @moduledoc """
  Functions for working with OpenTripPlanner data.
  """

  # Icons we know we have SVGs for, modify if new icons are added/removed
  # These names are equivalent to the route names from the Massport GTFS
  @logan_express_icon_names ["BB", "BT", "DV", "FH", "WO"]
  @massport_icon_names ["11", "22", "33", "44", "55", "66", "77", "88", "99"]
  def logan_express_icon_names, do: @logan_express_icon_names
  def massport_icon_names, do: @massport_icon_names
end
