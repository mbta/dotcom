defmodule GoogleMaps.MapData.Layers do
  @moduledoc """
  Used to enable or disable different layers on a map. Currently only supports TransitLayer.
  See https://developers.google.com/maps/documentation/javascript/examples/layer-transit for
  more details.
  """
  defstruct transit: false

  @type t :: %__MODULE__{
          transit: boolean
        }
end
