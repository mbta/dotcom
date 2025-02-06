defmodule Fares.ProposedLocations.Location do
  @moduledoc """
  Proposed Sales Location structure that matches the data coming from ArcGIS
  """
  defstruct [
    :fid,
    :stop_id,
    :name,
    :municipality,
    :line,
    :retail_fvm,
    :routes,
    :latitude,
    :longitude
  ]

  @type t :: %__MODULE__{
          fid: non_neg_integer,
          stop_id: String.t(),
          name: String.t(),
          municipality: String.t(),
          line: String.t(),
          retail_fvm: String.t(),
          routes: [String.t()] | [],
          latitude: float,
          longitude: float
        }

  defimpl Dotcom.Utils.Position do
    def latitude(%{latitude: latitude}), do: latitude
    def longitude(%{longitude: longitude}), do: longitude
  end
end
