defmodule Dotcom.TripPlan.NamedPosition do
  @moduledoc "Defines a position for a trip plan as a stop and/or lat/lon"

  @derive Jason.Encoder
  defstruct name: "",
            stop: nil,
            latitude: nil,
            longitude: nil

  @type t :: %__MODULE__{
          name: String.t(),
          stop: Stops.Stop.t() | nil,
          latitude: float | nil,
          longitude: float | nil
        }

  defimpl Util.Position do
    def latitude(%{latitude: latitude}), do: latitude
    def longitude(%{longitude: longitude}), do: longitude
  end

  def to_keywords(%__MODULE__{name: name, stop: stop, latitude: lat, longitude: lon}) do
    if stop do
      [name: name, stop_id: stop.id, lat_lon: {lat, lon}]
    else
      [name: name, lat_lon: {lat, lon}]
    end
  end

  def new(%LocationService.Address{} = address) do
    %__MODULE__{
      latitude: address.latitude,
      longitude: address.longitude,
      name: address.formatted
    }
  end
end
