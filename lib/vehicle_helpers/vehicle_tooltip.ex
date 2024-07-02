defmodule VehicleTooltip do
  @moduledoc """
  Represents a vehicle with its associated status information, used to render tooltips on schedule and
  line representations
  """

  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Trip
  alias Vehicles.Vehicle

  defstruct vehicle: %Vehicle{},
            prediction: %Prediction{},
            trip: %Trip{},
            route: %Route{},
            stop_name: ""

  @type t :: %VehicleTooltip{
          vehicle: Vehicle.t(),
          prediction: Prediction.t() | nil,
          trip: Trip.t() | nil,
          route: Route.t() | nil,
          stop_name: String.t()
        }
end
