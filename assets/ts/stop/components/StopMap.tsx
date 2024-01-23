import React, { ReactElement } from "react";
import Map from "../../leaflet/components/Map";
import { Route, Stop } from "../../__v3api";
import {
  MapData,
  MapMarker,
  Polyline
} from "../../leaflet/components/__mapdata";
import useMapConfig from "../../hooks/useMapConfig";
import { Vehicle } from "../../hooks/useVehiclesChannel";
import {
  isABusRoute,
  isACommuterRailRoute,
  isAGreenLineRoute,
  isASilverLineRoute,
  isFerryRoute
} from "../../models/route";

interface Props {
  stop: Stop;
  lines: Polyline[];
  vehicles: Vehicle[];
  selectedRoute?: Route;
}

const routeToModeIconName = (route?: Route): string => {
  if (route) {
    if (isACommuterRailRoute(route)) return "mode-commuter-rail-small";
    if (isASilverLineRoute(route)) return "mode-bus-silver";
    if (isABusRoute(route)) return "mode-bus-small";
    if (isFerryRoute(route)) return "mode-ferry-small";
    if (isAGreenLineRoute(route)) return "mode-subway-green";
    switch (route.id) {
      case "Mattapan":
        return "mode-trolley-small";
      case "Blue":
        return "mode-subway-blue";
      case "Red":
        return "mode-subway-red";
      case "Orange":
        return "mode-subway-orange";
      default:
        return "mode-subway-small";
    }
  }

  return "vehicle-bordered-expanded";
};

const mapMarkerFromVehicle = (
  vehicle: Vehicle,
  iconName: string
): MapMarker => {
  return {
    id: vehicle.id,
    alt: `vehicle ${vehicle.id} marker`,
    icon: iconName,
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    rotation_angle: 0,
    icon_opts: {
      icon_size: [26, 26],
      icon_anchor: [13, 13]
    },
    tooltip: null
  };
};

const mapMarkerFromStop = (stop: Stop): MapMarker => {
  return {
    icon: "map-station-marker",
    id: stop.id,
    alt: `stop ${stop.name} marker`,
    longitude: stop.longitude,
    latitude: stop.latitude,
    rotation_angle: 0,
    tooltip: null
  } as MapMarker;
};

const polylineClassName = (polyline: Polyline): string =>
  `stop-map_line stop-map_line--${polyline.id}`;

const StopMap = ({
  stop,
  lines,
  vehicles,
  selectedRoute
}: Props): ReactElement<HTMLElement> => {
  const mapConfig = useMapConfig();
  if (!mapConfig) return <></>;
  const iconName = routeToModeIconName(selectedRoute);
  const mapData = {
    // TODO: Default center on the selected vehicle
    default_center: { longitude: stop.longitude, latitude: stop.latitude },
    markers: [
      ...vehicles.map(vehicle => mapMarkerFromVehicle(vehicle, iconName)),
      mapMarkerFromStop(stop)
    ],
    polylines: lines.map(line => ({
      ...line,
      className: polylineClassName(line)
    })),
    tile_server_url: mapConfig?.tile_server_url,
    zoom: 16
  } as MapData;

  return (
    <div
      id={stop.id}
      role="application"
      aria-label="Map with stop"
      className="stop-map"
    >
      <Map mapData={mapData} />
    </div>
  );
};

export default StopMap;
