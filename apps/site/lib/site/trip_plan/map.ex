defmodule Site.TripPlan.Map do
  alias GoogleMaps
  alias Leaflet.{MapData}

  @type static_map :: String.t()
  @type t :: {MapData.t(), static_map}

  @moduledoc """
  Handles generating the maps displayed within the TripPlan Controller
  """

  @doc """
  Returns the url for the initial map for the Trip Planner
  """
  @spec initial_map_src() :: static_map
  def initial_map_src do
    {630, 400}
    |> MapData.new(14)
    |> MapData.to_google_map_data()
    |> GoogleMaps.static_map_url()
  end

  def initial_map_data do
    {630, 400}
    |> MapData.new(14)
  end
end
