import React, { ReactElement } from "react";
import Map from "../../leaflet/components/Map";
import { Stop } from "../../__v3api";
import {
  MapData,
  MapMarker,
  Polyline
} from "../../leaflet/components/__mapdata";
import useMapConfig from "../../hooks/useMapConfig";
import { Vehicle } from "../../hooks/useVehiclesChannel";
import CrowdingPill from "../../schedule/components/line-diagram/CrowdingPill";
import { iconOpts } from "../../schedule/components/Map";

interface Props {
  stop: Stop;
  lines: Polyline[];
  vehicles?: Vehicle[];
}

const mapMarkerFromVehicle = (vehicle: Vehicle): MapMarker => {
  const iconName = "vehicle-bordered-expanded";
  return {
    id: vehicle.id,
    alt: `vehicle ${vehicle.id} marker`,
    icon: iconName,
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    rotation_angle: vehicle.bearing,
    icon_opts: iconOpts(iconName),
    tooltip: <CrowdingPill crowding={vehicle.crowding} />
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

const StopMapRedesign = ({
  stop,
  lines,
  vehicles
}: Props): ReactElement<HTMLElement> => {
  const mapConfig = useMapConfig();

  const mapData = {
    // TODO: Default center on the selected vehicle
    default_center: { longitude: stop.longitude, latitude: stop.latitude },
    markers: [
      ...(vehicles || []).map(mapMarkerFromVehicle),
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

export default StopMapRedesign;
