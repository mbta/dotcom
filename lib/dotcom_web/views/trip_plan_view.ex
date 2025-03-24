# credo:disable-for-this-file
defmodule DotcomWeb.TripPlanView do
  @moduledoc "Contains the logic for the Trip Planner"
  use DotcomWeb, :view
  require Routes.Route
  alias Fares.Fare
  alias Routes.Route
  alias Dotcom.TripPlan.{Itinerary, Leg, Transfer}

  @type fare_calculation :: %{
          mode: Route.gtfs_route_type(),
          # e.g. :commuter_rail
          mode_name: String.t(),
          # e.g. "Commuter Rail"
          name: String.t(),
          # e.g. "Zone 8"
          fares: %Fares.Fare{}
        }

  @doc """
  Gets the total fare for a given itinerary, based on the fare type.

  We have to check if there is a bus to subway transfer and manually add the transfer cost of $0.70.
  """
  @spec get_one_way_total_by_type(Itinerary.t(), Fares.fare_type()) :: non_neg_integer
  def get_one_way_total_by_type(itinerary, fare_type) do
    transit_legs =
      itinerary.legs
      |> Stream.filter(&Leg.transit?/1)
      |> Stream.filter(fn leg -> Fares.get_fare_by_type(leg, fare_type) != nil end)

    if Enum.empty?(transit_legs) do
      nil
    else
      transit_legs
      |> Stream.with_index()
      |> Enum.reduce(0, fn {leg, leg_index}, acc ->
        if leg_index < 1 do
          acc + (leg |> Fares.get_fare_by_type(fare_type) |> fare_cents())
        else
          # Look at this transit leg and previous transit leg(s)
          two_legs = transit_legs |> Enum.slice(leg_index - 1, 2)
          three_legs = transit_legs |> Enum.slice(leg_index - 2, 3)
          # If this is part of a free transfer, don't add fare
          cond do
            Transfer.bus_to_subway_transfer?(three_legs) ->
              if acc == Fares.get_fare_by_type(List.first(three_legs), fare_type) |> fare_cents(),
                do: acc + 70,
                else: acc

            Transfer.maybe_transfer?(three_legs) ->
              acc

            Transfer.bus_to_subway_transfer?(two_legs) ->
              acc + 70

            Transfer.maybe_transfer?(two_legs) ->
              acc

            true ->
              acc + (leg |> Fares.get_fare_by_type(fare_type) |> fare_cents())
          end
        end
      end)
    end
  end

  @spec fare_cents(Fare.t() | nil) :: non_neg_integer()
  defp fare_cents(nil), do: 0
  defp fare_cents(%Fare{cents: cents}), do: cents
end
