defmodule Dotcom.TripPlan.Fares do
  @moduledoc """
  A trip at a particular time.

  An Itinerary is a single trip, with the legs being the different types of
  travel. Itineraries are separate even if they use the same modes but happen
  at different times of day.
  """

  import Dotcom.TripPlan.Helpers

  alias Dotcom.TripPlan.Transfer
  alias Fares.Fare
  alias OpenTripPlannerClient.Schema.{Itinerary, Leg, Place}

  @spec fare(Itinerary.t()) :: non_neg_integer()
  def fare(%Itinerary{legs: legs}) do
    transit_legs = Enum.filter(legs, & &1.transit_leg)

    transit_legs
    |> Stream.with_index()
    |> Enum.reduce(0, &add_fares(&1, &2, transit_legs))
  end

  defp add_fares({leg, 0}, 0, _), do: cents_for_leg(leg)

  defp add_fares({leg, leg_index}, total, transit_legs) do
    # Look at this transit leg and previous transit leg(s)
    two_legs = transit_legs |> Enum.slice(leg_index - 1, 2)
    three_legs = transit_legs |> Enum.slice(leg_index - 2, 3)
    # If this is part of a free transfer, don't add fare
    cond do
      Transfer.bus_to_subway_transfer?(three_legs) ->
        if total == cents_for_leg(List.first(three_legs)),
          do: total + 70,
          else: total

      Transfer.maybe_transfer?(three_legs) ->
        total

      Transfer.subway_after_sl1_from_airport?(two_legs) ->
        total

      Transfer.bus_to_subway_transfer?(two_legs) ->
        total + 70

      Transfer.maybe_transfer?(two_legs) ->
        total

      true ->
        total + cents_for_leg(leg)
    end
  end

  # Massport shuttles are free
  def cents_for_leg(leg) when agency_name?(leg, "Massport"), do: 0

  # Back Bay Logan Express route is free from the Airport, $3 otherwise
  # All other Logan Express buses are $9.00
  def cents_for_leg(%Leg{from: %Place{name: from_name}, route: route})
      when agency_name?(route, "Logan Express") do
    if route.short_name == "BB" do
      if String.contains?(from_name, "Logan Airport") || String.contains?(from_name, "Terminal") do
        0
      else
        300
      end
    else
      900
    end
  end

  def cents_for_leg(%Leg{from: from, route: route, to: to}) when agency_name?(route, "MBTA") do
    route
    |> fare_filter_for_route(from, to)
    |> Keyword.put_new(:duration, :single_trip)
    |> Keyword.put_new(:reduced, nil)
    |> Fares.Repo.all()
    |> List.first()
    |> fare_cents()
  end

  # Non-transit legs don't have a fare
  def cents_for_leg(_), do: 0

  defp fare_filter_for_route(route, from, to) when route.type == 2 do
    if mbta_id(route) == "CR-Foxboro" do
      [name: :foxboro, duration: :round_trip]
    else
      from_zone = mbta_zone_id(from.stop)
      to_zone = mbta_zone_id(to.stop)

      if is_binary(from_zone) and is_binary(to_zone) do
        [name: Fares.calculate_commuter_rail(from_zone, to_zone)]
      else
        [mode: :commuter_rail]
      end
    end
  end

  defp fare_filter_for_route(route, from, to) when route.type == 4 do
    origin_id = mbta_id(from.stop)
    destination_id = mbta_id(to.stop)
    [name: Fares.calculate_ferry(origin_id, destination_id)]
  end

  defp fare_filter_for_route(route, _, _) when mbta_shuttle?(route) do
    [name: :free_fare]
  end

  defp fare_filter_for_route(route, from, _) when route.type == 3 do
    route_id = mbta_id(route)
    origin_id = mbta_id(from.stop)

    name =
      cond do
        Fares.express?(route_id) -> :express_bus
        Fares.silver_line_airport_stop?(route_id, origin_id) -> :free_fare
        Fares.silver_line_rapid_transit?(route_id) -> :subway
        true -> :local_bus
      end

    [name: name]
  end

  defp fare_filter_for_route(route, _, _) when route.type in [0, 1] do
    [mode: :subway]
  end

  defp fare_filter_for_route(route, _, _), do: [name: mbta_id(route)]

  @spec fare_cents(Fare.t() | nil) :: non_neg_integer()
  defp fare_cents(nil), do: 0
  defp fare_cents(%Fare{cents: cents}), do: cents
end
