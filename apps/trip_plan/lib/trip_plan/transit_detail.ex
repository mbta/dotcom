defmodule TripPlan.TransitDetail do
  @moduledoc """
  Additional information for legs taken on public transportation
  """
  defstruct route_id: "",
            trip_id: "",
            intermediate_stop_ids: []

  @type t :: %__MODULE__{
          route_id: Routes.Route.id_t(),
          trip_id: Schedules.Trip.id_t(),
          intermediate_stop_ids: [Stops.Stop.id_t()]
        }
end
