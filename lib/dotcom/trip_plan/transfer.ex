defmodule Dotcom.TripPlan.Transfer do
  @moduledoc """
    Tools for handling logic around transfers between transit legs and modes.
    The MBTA allows transfers between services depending on the fare media used
    and the amount paid.

    Local Bus, Express Bus, Silver Line, Subway, and Ferry legs can all be
    freely transferred between one another (in any combination, for any
    number of consecutive transfers), so a chain of such legs is only
    charged the cost of its single highest-priced leg.

    This logic may be superseded by the upcoming fares work.
  """

  import Dotcom.TripPlan.Helpers

  alias OpenTripPlannerClient.Schema.{Leg, Route}

  # Paying a single-ride fare for the first may get you a transfer to the second
  # (can't be certain, as it depends on media used)!
  @single_ride_transfers %{
    :bus => [:subway, :bus, :ferry],
    :subway => [:bus, :subway, :ferry],
    :ferry => [:bus, :subway, :ferry],
    :express_bus => [:subway, :bus, :express_bus]
  }

  @doc """
  Takes a set of legs and returns true if there might be a transfer between
  every consecutive pair of legs, based on the list in @single_ride_transfers.
  Any number of legs may be passed; there's no limit on how many consecutive
  transfers can be made.

  Exceptions:
  - no transfers from bus route to same bus route
  - no transfers from a shuttle to any other mode
  """
  @spec maybe_transfer?([Leg.t()]) :: boolean
  def maybe_transfer?([_first, _second, _third | _] = legs) do
    legs
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.all?(&maybe_transfer?/1)
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
end
