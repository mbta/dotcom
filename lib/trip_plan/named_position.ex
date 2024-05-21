defmodule TripPlan.NamedPosition do
  @moduledoc "Defines a position for a trip plan as a stop and/or lat/lon"

  @derive Jason.Encoder
  defstruct name: "",
            stop_id: nil,
            latitude: nil,
            longitude: nil

  @type t :: %__MODULE__{
          name: String.t(),
          stop_id: Stops.Stop.id_t() | nil,
          latitude: float | nil,
          longitude: float | nil
        }

  defimpl Util.Position do
    def latitude(%{latitude: latitude}), do: latitude
    def longitude(%{longitude: longitude}), do: longitude
  end

  def to_keywords(%__MODULE__{name: name, stop_id: stop_id, latitude: lat, longitude: lon}) do
    [name: name, stop_id: stop_id, lat_lon: {lat, lon}]
  end

  def new(%LocationService.Address{} = address) do
    %__MODULE__{
      latitude: address.latitude,
      longitude: address.longitude,
      name: address.formatted
    }
  end
end
