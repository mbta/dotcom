defmodule Dotcom.TripPlan.Fares do
  @moduledoc """
  A trip at a particular time.

  An Itinerary is a single trip, with the legs being the different types of
  travel. Itineraries are separate even if they use the same modes but happen
  at different times of day.
  """

  alias Dotcom.TripPlan.Transfer
  alias Fares.Fare
  alias OpenTripPlannerClient.Schema.{Agency, Itinerary, Leg, Place, Route, Stop}

  @spec fare(Itinerary.t()) :: non_neg_integer() | nil
  def fare(%Itinerary{legs: legs}) do
    legs
    |> Enum.filter(& &1.transit_leg)
    |> Enum.map(fn leg -> {leg, cents_for_leg(leg)} end)
    |> List.foldr([], &free_subway_after_SL1_from_airport/2)
    |> List.foldr([], &free_transfers/2)
    |> Enum.map(&elem(&1, 1))
    |> Enum.sum()
  end

  defp free_subway_after_SL1_from_airport(
         {%Leg{route: %Route{gtfs_id: "mbta-ma-us:" <> route_id, type: type}} = leg, fare},
         [{%Leg{from: %Place{stop: %Stop{gtfs_id: "mbta-ma-us:" <> from_stop_id}}}, _} | _] =
           leg_list
       )
       when type in [0, 1] do
    if Fares.silver_line_airport_stop?(route_id, from_stop_id) do
      [{leg, 0} | leg_list]
    else
      [{leg, fare} | leg_list]
    end
  end

  defp free_subway_after_SL1_from_airport({leg, fare}, leg_list) do
    [{leg, fare} | leg_list]
  end

  # We have to check if there is a bus to subway transfer and manually add the transfer cost of $0.70.
  defp free_transfers(
         {leg, fare},
         [{prev_leg, _}, {earlier_leg, _} | _] =
           leg_list
       ) do
    # Look at this transit leg and previous transit leg(s)
    two_legs = [prev_leg, leg]
    three_legs = [earlier_leg, prev_leg, leg]
    # If this is part of a free transfer, don't add fare
    cond do
      Transfer.bus_to_subway_transfer?(three_legs) ->
        if Transfer.bus_to_subway_transfer?([prev_leg, leg]) do
          # bus -> bus -> subway
          [{leg, 70} | leg_list]
        else
          # bus -> subway -> something
          [{leg, 0} | leg_list]
        end

      Transfer.maybe_transfer?(three_legs) ->
        [{leg, 0} | leg_list]

      Transfer.bus_to_subway_transfer?(two_legs) ->
        [{leg, 70} | leg_list]

      Transfer.maybe_transfer?(two_legs) ->
        [{leg, 0} | leg_list]

      true ->
        [{leg, fare} | leg_list]
    end
  end

  defp free_transfers({leg, fare}, leg_list) do
    [{leg, fare} | leg_list]
  end

  # Non-transit legs don't have a fare
  def cents_for_leg(%Leg{transit_leg: false}), do: 0

  # Massport shuttles are free
  def cents_for_leg(%Leg{agency: %Agency{name: "Massport"}}), do: 0

  # Back Bay Logan Express route is free from the Airport, $3 otherwise
  # All other Logan Express buses are $9.00
  def cents_for_leg(%Leg{
        agency: %Agency{name: "Logan Express"},
        from: %Place{name: from_name},
        route: %Route{short_name: route_name}
      }) do
    if route_name == "BB" do
      if String.contains?(from_name, "Logan Airport") || String.contains?(from_name, "Terminal") do
        0
      else
        300
      end
    else
      900
    end
  end

  def cents_for_leg(%Leg{from: from, route: route, to: to}) do
    fare_filter_for_route(route, from.stop, to.stop)
    |> Keyword.put_new(:duration, :single_trip)
    |> Keyword.put_new(:reduced, nil)
    |> Fares.Repo.all()
    |> List.first()
    |> fare_cents()
  end

  defp fare_filter_for_route(%Route{gtfs_id: "mbta-ma-us:CR-Foxboro"}, _, _) do
    [name: :foxboro, duration: :round_trip]
  end

  defp fare_filter_for_route(
         %Route{type: 2},
         %Stop{zone_id: "CR-zone-" <> from_zone},
         %Stop{zone_id: "CR-zone-" <> to_zone}
       ) do
    [name: Fares.calculate_commuter_rail(from_zone, to_zone)]
  end

  defp fare_filter_for_route(%Route{type: 4}, %Stop{gtfs_id: "mbta-ma-us:" <> origin_id}, %Stop{
         gtfs_id: "mbta-ma-us" <> destination_id
       }) do
    [name: Fares.calculate_ferry(origin_id, destination_id)]
  end

  defp fare_filter_for_route(%Route{type: 4}, _, _) do
    [name: :commuter_ferry]
  end

  defp fare_filter_for_route(%Route{desc: "Rail Replacement Bus"}, _, _) do
    [name: :free_fare]
  end

  defp fare_filter_for_route(
         %Route{gtfs_id: "mbta-ma-us:" <> route_id, type: 3},
         %Stop{gtfs_id: "mbta-ma-us:" <> origin_id},
         _
       ) do
    name =
      cond do
        Fares.express?(route_id) -> :express_bus
        Fares.silver_line_airport_stop?(route_id, origin_id) -> :free_fare
        Fares.silver_line_rapid_transit?(route_id) -> :subway
        true -> :local_bus
      end

    [name: name]
  end

  defp fare_filter_for_route(%Route{type: route_type}, _, _) when route_type in [0, 1] do
    [mode: :subway]
  end

  defp fare_filter_for_route(%Route{gtfs_id: gtfs_route_id}, _, _) do
    [_, route_id] = String.split(gtfs_route_id, ":")
    [name: route_id]
  end

  @spec fare_cents(Fare.t() | nil) :: non_neg_integer()
  defp fare_cents(nil), do: 0
  defp fare_cents(%Fare{cents: cents}), do: cents
end
