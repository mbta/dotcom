defmodule Predictions.Store.Behaviour do
  @moduledoc """
  Defines the behaviour for the Predictions Store.
  """

  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop
  alias Vehicles.Vehicle

  @type fetch_keys :: [
          prediction_id: Prediction.id_t(),
          route: Route.id_t(),
          stop: Stop.id_t(),
          direction: 0 | 1,
          trip: Trip.id_t(),
          vehicle_id: Vehicle.id_t()
        ]

  @callback clear(fetch_keys()) :: :ok
  @callback fetch(fetch_keys()) :: [Prediction.t()]
  @callback update({atom, [Prediction.t()]}) :: :ok
end
