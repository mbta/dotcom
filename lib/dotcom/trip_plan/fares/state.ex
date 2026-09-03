defmodule Dotcom.TripPlan.Fares.State do
  @moduledoc """
  A simple utility struct that keeps track of the state of a trip as legs are added to it.
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

  @spec add_leg(t(), Leg.t()) :: t()
  def add_leg(fare_state, leg) do
    fare_state
    |> add_fare_from_leg(leg)
    |> set_station(leg)
  end

  @spec fare(t()) :: non_neg_integer()
  def fare(%__MODULE__{
        non_transfer_fare: non_transfer_fare,
        transfer_window_fare: transfer_window_fare
      }) do
    non_transfer_fare + transfer_window_fare
  end

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
