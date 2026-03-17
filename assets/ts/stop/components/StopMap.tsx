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

const parkingMarkersFromStop = (stop: Stop): MapMarker[] => {
  return stop.parking_lots.map(({latitude, longitude, name, id}) => {
    return {
      icon: "parking-small",
      id: id,
      alt: `lot ${name} marker`,
      longitude: longitude,
      latitude: latitude,
      rotation_angle: 0,
      icon_opts: {
        icon_size: [16, 16],
        icon_anchor: [8, 8]
      },
      tooltip: null
    } as MapMarker;
  })
}

const polylineClassName = (polyline: Polyline): string =>
  `stop-map_line stop-map_line--${polyline.id}`;


const greatCircleDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371000; // Earth's mean radius in km
    
    // Convert degrees to radians
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

const filterLotsByDistance = (stop: Stop, lotMarkers: Array<MapMarker>, minDist: number = 1): Array<MapMarker> => {
  return lotMarkers.filter( ({longitude, latitude}) =>  greatCircleDistance(stop.latitude, stop.longitude, latitude, longitude)>minDist )
}

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
    default_center: { longitude: stop.longitude, latitude: stop.latitude },
    markers: [
      ...filterLotsByDistance(stop, parkingMarkersFromStop(stop)),
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
