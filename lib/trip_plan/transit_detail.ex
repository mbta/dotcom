defmodule TripPlan.TransitDetail do
  @moduledoc """
  Additional information for legs taken on public transportation
  """

  alias Fares.Fare

  @derive {Jason.Encoder, except: [:fares]}
  defstruct [:fares, route_id: "", trip_id: "", intermediate_stop_ids: []]

  @type t :: %__MODULE__{
          route_id: Routes.Route.id_t(),
          trip_id: Schedules.Trip.id_t(),
          intermediate_stop_ids: [Stops.Stop.id_t()],
          fares: fares
        }

  @type fares :: %{
          highest_one_way_fare: Fare.t() | nil,
          lowest_one_way_fare: Fare.t() | nil,
          reduced_one_way_fare: Fare.t() | nil
        }
end
