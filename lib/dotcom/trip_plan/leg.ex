defmodule Dotcom.TripPlan.Leg do
  @moduledoc """
  A single-mode part of an Itinerary

  An Itinerary can take multiple modes of transportation (walk, bus,
  train, &c). Leg represents a single mode of travel during journey.
  """

  alias Dotcom.TripPlan.{NamedPosition, PersonalDetail, TransitDetail}

  @derive {Jason.Encoder, only: [:from, :to, :mode]}
  defstruct start: Timex.now(),
            stop: Timex.now(),
            mode: nil,
            from: nil,
            to: nil,
            polyline: "",
            distance: 0.0,
            duration: 0,
            realtime: false,
            realtime_state: nil,
            stop_headsign: nil

  @type mode :: PersonalDetail.t() | TransitDetail.t()
  @type t :: %__MODULE__{
          start: DateTime.t(),
          stop: DateTime.t(),
          mode: mode,
          from: NamedPosition.t(),
          to: NamedPosition.t(),
          polyline: String.t(),
          distance: float(),
          duration: integer(),
          realtime: boolean(),
          realtime_state: String.t(),
          stop_headsign: String.t()
        }

  @doc "Determines if this leg uses public transit"
  @spec transit?(t) :: boolean
  def transit?(%__MODULE__{mode: %PersonalDetail{}}), do: false
  def transit?(%__MODULE__{mode: %TransitDetail{}}), do: true

  @doc "Returns the stop IDs for the leg"
  @spec stop_ids(t()) :: %{term() => [Stops.Stop.id_t()]}
  def stop_ids(%__MODULE__{from: from, to: to}) do
    %{
      from:
        for %NamedPosition{stop: stop} <- [from],
            stop do
          stop.id
        end,
      to:
        for %NamedPosition{stop: stop} <- [to],
            stop do
          stop.id
        end
    }
  end

  @spec stop_is_silver_line_airport?([t], atom) :: boolean()
  def stop_is_silver_line_airport?([], _), do: false

  def stop_is_silver_line_airport?([leg], key) when not is_nil(leg) do
    route_id = leg.mode.route.id

    stop_id =
      leg
      |> Kernel.get_in([Access.key(key), Access.key(:stop), Access.key(:id)])

    Fares.silver_line_airport_stop?(route_id, stop_id)
  end

  def stop_is_silver_line_airport?(_, _), do: false

  # Fare calculation is not possible if the route is a commuter rail route and
  # either from/to stop is missing zone information.
  @spec fare_complete_transit_leg?(t) :: boolean
  def fare_complete_transit_leg?(leg), do: transit?(leg) and not leg_missing_zone?(leg)

  # Cannot compute fare for commuter rail route
  # between stops where we don't know the zones
  @spec leg_missing_zone?(t) :: boolean
  defp leg_missing_zone?(%__MODULE__{
         mode: %TransitDetail{route: route},
         from: %NamedPosition{stop: origin},
         to: %NamedPosition{stop: destination}
       }) do
    Routes.Route.type_atom(route) == :commuter_rail and
      not Enum.all?([origin, destination], &Stops.Stop.has_zone?(&1))
  end

  defp leg_missing_zone?(_), do: false
end
