defmodule Dotcom.TripPlan.TransitDetail do
  @moduledoc """
  Additional information for legs taken on public transportation
  """

  alias Fares.Fare
  alias OpenTripPlannerClient.Schema.Leg

  @derive {Jason.Encoder, except: [:fares]}
  defstruct fares: %{
              highest_one_way_fare: nil,
              lowest_one_way_fare: nil,
              reduced_one_way_fare: nil
            },
            mode: :TRANSIT,
            route: nil,
            trip: nil,
            intermediate_stops: []

  @type t :: %__MODULE__{
          fares: fares,
          mode: Leg.mode(),
          route: Routes.Route.t(),
          trip: Schedules.Trip.t(),
          intermediate_stops: [Stops.Stop.t()]
        }

  @type fares :: %{
          highest_one_way_fare: Fare.t() | nil,
          lowest_one_way_fare: Fare.t() | nil,
          reduced_one_way_fare: Fare.t() | nil
        }
end
