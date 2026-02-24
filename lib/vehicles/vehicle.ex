defmodule Vehicles.Vehicle do
  @moduledoc false
  defstruct [
    :id,
    :route_id,
    :trip_id,
    :stop_id,
    :direction_id,
    :longitude,
    :latitude,
    :status,
    :stop_sequence,
    :bearing,
    :crowding
  ]

  @type status :: :in_transit | :stopped | :incoming
  @type crowding :: :not_crowded | :some_crowding | :crowded

  @type id_t :: String.t()

  @type t :: %__MODULE__{
          id: id_t(),
          route_id: String.t() | nil,
          trip_id: String.t() | nil,
          stop_id: String.t() | nil,
          direction_id: 0 | 1,
          longitude: float,
          latitude: float,
          bearing: non_neg_integer,
          status: status,
          stop_sequence: non_neg_integer,
          crowding: crowding | nil
        }
end
