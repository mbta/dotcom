defmodule Dotcom.TripPlan.Helpers do
  @moduledoc """
  Functions for working with OpenTripPlanner data.
  """

  alias OpenTripPlannerClient.Schema.{Place, Route, Stop, Trip}

  @doc """
  For information associated with a MBTA GTFS feed, return the ID
  """
  def mbta_id(%Place{stop: stop}), do: mbta_id(stop)
  def mbta_id(%{gtfs_id: "mbta-ma-us:" <> id}), do: id
  def mbta_id(%{gtfs_id: "mbta-ma-us-initial:" <> id}), do: id
  def mbta_id(_), do: nil

  @doc """
  For an OpenTripPlanner stop, return the MBTA commuter rail zone
  """
  def mbta_zone_id(%Stop{zone_id: "CR-zone-" <> zone_id}), do: zone_id
  def mbta_zone_id(_), do: nil

  defguard agency_name?(leg_or_route, agency_name)
           when not is_nil(leg_or_route.agency) and leg_or_route.agency.name == agency_name

  defguard mbta_shuttle?(route)
           when agency_name?(route, "MBTA") and route.type == 3 and
                  route.desc == "Rail Replacement Bus"

  def route_name(%Route{long_name: long_name} = route)
      when agency_name?(route, "Logan Express") do
    long_name
  end

  def route_name(%Route{short_name: short_name, long_name: long_name} = route)
      when agency_name?(route, "Massport") do
    name = if long_name, do: long_name, else: short_name
    # Route such as "551" or "552"... truncate to "55"
    String.slice(name, 0..1)
  end

  def route_name(%Route{short_name: short_name, type: 3}) when is_binary(short_name),
    do: short_name

  def route_name(%Route{long_name: long_name}), do: long_name

  # A possibly more elaborate name for labeling.
  def route_label(route) when agency_name?(route, "Logan Express") do
    "#{route_name(route)} Logan Express"
  end

  def route_label(route) when agency_name?(route, "Massport") do
    "Massport Shuttle #{route_name(route)}"
  end

  def route_label(%Route{type: 2}), do: "Commuter Rail"

  def route_label(%Route{type: 3} = route) do
    route_name = route_name(route)

    if mbta_id(route) in Routes.Route.silver_line() do
      route_name
    else
      "Route #{route_name}"
    end
  end

  def route_label(%Route{type: 4}), do: "Ferry"

  def route_label(route) do
    case mbta_id(route) do
      "Mattapan" ->
        "Mattapan Trolley"

      "Green-" <> branch ->
        "Green Line #{branch} Branch"

      _ ->
        route_name(route)
    end
  end

  def route_color(route) when agency_name?(route, "Logan Express") do
    # Logan Express's GTFS route.color doesn't always match its branding, so we specify better colors here
    case route.short_name do
      "BB" -> "#f16823"
      "DV" -> "#704c9f"
      "WO" -> "#00954c"
      _ -> if(route.color, do: "##{route.color}", else: "#000000")
    end
  end

  def route_color(route) when mbta_shuttle?(route) do
    case route.short_name do
      "Blue" <> _ -> "#003DA5"
      "Green" <> _ -> "00843D"
      "Orange" <> _ -> "#ED8B00"
      "Red" <> _ -> "#DA291C"
      _ -> "#80276c"
    end
  end

  def route_color(%{color: color}) when is_binary(color), do: "##{color}"
  def route_color(_), do: "#000000"

  def route_line_name(route) do
    route
    |> mbta_id()
    |> case do
      "Mattapan" -> "mattapan-line"
      "Red" -> "red-line"
      "Green" -> "green-line"
      "Green-" <> branch -> "green-line-#{String.downcase(branch)}"
      "Blue" -> "blue-line"
      "Orange" -> "orange-line"
      _ -> nil
    end
  end

  # Icons we know we have SVGs for, modify if new icons are added/removed
  # These names are equivalent to the route names from the Massport GTFS
  @logan_express_icon_names ["BB", "BT", "DV", "FH", "WO"]
  @massport_icon_names ["11", "22", "33", "44", "55", "66", "77", "88", "99"]
  def logan_express_icon_names, do: @logan_express_icon_names
  def massport_icon_names, do: @massport_icon_names
end
