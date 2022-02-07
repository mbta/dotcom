defmodule GoogleMaps.Geocode.Input do
  @type t :: %__MODULE__{
          address: String.t() | nil,
          latitude: float | nil,
          longitude: float | nil
        }
  defstruct [:address, :latitude, :longitude]
end
