defmodule Dotcom.TripPlan.Transfer do
  @moduledoc """
    Tools for handling logic around transfers between transit legs and modes.
    The MBTA allows transfers between services depending on the fare media used
    and the amount paid.

    This logic may be superseded by the upcoming fares work.
  """

  import Dotcom.TripPlan.Helpers

  alias OpenTripPlannerClient.Schema.{Leg, Place, Route, Stop}

  # Paying a single-ride fare for the first may get you a transfer to the second
  # (can't be certain, as it depends on media used)!
  @single_ride_transfers %{
    :bus => [:subway, :bus],
    :subway => [:subway, :bus],
    :express_bus => [:subway, :bus, :express_bus]
  }

  # For Local Bus, Express Bus, Silver Line, and/or Subway, transfer up to two times
  # and pay only the cost of the highest-priced service.
  @multi_ride_transfers [
    [:bus, :subway, :bus],
    [:bus, :subway, :subway],
    [:bus, :bus, :subway],
    [:bus, :bus, :bus],
    [:subway, :bus, :bus],
    [:subway, :bus, :subway],
    [:subway, :subway, :bus],
    [:subway, :subway, :subway]
  ]

  @doc "Searches a list of legs for evidence of an in-station subway transfer."
  @spec subway_transfer?([Leg.t()]) :: boolean
  def subway_transfer?([first_leg, next_leg | _])
      when agency_name?(first_leg, "MBTA") and agency_name?(next_leg, "MBTA") do
    same_station?(first_leg.to, next_leg.from) and subway?(first_leg.route) and
      subway?(next_leg.route)
  end

  def subway_transfer?([_ | legs]), do: subway_transfer?(legs)

  def subway_transfer?(_), do: false

  @doc """
  Takes a set of legs and returns true if there might be a transfer between the legs, based on the lists in @single_ride_transfers and @multi_ride_transfers.

  Exceptions:
  - no transfers from bus route to same bus route
  - no transfers from a shuttle to any other mode
  """
  @spec maybe_transfer?([Leg.t()]) :: boolean
  def maybe_transfer?([first_leg, middle_leg, last_leg])
      when agency_name?(first_leg, "MBTA") and agency_name?(middle_leg, "MBTA") and
             agency_name?(last_leg, "MBTA") do
    @multi_ride_transfers
    |> Enum.member?(
      Enum.map([first_leg.route, middle_leg.route, last_leg.route], &to_fare_atom/1)
    )
    |> Kernel.and(maybe_transfer?([first_leg, middle_leg]))
    |> Kernel.and(maybe_transfer?([middle_leg, last_leg]))
  end

  def maybe_transfer?([from, to]) when agency_name?(from, "MBTA") and agency_name?(to, "MBTA") do
    if from.route === to.route and
         Enum.all?([from.route, to.route], &bus?/1) do
      false
    else
      @single_ride_transfers
      |> Map.get(to_fare_atom(from.route), [])
      |> Enum.member?(to_fare_atom(to.route))
    end
  end

  def maybe_transfer?(_), do: false

  # Based on `Fares.to_fare_atom/1`
  defp to_fare_atom(route) when mbta_shuttle?(route), do: :free_service

  defp to_fare_atom(%Route{type: 3} = route) do
    route_id = mbta_id(route)

    cond do
      Fares.silver_line_rapid_transit?(route_id) -> :subway
      Fares.express?(route_id) -> :express_bus
      true -> :bus
    end
  end

  defp to_fare_atom(route) do
    if route.type in 0..4 do
      Routes.Route.type_atom(route.type)
    end
  end

  @doc """
  Is there a bus to subway transfer?
  """
  def bus_to_subway_transfer?([first, middle, last])
      when agency_name?(first, "MBTA") and agency_name?(middle, "MBTA") and
             agency_name?(last, "MBTA") do
    bus_to_subway_transfer?([first, middle]) || bus_to_subway_transfer?([middle, last])
  end

  def bus_to_subway_transfer?([from, to])
      when agency_name?(from, "MBTA") and agency_name?(to, "MBTA") do
    bus?(from.route) && subway?(to.route)
  end

  def bus_to_subway_transfer?(_), do: false

  defp same_station?(%Place{stop: %Stop{} = from_stop}, %Place{stop: %Stop{} = to_stop}) do
    cond do
      is_nil(from_stop.parent_station) or is_nil(to_stop.parent_station) ->
        false

      from_stop.parent_station == to_stop.parent_station ->
        true

      true ->
        # Check whether this is DTX <-> Park St via. the Winter St. Concourse
        stop_id = mbta_id(to_stop.parent_station)
        other_stop_id = mbta_id(from_stop.parent_station)
        Enum.all?([stop_id, other_stop_id], &Enum.member?(["place-dwnxg", "place-pktrm"], &1))
    end
  end

  defp same_station?(_, _), do: false

  defp bus?(route) when route.type == 3 and not mbta_shuttle?(route) do
    route_id = mbta_id(route)
    not Fares.silver_line_rapid_transit?(route_id)
  end

  defp bus?(_), do: false

  defp subway?(%Route{type: type}) when type in [0, 1], do: true

  defp subway?(%Route{type: 3} = route) do
    route_id = mbta_id(route)
    Fares.silver_line_rapid_transit?(route_id)
  end

  defp subway?(_), do: false

  def bus_or_subway?(leg) when agency_name?(leg.route, "MBTA") do
    bus?(leg.route) or subway?(leg.route)
  end

  def bus_or_subway?(_), do: false

  def subway_after_sl1_from_airport?([first_leg, second_leg])
      when agency_name?(first_leg, "MBTA") and agency_name?(second_leg, "MBTA") and
             second_leg.route.type in [0, 1] do
    from_route_id = mbta_id(first_leg.route)
    from_stop_id = mbta_id(first_leg.from)
    Fares.silver_line_airport_stop?(from_route_id, from_stop_id)
  end

  def subway_after_sl1_from_airport?(_), do: false
end
