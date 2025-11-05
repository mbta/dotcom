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

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

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
  A URL to show the stop's location in Google Maps. If on iOS, will open in the Google Maps app.
  """
  @spec google_maps_url(Stop.t() | Stop.ParkingLot.t(), boolean()) :: String.t()
  def google_maps_url(stop, is_ios?) do
    host =
      if(is_ios?,
        do: "maps://www.google.com/maps/search/?",
        else: "https://www.google.com/maps/search/?"
      )

    query =
      map_query_params(stop)
      |> Map.put_new_lazy("q", fn -> URI.encode(stop.name) end)
      |> Map.put("api", "1")
      |> URI.encode_query()

    host <> query
  end

  # google searches lat long via the `query` param
  # apple searches lat long via the `q` param
  defp map_query_params(%{place_id: nil, name: nil} = stop) do
    %{"query" => lat_lon(stop), "q" => lat_lon(stop)}
  end

  # Apple uses a combination of `q` and `sll` to pin locations
  # Google uses a combination of the `query` and `query_place_id` to pin locations
  defp map_query_params(%{place_id: place_id} = stop) when not is_nil(place_id) do
    %{"query" => lat_lon(stop), "sll" => lat_lon(stop), "query_place_id" => place_id}
  end

  defp map_query_params(stop) do
    %{"query" => lat_lon(stop), "sll" => lat_lon(stop)}
  end

  defp lat_lon(%{latitude: lat, longitude: lon}) do
    "#{lat},#{lon}"
  end

  @doc """
  Bus stops in GTFS generally have no address, so display other fields.
  """
  @spec stop_address(Stop.t()) :: String.t() | nil
  def stop_address(%Stop{address: address}) when is_binary(address), do: address

  def stop_address(%Stop{municipality: municipality, name: name})
      when not is_nil(municipality) and not is_nil(name) do
    "#{name}, #{municipality}"
  end

  def stop_address(%Stop{municipality: municipality, name: nil}), do: municipality

  def stop_address(%Stop{municipality: nil, name: name}), do: name

  @doc """
  Checks if the alerts affect the given facility now.
  """
  def facility_in_alerts?(facility_id, alerts) do
    alerts
    |> Enum.filter(&Alerts.Match.any_time_match?(&1, @date_time_module.now()))
    |> Enum.any?(&(facility_id in &1.informed_entity.facility))
  end
end
