defmodule Dotcom.TripPlan.Fares do
  @moduledoc """
  A trip at a particular time.

  An Itinerary is a single trip, with the legs being the different types of
  travel. Itineraries are separate even if they use the same modes but happen
  at different times of day.
  """

  import Dotcom.TripPlan.Helpers

  alias __MODULE__.State
  alias Fares.Fare
  alias OpenTripPlannerClient.Schema.{Itinerary, Leg, Place, Route}

  @spec fare(Itinerary.t()) :: non_neg_integer() | nil
  def fare(%Itinerary{legs: legs}) do
    legs
    |> Enum.reduce(State.new(), fn leg, state ->
      State.add_leg(state, leg)
    end)
    |> State.fare()
  end

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
        Fares.fare_free_bus?(route_id) -> :free_fare
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
