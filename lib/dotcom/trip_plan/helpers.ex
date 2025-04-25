defmodule Dotcom.TripPlan.Helpers do
  @moduledoc """
  Functions for working with OpenTripPlanner data.
  """

  alias OpenTripPlannerClient.Schema.{Itinerary, Leg, Place, Route, Stop, Trip}

  @doc """
  For information associated with a MBTA GTFS feed, return the ID
  """
  @spec mbta_id(Place.t() | Route.t() | Stop.t() | Trip.t() | any()) :: String.t() | nil
  def mbta_id(%Place{stop: stop}), do: mbta_id(stop)
  def mbta_id(%{gtfs_id: "mbta-ma-us:" <> id}), do: id
  def mbta_id(_), do: nil

  @doc """
  For an OpenTripPlanner stop, return the MBTA commuter rail zone
  """
  @spec mbta_zone_id(Stop.t()) :: String.t() | nil
  def mbta_zone_id(%Stop{zone_id: "CR-zone-" <> zone_id}), do: zone_id
  def mbta_zone_id(_), do: nil

  defguard agency_name?(leg_or_route, agency_name)
           when not is_nil(leg_or_route.agency) and leg_or_route.agency.name == agency_name

  defguard mbta_shuttle?(route)
           when agency_name?(route, "MBTA") and route.type == 3 and
                  route.desc == "Rail Replacement Bus"
  # Icons we know we have SVGs for, modify if new icons are added/removed
  # These names are equivalent to the route names from the Massport GTFS
  @logan_express_icon_names ["BB", "BT", "DV", "FH", "WO"]
  @massport_icon_names ["11", "22", "33", "44", "55", "66", "77", "88", "99"]
  def logan_express_icon_names, do: @logan_express_icon_names
  def massport_icon_names, do: @massport_icon_names
end
