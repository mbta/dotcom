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
  alias OpenTripPlannerClient.Schema.{Itinerary, Leg, Place, Route}

  @agencies_with_fare_info ["MBTA", "Massport", "Logan Express"]

  @spec fare(Itinerary.t()) :: non_neg_integer() | nil
  def fare(%Itinerary{legs: legs}) do
    transit_legs = Enum.filter(legs, & &1.transit_leg)

    if Enum.any?(transit_legs, fn %Leg{agency: agency} ->
         agency.name not in @agencies_with_fare_info
       end) do
      nil
    else
      transit_legs
      |> group_transferable_legs()
      |> Enum.map(&group_fare/1)
      |> Enum.sum()
    end
  end

  # Splits legs into consecutive groups that can be transferred between one
  # another (per `Transfer.maybe_transfer?/1`). There's no limit on the
  # number of transfers within a group.
  @spec group_transferable_legs([Leg.t()]) :: [[Leg.t()]]
  defp group_transferable_legs([]), do: []

  defp group_transferable_legs([first_leg | rest_legs]) do
    rest_legs
    |> Enum.reduce([[first_leg]], fn leg, [current_group | finished_groups] ->
      if Transfer.maybe_transfer?([List.last(current_group), leg]) do
        [current_group ++ [leg] | finished_groups]
      else
        [[leg], current_group | finished_groups]
      end
    end)
    |> Enum.reverse()
  end

  # A group of transferable legs is charged only the cost of its
  # highest-priced leg -- unless it starts with a free SL1 boarding from the
  # airport, in which case the whole group remains free.
  @spec group_fare([Leg.t()]) :: non_neg_integer()
  defp group_fare([first_leg | _] = group) do
    if free_airport_boarding?(first_leg) do
      0
    else
      group
      |> Enum.map(&cents_for_leg/1)
      |> Enum.max()
    end
  end

  defp free_airport_boarding?(%Leg{route: route, from: from}) do
    Fares.silver_line_airport_stop?(mbta_id(route), mbta_id(from.stop))
  end

  defp free_airport_boarding?(_), do: false

  # Massport shuttles are free
  def cents_for_leg(leg) when agency_name?(leg, "Massport"), do: 0

  # Back Bay Logan Express route is free from the Airport, $3 otherwise
  def cents_for_leg(%Leg{from: %Place{name: from_name}, route: %Route{short_name: "BB"}} = leg)
      when agency_name?(leg, "Logan Express") do
    if String.contains?(from_name, "Logan Airport") || String.contains?(from_name, "Terminal") do
      0
    else
      300
    end
  end

  # All other Logan Express buses are $9.00
  def cents_for_leg(leg) when agency_name?(leg, "Logan Express"), do: 900

  def cents_for_leg(%Leg{from: from, route: route, to: to, intermediate_stops: between})
      when agency_name?(route, "MBTA") do
    route
    |> fare_filter_for_route(from, to, between)
    |> Keyword.put_new(:duration, :single_trip)
    |> Keyword.put_new(:reduced, nil)
    |> Fares.Repo.all()
    |> List.first()
    |> fare_cents()
  end

  # Non-transit legs don't have a fare
  def cents_for_leg(_), do: 0

  defp fare_filter_for_route(route, from, to, _) when route.type == 2 do
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

  defp fare_filter_for_route(route, from, to, between) when route.type == 4 do
    origin_id = mbta_id(from.stop)
    destination_id = mbta_id(to.stop)
    between_ids = between |> Enum.map(&mbta_id/1)

    [name: Fares.calculate_ferry(origin_id, destination_id, between_ids)]
  end

  defp fare_filter_for_route(route, _, _, _) when mbta_shuttle?(route) do
    [name: :free_fare]
  end

  defp fare_filter_for_route(route, from, _, _) when route.type == 3 do
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

  defp fare_filter_for_route(route, _, _, _) when route.type in [0, 1] do
    [mode: :subway]
  end

  defp fare_filter_for_route(route, _, _, _), do: [name: mbta_id(route)]

  @spec fare_cents(Fare.t() | nil) :: non_neg_integer()
  defp fare_cents(nil), do: 0
  defp fare_cents(%Fare{cents: cents}), do: cents
end
