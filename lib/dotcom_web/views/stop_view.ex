defmodule DotcomWeb.StopView do
  @moduledoc """
  View helpers for the Stop controller
  """

  use DotcomWeb, :view

  import Dotcom.StopAmenity, only: [alerts_for_amenity: 2]
  import DotcomWeb.Components.Stops

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Phoenix.HTML.Safe
  alias Routes.Route
  alias Stops.Stop
  alias Util.Position

  @doc """
  Returns correct svg Icon for the given feature
  """
  @spec stop_feature_icon(Stops.Repo.Behaviour.stop_feature(), :small | :default) :: Safe.t()
  def stop_feature_icon(feature, size \\ :default)

  def stop_feature_icon(feature, size) when is_atom(size) do
    svg_icon_with_circle(%SvgIconWithCircle{icon: stop_feature_icon_atom(feature), size: size})
  end

  defp stop_feature_icon_atom(branch)
       when branch in [:"Green-B", :"Green-C", :"Green-D", :"Green-E"] do
    Route.icon_atom(%Route{id: Atom.to_string(branch), type: 0})
  end

  defp stop_feature_icon_atom(feature) do
    feature
  end

  @doc "returns small icons for features in given DetailedStop"
  @spec feature_icons(DetailedStop.t()) :: Safe.t()
  def feature_icons(%DetailedStop{features: features}) do
    for feature <- features do
      stop_feature_icon(feature, :small)
    end
  end

  @spec station_or_stop(Stop.t()) :: String.t()
  def station_or_stop(stop) do
    if(stop.station?, do: ~t"station", else: ~t"stop")
  end

  @doc """
  A URL to show a place's location in Google Maps. If on iOS, will open in the Google Maps app.
  """
  @spec google_maps_url(Stop.t() | Stop.ParkingLot.t(), boolean()) :: String.t()
  def google_maps_url(place, is_ios?) do
    host =
      if(is_ios?,
        do: "maps://www.google.com/maps/search/?",
        else: "https://www.google.com/maps/search/?"
      )

    query =
      map_query_params(place)
      |> Map.put_new_lazy("q", fn -> URI.encode(place.name) end)
      |> Map.put("api", "1")
      |> URI.encode_query()

    host <> query
  end

  # google searches lat long via the `query` param
  # apple searches lat long via the `q` param
  defp map_query_params(%{place_id: nil, name: nil} = place) do
    %{"query" => lat_lon(place), "q" => lat_lon(place)}
  end

  # Apple uses a combination of `q` and `sll` to pin locations
  # Google uses a combination of the `query` and `query_place_id` to pin locations
  defp map_query_params(%{place_id: place_id} = place) when not is_nil(place_id) do
    %{"query" => lat_lon(place), "sll" => lat_lon(place), "query_place_id" => place_id}
  end

  defp map_query_params(place) do
    %{"query" => lat_lon(place), "sll" => lat_lon(place)}
  end

  defp lat_lon(place) do
    "#{place.latitude},#{place.longitude}"
  end

  def address(%Stop{address: address}) when is_binary(address), do: address

  def address(%Stop{municipality: municipality, name: name})
      when not is_nil(municipality) and not is_nil(name) do
    "#{name}, #{municipality}"
  end

  def address(%Stop{municipality: municipality, name: nil}), do: municipality
  def address(%Stop{municipality: nil, name: name}), do: name
end
