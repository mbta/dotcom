# credo:disable-for-this-file
defmodule DotcomWeb.TripPlanView do
  @moduledoc "Contains the logic for the Trip Planner"
  use DotcomWeb, :view
  require Routes.Route
  alias Fares.Fare
  alias Routes.Route
  alias Dotcom.TripPlan.{Itinerary, Leg, Transfer}

  import Schedules.Repo, only: [end_of_rating: 0]

  @type fare_calculation :: %{
          mode: Route.gtfs_route_type(),
          # e.g. :commuter_rail
          mode_name: String.t(),
          # e.g. "Commuter Rail"
          name: String.t(),
          # e.g. "Zone 8"
          fares: %Fares.Fare{}
        }

  def too_future_error do
    end_date = end_of_rating()

    [
      "We can only provide trip data for the current schedule, valid between now and ",
      Timex.format!(end_date, "{M}/{D}/{YY}"),
      "."
    ]
  end

  def past_error do
    ["Date is in the past. " | too_future_error()]
  end

  @plan_errors %{
    outside_bounds: "We can only plan trips inside the MBTA transitshed.",
    no_transit_times: "We were unable to plan a trip at the time you selected.",
    same_address: "You must enter two different locations.",
    location_not_accessible: "We were unable to plan a trip between those locations.",
    path_not_found: "We were unable to plan a trip between those locations.",
    too_close: "We were unable to plan a trip between those locations.",
    unknown: "An unknown error occurred. Please try again, or try a different address.",
    past: &__MODULE__.past_error/0,
    too_future: &__MODULE__.too_future_error/0
  }

  @field_errors %{
    required: "This field is required.",
    no_results: "We're sorry, but we couldn't find that address.",
    invalid_date: "Date is not valid."
  }

  # used by tests
  def plan_errors do
    Map.keys(@plan_errors)
  end

  # used by tests
  def field_errors do
    Map.keys(@field_errors)
  end

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
