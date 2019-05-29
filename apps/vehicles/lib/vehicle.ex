defmodule Vehicles.Vehicle do
  defstruct [
    :id,
    :route_id,
    :trip_id,
    :shape_id,
    :stop_id,
    :direction_id,
    :longitude,
    :latitude,
    :status,
    bearing: 0
  ]

  @type status :: :in_transit | :stopped | :incoming

  @type t :: %__MODULE__{
          id: String.t(),
          route_id: String.t() | nil,
          trip_id: String.t() | nil,
          shape_id: String.t() | nil,
          stop_id: String.t() | nil,
          direction_id: 0 | 1,
          longitude: float,
          latitude: float,
          bearing: non_neg_integer,
          status: status
        }
end
