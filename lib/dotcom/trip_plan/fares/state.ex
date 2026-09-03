defmodule Dotcom.TripPlan.Fares.State do
  @moduledoc """
  Tracks the accumulated fare for an itinerary as its legs are processed one
  at a time.

  This module is intended to reflect the following features of our fare policy:
    * Unlimited transfers between subway, bus, and ferry within a two-hour
      window.
    * Free in-station transfers between different subway lines, and between
      SL1/2/3/W and subway.
    * Commuter rail and Logan Express bus fares are stored separately, and
      have no transfer discounts.

  This module models that behavior by accumulating legs via `add_leg/2` and
  keeping track of the existing transfer window and transferable fare (using
  `transfer_window_fare` and `transfer_window_start_time`), and whether the
  trip is currently inside a station (using `current_station_id`) for the
  purpose of determining free in-station transfers.

  ## Lifecycle

  Create a `%Fares.State{}` struct by calling `new/0`, and add legs in order
  by calling `add_leg/2`. Once all legs have been added, `fare/1` will return
  the total fare for the trip.

  ## Examples

  A bus leg followed by a subway leg a few minutes later: since both fall
  within the same 2-hour transfer window, the rider is only charged the
  higher of the two fares (the subway fare), rather than the sum of both.

      iex> bus_leg = build(:transit_leg,
      ...>   route: build(:route, type: 3, agency: build(:agency, name: "MBTA")),
      ...>   start: build(:leg_time, scheduled_time: ~U[2024-01-01 08:00:00Z])
      ...> )
      iex> subway_leg = build(:transit_leg,
      ...>   route: build(:route, type: 1, agency: build(:agency, name: "MBTA")),
      ...>   start: build(:leg_time, scheduled_time: ~U[2024-01-01 08:10:00Z])
      ...> )
      iex> State.new() |> State.add_leg(bus_leg) |> State.add_leg(subway_leg) |> State.fare()
      240

  The same bus and subway legs, but separated by more than 2 hours: the
  transfer window has closed by the time the subway leg starts, so each leg
  is charged its own fare in full.

      iex> bus_leg = build(:transit_leg,
      ...>   route: build(:route, type: 3, agency: build(:agency, name: "MBTA")),
      ...>   start: build(:leg_time, scheduled_time: ~U[2024-01-01 08:00:00Z])
      ...> )
      iex> subway_leg = build(:transit_leg,
      ...>   route: build(:route, type: 1, agency: build(:agency, name: "MBTA")),
      ...>   start: build(:leg_time, scheduled_time: ~U[2024-01-01 11:00:00Z])
      ...> )
      iex> State.new() |> State.add_leg(bus_leg) |> State.add_leg(subway_leg) |> State.fare()
      410

  A Commuter Rail leg followed by a bus leg a few minutes later: Commuter
  Rail never participates in the transfer window, so its fare is always
  added on top of any other legs' fares in full.

      iex> commuter_rail_leg = build(:transit_leg,
      ...>   route: build(:route, type: 2, agency: build(:agency, name: "MBTA")),
      ...>   from: build(:place, stop: build(:stop, zone_id: "CR-zone-1A")),
      ...>   to: build(:place, stop: build(:stop, zone_id: "CR-zone-5")),
      ...>   start: build(:leg_time, scheduled_time: ~U[2024-01-01 08:00:00Z])
      ...> )
      iex> bus_leg = build(:transit_leg,
      ...>   route: build(:route, type: 3, agency: build(:agency, name: "MBTA")),
      ...>   start: build(:leg_time, scheduled_time: ~U[2024-01-01 08:50:00Z])
      ...> )
      iex> State.new() |> State.add_leg(commuter_rail_leg) |> State.add_leg(bus_leg) |> State.fare()
      1145
  """

  import Dotcom.TripPlan.Helpers

  alias OpenTripPlannerClient.Schema.{Leg, ParentStop, Place, Route, Stop}

  @type t :: %__MODULE__{
          current_station_id: String.t() | nil,
          non_transfer_fare: non_neg_integer(),
          transfer_window_fare: non_neg_integer(),
          transfer_window_start_time: DateTime.t() | nil
        }

  defstruct [
    :current_station_id,
    :non_transfer_fare,
    :transfer_window_fare,
    :transfer_window_start_time
  ]

  @doc """
  Adds a leg to the fare state, updating the accumulated fare and, if
  applicable, the current transfer window and station.
  """
  @spec add_leg(t(), Leg.t()) :: t()
  def add_leg(fare_state, leg) do
    fare_state
    |> add_fare_from_leg(leg)
    |> set_station(leg)
  end

  @doc """
  Returns the total accumulated fare, in cents, for all legs added so far.
  """
  @spec fare(t()) :: non_neg_integer()
  def fare(%__MODULE__{
        non_transfer_fare: non_transfer_fare,
        transfer_window_fare: transfer_window_fare
      }) do
    non_transfer_fare + transfer_window_fare
  end

  @doc """
  Creates a new, empty fare state with no fare accumulated yet.
  """
  @spec new() :: t()
  def new() do
    %__MODULE__{non_transfer_fare: 0, transfer_window_fare: 0}
  end

  # add_fare_from_leg does slightly different things depending on the
  # exact scenario:
  #
  # If the leg would not require a tap (because it's an in-station
  # transfer, or because it's a free fare, or because it's a walking
  # leg), then we don't change the fare state at all.
  #
  # If the leg would require a fare, but isn't part of our transfer
  # policy (e.g. commuter rail, or Logan Express), then we add the
  # fare for that leg directly to `non_transfer_fare`, which has no
  # transfer discount logic, and is simply added to the total fare at
  # the end.
  #
  # If the leg is a tap on the subway, bus, or ferry, then we check
  # the following:
  #
  # - If there's no transfer window, we start one, and set the
  #   `transfer_window_fare` to the leg's fare.
  #
  # - If there is a transfer window, and the leg's start time falls
  #   within the two-hour range, then we set the
  #   `transfer_window_fare` to the maximum of either its previous
  #   value or the leg's fare.
  #
  # - If there is a transfer window, and the leg's start time falls
  #   outside of the two-hour range, then we lock in the current
  #   transfer window fare by adding it to `non_transfer_fare`, and
  #   set the `transfer_window_fare` to the leg's fare.
  #
  # Under the hood, those last three bullet points are accomplished
  # with maybe_reset_transfer_window/2, which uses the leg's start
  # time to reset the transfer window if and only if the start time is
  # outside of the previously-existing window (if it exists), and
  # add_fare_to_transfer_window/2, which assumes that the fare should
  # be added to the current window and sets the `transfer_window_fare`
  # appropriately.
  @spec add_fare_from_leg(t(), Leg.t()) :: t()
  defp add_fare_from_leg(
         %__MODULE__{} = fare_state,
         leg
       )
       when leg.route.type in [0, 1, 3, 4] and agency_name?(leg, "MBTA") do
    fare_for_leg = Dotcom.TripPlan.Fares.cents_for_leg(leg)

    if fare_for_leg == 0 || in_station_transfer?(fare_state, leg) do
      fare_state
    else
      leg_start_time = leg.start.scheduled_time

      fare_state
      |> maybe_reset_transfer_window(leg_start_time)
      |> add_fare_to_transfer_window(fare_for_leg)
    end
  end

  defp add_fare_from_leg(%__MODULE__{non_transfer_fare: non_transfer_fare} = fare_state, leg) do
    fare_for_leg = Dotcom.TripPlan.Fares.cents_for_leg(leg)

    %__MODULE__{fare_state | non_transfer_fare: non_transfer_fare + fare_for_leg}
  end

  # If the following are true, the it's an in-station transfer, and
  # thus should not reset the transfer window or incur any additional
  # charges.
  #
  # - The `current_station_id` of the fare state, and the station ID
  #   from the leg's `from` field are the same.
  # - The leg is a subway or an SL1/2/3/W trip.
  @spec in_station_transfer?(t(), Leg.t()) :: boolean()
  defp in_station_transfer?(
         %__MODULE__{current_station_id: current_station_id},
         %Leg{
           from: %Place{stop: %Stop{parent_station: %ParentStop{gtfs_id: leg_station_id}}},
           route: %Route{} = route
         }
       )
       when current_station_id != nil and current_station_id == leg_station_id do
    subway_or_sl?(route)
  end

  defp in_station_transfer?(_fare_state, _leg), do: false

  @spec subway_or_sl?(Route.t()) :: boolean()
  defp subway_or_sl?(%Route{type: route_type}) when route_type in [0, 1], do: true

  defp subway_or_sl?(%Route{gtfs_id: gtfs_route_id, type: 3}) do
    mbta_id =
      gtfs_route_id
      |> mbta_id()

    mbta_id && mbta_id |> Fares.silver_line_rapid_transit?()
  end

  defp subway_or_sl?(_), do: false

  # This function checks whether the leg's start time is within the
  # current transfer window. If it's outside of the transfer window,
  # then it resets the transfer window to the leg's start time;
  # otherwise, it does nothing.
  @spec maybe_reset_transfer_window(t(), DateTime.t()) :: t()
  defp maybe_reset_transfer_window(fare_state, leg_start_time) do
    if in_window?(leg_start_time, fare_state) do
      fare_state
    else
      fare_state |> reset_transfer_window(leg_start_time)
    end
  end

  # Resetting the transfer window involves three updates:
  #
  # - Add the previous `transfer_window_fare` to `non_transfer_fare`;
  #   since the the window has expired, the fare is no longer eligible
  #   for transfer discounts.
  #
  # - Set the `transfer_window_fare` to 0 - the later call to
  #   `add_fare_to_transfer_window/2` will update
  #   `transfer_window_fare` again to reflect the tap that caused the
  #   transfer window to reset.
  #
  # - Set the `transfer_window_start_time` to the leg's start time.
  @spec reset_transfer_window(t(), DateTime.t()) :: t()
  defp reset_transfer_window(
         %__MODULE__{
           non_transfer_fare: non_transfer_fare,
           transfer_window_fare: transfer_window_fare
         } = fare_state,
         leg_start_time
       ) do
    %__MODULE__{
      fare_state
      | non_transfer_fare: non_transfer_fare + transfer_window_fare,
        transfer_window_fare: 0,
        transfer_window_start_time: leg_start_time
    }
  end

  # This function assumes that we're adding the fare to the current
  # transfer window (its caller calls `reset_transfer_window`
  # first). It does this by setting `transfer_window_fare` to the
  # maximum of either its previous value or the leg's fare.
  @spec add_fare_to_transfer_window(t(), non_neg_integer()) :: t()
  defp add_fare_to_transfer_window(
         %__MODULE__{transfer_window_fare: transfer_window_fare} = fare_state,
         fare_for_leg
       ) do
    %__MODULE__{fare_state | transfer_window_fare: max(fare_for_leg, transfer_window_fare)}
  end

  # Checks whether the leg's start time is within the existing
  # transfer window.  Defaults to false if there isn't an existing
  # window.
  @spec in_window?(DateTime.t(), t()) :: boolean()
  defp in_window?(_leg_start_time, %__MODULE__{transfer_window_start_time: nil}), do: false

  defp in_window?(
         leg_start_time,
         %__MODULE__{transfer_window_start_time: transfer_window_start_time}
       ) do
    transfer_window_start_time
    |> DateTime.shift(hour: 2)
    |> DateTime.after?(leg_start_time)
  end

  # Sets the `current_station_id` for use by
  # `in_station_transfer?/2`. If a trip is a transit leg via subway or
  # SL1/2/3/W into a station, then we set the current station to that
  # parent station. Trips by other routes or modes have no effect.
  # 
  # Note: We leave the `current_station_id` even if a leg exits that
  # station. This feels weird, but since it's used to determine
  # `in_station_transfer?/2`, and itineraries don't visit the same
  # station multiple times, this doesn't actually have any effect.
  @spec set_station(t(), Leg.t()) :: t()
  defp set_station(%__MODULE__{} = fare_state, %Leg{route: %Route{} = route} = leg) do
    if subway_or_sl?(route) do
      station_id = leg |> get_in([:to, :stop, :parent_station, :gtfs_id])

      %__MODULE__{fare_state | current_station_id: station_id}
    else
      fare_state
    end
  end

  defp set_station(fare_state, _leg), do: fare_state
end
