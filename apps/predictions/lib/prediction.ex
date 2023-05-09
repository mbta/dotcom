defmodule Predictions.Prediction do
  @moduledoc """
  A prediction of when a vehicle will arrive at a stop.
  """

  @derive Jason.Encoder

  defstruct id: nil,
            trip: nil,
            stop: nil,
            raw_stop_id: nil,
            route: nil,
            vehicle_id: nil,
            direction_id: nil,
            arrival_time: nil,
            departure_time: nil,
            time: nil,
            stop_sequence: 0,
            schedule_relationship: nil,
            track: nil,
            status: nil,
            departing?: false

  @type id_t :: String.t()
  @type schedule_relationship :: nil | :added | :unscheduled | :cancelled | :skipped | :no_data

  @typedoc "If the predicted stop has a parent stop (station), then that *may* be the stop set on the `stop` field. In some cases, it may contain a platform stop when the stop has a parent. The unmodified stop_id for the prediction can be found in the raw_stop_id field."
  @type stop :: Stops.Stop.t() | nil

  @type t :: %__MODULE__{
          id: id_t,
          trip: Schedules.Trip.t() | nil,
          stop: stop,
          raw_stop_id: Stops.Stop.id_t() | nil,
          route: Routes.Route.t(),
          vehicle_id: Vehicles.Vehicle.id_t() | nil,
          direction_id: 0 | 1,
          arrival_time: DateTime.t() | nil,
          departure_time: DateTime.t() | nil,
          # TODO: Deprecated, should be removed in favor of arrival_time and departure_time -- MSS 2022-09-22
          time: DateTime.t() | nil,
          stop_sequence: non_neg_integer,
          schedule_relationship: schedule_relationship,
          track: String.t() | nil,
          status: String.t() | nil,
          departing?: boolean
        }
end
