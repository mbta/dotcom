defmodule Dotcom.UpcomingDepartures.UpcomingDeparture do
  @moduledoc """
  A struct representing an upcoming departure.
  """

  alias Routes.Route
  alias Schedules.Trip
  alias Vehicles.Vehicle

  defstruct [
    :arrival_status,
    :arrival_substatus,
    :crowding,
    :headsign,
    :last_trip?,
    :platform_name,
    :route,
    :stop_sequence,
    :time,
    :trip_id,
    :trip_name,
    :vehicle_name
  ]

  @type realtime_arrival_status_t ::
          :arriving
          | :boarding
          | :now
          | {:arrival_minutes, integer()}
          | {:departure_minutes, integer()}

  @type arrival_status_t ::
          realtime_arrival_status_t()
          | :hidden
          | {:cancelled, DateTime.t()}
          | {:scheduled, DateTime.t()}
          | {:status, String.t()}
          | {:time, DateTime.t()}

  @type arrival_substatus_t ::
          nil
          | :on_time
          | :scheduled
          | :scheduled_sr_only
          | {:scheduled_at, DateTime.t()}
          | {:status, String.t()}

  @type t :: %__MODULE__{
          arrival_status: arrival_status_t(),
          arrival_substatus: arrival_substatus_t(),
          crowding: Vehicle.crowding(),
          headsign: Trip.headsign(),
          last_trip?: boolean(),
          platform_name: String.t() | nil,
          route: Route.t(),
          stop_sequence: non_neg_integer(),
          time: DateTime.t(),
          trip_id: Trip.id_t(),
          trip_name: String.t(),
          vehicle_name: String.t() | nil
        }
end
