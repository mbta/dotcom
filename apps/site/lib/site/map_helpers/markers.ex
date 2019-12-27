defmodule Site.MapHelpers.Markers do
  alias GoogleMaps.MapData.{Marker, Symbol}
  alias Vehicles.Vehicle
  alias Routes.Route
  alias Stops.Stop

  @z_index %{
    vehicle: 1_000
  }

  @doc """
  Builds marker data for a vehicle that will be displayed in a Google Map.
  """
  @spec vehicle(VehicleTooltip.t()) :: Marker.t()
  def vehicle(%VehicleTooltip{vehicle: %Vehicle{}} = data) do
    Marker.new(
      data.vehicle.latitude,
      data.vehicle.longitude,
      id: vehicle_marker_id(data.vehicle.id),
      icon: vehicle_icon(data.vehicle, data.route),
      tooltip: VehicleHelpers.tooltip(data),
      z_index: @z_index.vehicle
    )
  end

  def vehicle_marker_id(vehicle_id) when is_binary(vehicle_id) do
    "vehicle-" <> vehicle_id
  end

  @spec vehicle_icon(Vehicle.t(), Route.t()) :: Symbol.t()
  defp vehicle_icon(%Vehicle{} = vehicle, %Route{} = route) do
    Symbol.new(
      fill_color: "#" <> route.color,
      fill_opacity: 1,
      rotation: vehicle.bearing,
      path: :forward_closed_arrow,
      size: :tiny,
      stroke_weight: 1
    )
  end

  @doc """
  Builds marker data for a stop that will be displayed in a Google Map.
  """
  @spec stop(Stop.t(), boolean) :: Marker.t()
  def stop(%Stop{} = stop, is_terminus?) when is_boolean(is_terminus?) do
    Marker.new(
      stop.latitude,
      stop.longitude,
      id: "stop-" <> stop.id,
      icon: Site.MapHelpers.map_stop_icon_path(:tiny, is_terminus?),
      tooltip: stop.name,
      size: :tiny
    )
  end
end
