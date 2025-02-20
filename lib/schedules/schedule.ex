defmodule Schedules.Schedule do
  @moduledoc """
  Representation of GTFS schedules.
  """

  @derive Jason.Encoder

  defstruct route: nil,
            trip: nil,
            stop: nil,
            arrival_time: nil,
            departure_time: nil,
            time: nil,
            flag?: false,
            early_departure?: false,
            last_stop?: false,
            stop_sequence: 0,
            stop_headsign: nil,
            pickup_type: 0,
            platform_stop_id: nil

  @typedoc "If the scheduled stop has a parent stop (station), then the `stop` field will contain that parent stop. Otherwise it will contain the scheduled platform stop. Whether or not the stop has a parent, the unmodified stop id can be found in platform_stop_id field."
  @type stop :: Stops.Stop.t()

  @type t :: %Schedules.Schedule{
          route: Routes.Route.t(),
          trip: Schedules.Trip.t(),
          stop: stop,
          arrival_time: DateTime.t() | nil,
          departure_time: DateTime.t() | nil,
          time: DateTime.t(),
          flag?: boolean,
          early_departure?: boolean,
          last_stop?: boolean,
          stop_sequence: non_neg_integer,
          stop_headsign: String.t(),
          pickup_type: integer,
          platform_stop_id: Stops.Stop.id_t()
        }

  def flag?(%Schedules.Schedule{flag?: value}), do: value

  def no_times?(%Schedules.Schedule{arrival_time: at, departure_time: dt}),
    do: is_nil(at) and is_nil(dt)
end

defmodule Schedules.ScheduleCondensed do
  @moduledoc """
  Light weight alternate to Schedule.t()
  """
  defstruct stop_id: nil,
            time: nil,
            trip_id: nil,
            route_pattern_id: nil,
            train_number: nil,
            stop_sequence: 0,
            headsign: nil

  @type t :: %Schedules.ScheduleCondensed{
          stop_id: String.t(),
          time: DateTime.t(),
          trip_id: String.t(),
          route_pattern_id: String.t() | nil,
          train_number: String.t() | nil,
          stop_sequence: non_neg_integer,
          headsign: String.t()
        }
end

defmodule Schedules.Trip do
  @moduledoc """
  Representation of GTFS trips.
  """

  alias RoutePatterns.RoutePattern
  alias Routes.Shape

  @derive Jason.Encoder

  defstruct [
    :id,
    :name,
    :headsign,
    :direction_id,
    :shape_id,
    :route_pattern_id,
    :occupancy,
    bikes_allowed?: false
  ]

  @type id_t :: String.t()
  @type headsign :: String.t()
  @type crowding :: Vehicles.Vehicle.crowding()
  @type t :: %Schedules.Trip{
          id: id_t,
          name: String.t(),
          headsign: headsign,
          direction_id: 0 | 1,
          shape_id: Shape.id_t() | nil,
          route_pattern_id: RoutePattern.id_t() | nil,
          bikes_allowed?: boolean,
          occupancy: crowding() | nil
        }
end
