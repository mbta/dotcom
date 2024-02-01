defmodule TripPlan.Leg do
  @moduledoc """
  A single-mode part of an Itinerary

  An Itinerary can take multiple modes of transportation (walk, bus,
  train, &c). Leg represents a single mode of travel during journey.
  """
  alias TripPlan.{PersonalDetail, TransitDetail, NamedPosition}

  defstruct start: DateTime.from_unix!(-1),
            stop: DateTime.from_unix!(0),
            mode: nil,
            from: nil,
            to: nil,
            name: nil,
            long_name: nil,
            type: nil,
            description: nil,
            url: nil,
            polyline: ""

  @type mode :: PersonalDetail.t() | TransitDetail.t()
  @type t :: %__MODULE__{
          start: DateTime.t(),
          stop: DateTime.t(),
          mode: mode,
          from: NamedPosition.t() | nil,
          to: NamedPosition.t(),
          name: String.t(),
          long_name: String.t(),
          type: String.t(),
          description: String.t(),
          url: String.t(),
          polyline: String.t()
        }

  @doc "Returns the route ID for the leg, if present"
  @spec route_id(t) :: {:ok, Routes.Route.id_t()} | :error
  def route_id(%__MODULE__{mode: %TransitDetail{route_id: route_id}}), do: {:ok, route_id}
  def route_id(%__MODULE__{}), do: :error

  @doc "Returns the trip ID for the leg, if present"
  @spec trip_id(t) :: {:ok, Schedules.Trip.id_t()} | :error
  def trip_id(%__MODULE__{mode: %TransitDetail{trip_id: trip_id}}), do: {:ok, trip_id}
  def trip_id(%__MODULE__{}), do: :error

  @spec route_trip_ids(t) :: {:ok, {Routes.Route.id_t(), Schedules.Trip.id_t()}} | :error
  def route_trip_ids(%__MODULE__{mode: %TransitDetail{} = mode}) do
    {:ok, {mode.route_id, mode.trip_id}}
  end

  def route_trip_ids(%__MODULE__{}) do
    :error
  end

  @doc "Determines if this leg uses public transit"
  @spec transit?(t) :: boolean
  def transit?(%__MODULE__{mode: %PersonalDetail{}}), do: false
  def transit?(%__MODULE__{mode: %TransitDetail{}}), do: true

  @spec walking_distance(t) :: float
  def walking_distance(%__MODULE__{mode: %PersonalDetail{distance: nil}}), do: 0.0
  def walking_distance(%__MODULE__{mode: %PersonalDetail{distance: distance}}), do: distance
  def walking_distance(%__MODULE__{mode: %TransitDetail{}}), do: 0.0

  @doc "Returns the stop IDs for the leg"
  @spec stop_ids(t) :: [Stops.Stop.id_t()]
  def stop_ids(%__MODULE__{from: from, to: to}) do
    for %NamedPosition{stop_id: stop_id} <- [from, to],
        stop_id do
      stop_id
    end
  end

  @spec stop_is_silver_line_airport?([t], atom) :: boolean()
  def stop_is_silver_line_airport?([], _), do: false

  def stop_is_silver_line_airport?([leg], key) when not is_nil(leg) do
    route_id = leg.mode.route_id

    stop_id =
      leg
      |> Kernel.get_in([Access.key(key), Access.key(:stop_id)])

    Fares.silver_line_airport_stop?(route_id, stop_id)
  end

  def stop_is_silver_line_airport?(_, _), do: false

  # Fare calculation is not possible if the route is a commuter rail route and
  # either from/to stop is missing zone information.
  @spec is_fare_complete_transit_leg?(t) :: boolean
  def is_fare_complete_transit_leg?(leg), do: transit?(leg) and not leg_missing_zone?(leg)

  # Cannot compute fare for commuter rail route
  # between stops where we don't know the zones
  @spec leg_missing_zone?(t) :: boolean
  defp leg_missing_zone?(%__MODULE__{
         mode: %TransitDetail{route_id: route_id},
         from: %NamedPosition{stop_id: origin_id},
         to: %NamedPosition{stop_id: destination_id}
       }) do
    route = Routes.Repo.get(route_id)

    if route do
      Routes.Route.type_atom(route) == :commuter_rail and
        not Enum.all?([origin_id, destination_id], &Stops.Stop.has_zone?(&1))
    else
      true
    end
  end

  defp leg_missing_zone?(_), do: false
end
