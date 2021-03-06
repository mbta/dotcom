defmodule TripPlan.Transfer do
  @moduledoc """
    Tools for handling logic around transfers between transit legs and modes.
    The MBTA allows transfers between services depending on the fare media used
    and the amount paid.

    This logic may be superseded by the upcoming fares work.
  """
  alias TripPlan.{Leg, NamedPosition, TransitDetail}

  # Paying a single-ride fare for the first may get you a transfer to the second
  # (can't be certain, as it depends on media used)!
  @single_ride_transfers %{
    :bus => [:subway, :bus],
    :subway => [:subway, :bus],
    :express_bus => [:subway, :bus]
  }

  @doc "Searches a list of legs for evidence of an in-station subway transfer."
  @spec is_subway_transfer?([Leg.t()]) :: boolean
  def is_subway_transfer?([
        %Leg{to: %NamedPosition{stop_id: to_stop}, mode: %TransitDetail{route_id: route_to}},
        %Leg{
          from: %NamedPosition{stop_id: from_stop},
          mode: %TransitDetail{route_id: route_from}
        }
        | _
      ]) do
    same_station?(from_stop, to_stop) and is_subway?(route_to) and is_subway?(route_from)
  end

  def is_subway_transfer?([_ | legs]), do: is_subway_transfer?(legs)

  def is_subway_transfer?(_), do: false

  @doc "Takes a pair of legs and returns true if there might be a transfer between the two, based on the list in @single_ride_transfers. Exception: no transfers from bus route to same bus route."
  @spec is_maybe_transfer?([Leg.t()]) :: boolean
  def is_maybe_transfer?([
        %Leg{mode: %TransitDetail{route_id: from_route}},
        %Leg{mode: %TransitDetail{route_id: to_route}}
      ]) do
    if from_route === to_route and
         Enum.all?([from_route, to_route], &is_bus?/1) do
      false
    else
      Map.get(@single_ride_transfers, Fares.to_fare_atom(from_route), [])
      |> Enum.member?(Fares.to_fare_atom(to_route))
    end
  end

  def is_maybe_transfer?(_), do: false

  defp same_station?(from_stop, to_stop) do
    to_parent_stop = Stops.Repo.get_parent(to_stop)
    from_parent_stop = Stops.Repo.get_parent(from_stop)

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

  defp is_bus?(route), do: Fares.to_fare_atom(route) == :bus
  def is_subway?(route), do: Fares.to_fare_atom(route) == :subway

  defp uses_concourse?(%Stops.Stop{id: "place-pktrm"}, %Stops.Stop{id: "place-dwnxg"}),
    do: true

  defp uses_concourse?(%Stops.Stop{id: "place-dwnxg"}, %Stops.Stop{id: "place-pktrm"}),
    do: true

  defp uses_concourse?(_, _), do: false
end
