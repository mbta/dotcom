defmodule Fares.RetailLocations.Location do
  defstruct [:name, :address, :latitude, :longitude, :phone, :payment]

  @type t :: %__MODULE__{
          name: String.t(),
          address: String.t(),
          latitude: float,
          longitude: float,
          phone: String.t(),
          payment: [String.t()]
        }

  defimpl Dotcom.Utils.Position do
    def latitude(%@for{latitude: latitude}), do: latitude
    def longitude(%@for{longitude: longitude}), do: longitude
  end
end
