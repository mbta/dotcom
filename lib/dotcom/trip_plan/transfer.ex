defmodule Dotcom.TripPlan.Transfer do
  @moduledoc """
    Tools for handling logic around transfers between transit legs and modes.
    The MBTA allows transfers between services depending on the fare media used
    and the amount paid.

    This logic may be superseded by the upcoming fares work.
  """
  alias OpenTripPlannerClient.Schema.{Agency, Leg, Place, Stop, Route}

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  # Paying a single-ride fare for the first may get you a transfer to the second
  # (can't be certain, as it depends on media used)!
  @single_ride_transfers %{
    :bus => [:subway, :bus],
    :subway => [:subway, :bus],
    :express_bus => [:subway, :bus, :express_bus]
  }

  @multi_ride_transfers %{
    :bus => [:bus, :bus, :subway],
    :subway => [:subway, :bus, :bus]
  }

  @doc "Searches a list of legs for evidence of an in-station subway transfer."
  @spec subway_transfer?([Leg.t()]) :: boolean
  def subway_transfer?([
        %Leg{
          to: %Place{stop: %Stop{gtfs_id: "mbta-ma-us:" <> to_stop_id}},
          transit_leg: true,
          route: route_to
        },
        %Leg{
          from: %Place{stop: %Stop{gtfs_id: "mbta-ma-us:" <> from_stop_id}},
          transit_leg: true,
          route: route_from
        }
        | _
      ]) do
    same_station?(from_stop_id, to_stop_id) and subway?(route_to) and subway?(route_from)
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
  def maybe_transfer?([
        first_leg = %Leg{
          agency: %Agency{name: "MBTA"},
          route: first_route
        },
        middle_leg = %Leg{
          agency: %Agency{name: "MBTA"},
          route: middle_route
        },
        last_leg = %Leg{
          agency: %Agency{name: "MBTA"},
          route: last_route
        }
      ]) do
    @multi_ride_transfers
    |> Map.get(Fares.to_fare_atom(first_route), [])
    |> Kernel.==(Enum.map([first_route, middle_route, last_route], &Fares.to_fare_atom/1))
    |> Kernel.and(maybe_transfer?([first_leg, middle_leg]))
    |> Kernel.and(maybe_transfer?([middle_leg, last_leg]))
  end

  def maybe_transfer?([
        %Leg{
          agency: %Agency{name: "MBTA"},
          route: from_route
        },
        %Leg{
          agency: %Agency{name: "MBTA"},
          route: to_route
        }
      ]) do
    if from_route === to_route and
         Enum.all?([from_route, to_route], &bus?/1) do
      false
    else
      @single_ride_transfers
      |> Map.get(Fares.to_fare_atom(from_route), [])
      |> Enum.member?(Fares.to_fare_atom(to_route))
    end
  end

  def maybe_transfer?(_), do: false

  @doc """
  Is there a bus to subway transfer?
  """
  def bus_to_subway_transfer?([
        first_leg = %Leg{
          agency: %Agency{name: "MBTA"}
        },
        middle_leg = %Leg{
          agency: %Agency{name: "MBTA"}
        },
        last_leg = %Leg{
          agency: %Agency{name: "MBTA"}
        }
      ]) do
    bus_to_subway_transfer?([first_leg, middle_leg]) ||
      bus_to_subway_transfer?([middle_leg, last_leg])
  end

  def bus_to_subway_transfer?([
        %Leg{
          agency: %Agency{name: "MBTA"},
          transit_leg: true,
          route: from_route
        },
        %Leg{
          agency: %Agency{name: "MBTA"},
          transit_leg: true,
          route: to_route
        }
      ]) do
    bus?(from_route) && subway?(to_route)
  end

  def bus_to_subway_transfer?(_), do: false

  defp same_station?(from_stop_id, to_stop_id) do
    to_parent_stop = @stops_repo.get_parent(to_stop_id)
    from_parent_stop = @stops_repo.get_parent(from_stop_id)

    cond do
      is_nil(to_parent_stop) or is_nil(from_parent_stop) ->
        false

      to_parent_stop == from_parent_stop ->
        true

      true ->
        # Check whether this is DTX <-> Park St via. the Winter St. Concourse
        uses_concourse?(to_parent_stop, from_parent_stop)
    end
  end

  defp bus?(%Route{gtfs_id: "mbta-ma-us:" <> route_id, type: 3, desc: desc})
       when desc != "Rail Replacement Bus" do
    not Fares.silver_line_rapid_transit?(route_id)
  end

  defp bus?(_), do: false

  def subway?(%Route{type: type}) when type in [0, 1], do: true

  def subway?(%Route{gtfs_id: "mbta-ma-us:" <> route_id, type: 3}) do
    Fares.silver_line_rapid_transit?(route_id)
  end

  def subway?(_), do: false

  defp uses_concourse?(%Stops.Stop{id: "place-pktrm"}, %Stops.Stop{id: "place-dwnxg"}),
    do: true

  defp uses_concourse?(%Stops.Stop{id: "place-dwnxg"}, %Stops.Stop{id: "place-pktrm"}),
    do: true

  defp uses_concourse?(_, _), do: false
end
