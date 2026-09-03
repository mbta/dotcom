defmodule Dotcom.TripPlan.Fares.State do
  @moduledoc """
  Tracks the accumulated fare for a trip as its legs are processed one at a time.

  Transit fare systems often grant free or discounted transfers between trips
  taken within a certain time window (e.g. two hours) of each other, provided
  the rider stays "in system" (for example, remaining within a subway
  station's paid area). This module models that behavior by accumulating legs
  via `add_leg/2` and keeping track of:

    * `non_transfer_fare` - the portion of the fare that has already been
      finalized and is no longer eligible for a transfer discount.
    * `transfer_window_fare` - the highest-cost leg fare seen within the
      current transfer window; only this amount (rather than the sum of all
      legs in the window) is charged once the window closes.
    * `transfer_window_start_time` - when the current transfer window began,
      used to determine whether a subsequent leg still falls within it.
    * `current_station_id` - the parent station the rider is currently
      considered to be "inside" of, used to detect free in-station transfers
      between subway/Silver Line routes.

  Call `new/0` to create an initial state, `add_leg/2` for each leg of the
  itinerary in order, and `fare/1` to get the total accumulated fare (in
  cents) once all legs have been added.

  Only MBTA subway, bus, and ferry legs (route types 0, 1, 3, and 4) are
  eligible for the transfer discount. Commuter Rail legs (route type 2), and
  legs on other agencies, are always charged in full and added directly to
  `non_transfer_fare`.

  ## Examples

  The examples below use `OpenTripPlannerClient.Test.Support.Factory` to build
  legs, only specifying the fields that affect the fare calculation.

  A bus leg followed by a subway leg a few minutes later: since both fall
  within the same 2-hour transfer window, the rider is only charged the
  higher of the two fares (the subway fare), rather than the sum of both.

      iex> import OpenTripPlannerClient.Test.Support.Factory
      iex> alias Dotcom.TripPlan.Fares.State
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

      iex> import OpenTripPlannerClient.Test.Support.Factory
      iex> alias Dotcom.TripPlan.Fares.State
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

      iex> import OpenTripPlannerClient.Test.Support.Factory
      iex> alias Dotcom.TripPlan.Fares.State
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

  @spec add_fare_from_leg(t(), Leg.t()) :: t()
  defp add_fare_from_leg(fare_state, %Leg{mode: :WALK}), do: fare_state

  defp add_fare_from_leg(
         %__MODULE__{} = fare_state,
         leg
       )
       when leg.route.type in [0, 1, 3, 4] and agency_name?(leg, "MBTA") do
    if in_station_transfer?(fare_state, leg) do
      fare_state
    else
      fare_for_leg = Dotcom.TripPlan.Fares.cents_for_leg(leg)
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

  @spec add_fare_to_transfer_window(t(), non_neg_integer()) :: t()
  defp add_fare_to_transfer_window(
         %__MODULE__{transfer_window_fare: transfer_window_fare} = fare_state,
         fare_for_leg
       ) do
    %__MODULE__{fare_state | transfer_window_fare: max(fare_for_leg, transfer_window_fare)}
  end

  @spec maybe_reset_transfer_window(t(), DateTime.t()) :: t()
  defp maybe_reset_transfer_window(fare_state, leg_start_time) do
    if in_window?(leg_start_time, fare_state) do
      fare_state
    else
      fare_state |> reset_transfer_window(leg_start_time)
    end
  end

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
