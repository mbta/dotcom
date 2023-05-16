import React, { ReactElement } from "react";
import Map from "../../leaflet/components/Map";
import { Stop } from "../../__v3api";
import {
  MapData,
  MapMarker,
  Polyline
} from "../../leaflet/components/__mapdata";
import useMapConfig from "../../hooks/useMapConfig";
import useVehiclesChannel, { Vehicle } from "../../hooks/useVehiclesChannel";
import CrowdingPill from "../../schedule/components/line-diagram/CrowdingPill";
import { iconOpts } from "../../schedule/components/Map";

interface Props {
  stop: Stop;
  lines: Polyline[];
}

const mapMarkerFromVehicle = (vehicle: Vehicle): MapMarker => {
  const iconName = "vehicle-bordered-expanded";
  return {
    id: vehicle.id,
    icon: iconName,
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    rotation_angle: vehicle.bearing,
    icon_opts: iconOpts(iconName),
    tooltip: (
      <>
        <CrowdingPill crowding={vehicle.crowding} />
      </>
    )
  };
};

const mapMarkerFromStop = (stop: Stop): MapMarker => {
  return {
    icon: "map-station-marker",
    id: stop.id,
    longitude: stop.longitude,
    latitude: stop.latitude,
    rotation_angle: 0,
    tooltip: null
  } as MapMarker;
};

const StopMapRedesign = ({ stop, lines }: Props): ReactElement<HTMLElement> => {
  const mapConfig = useMapConfig();

  const mapData = {
    default_center: {
      longitude: stop.longitude,
      latitude: stop.latitude
    },
    markers: [mapMarkerFromStop(stop)],
    polylines: lines,
    tile_server_url: mapConfig?.tile_server_url,
    zoom: 16
  } as MapData;

  return (
    <div
      id={stop.id}
      role="application"
      aria-label="Map with stop"
      className="map"
    >
      <Map mapData={mapData} />
    </div>
  );
};

export const StopMapForRoute = ({
  stop,
  line
}: {
  stop: Stop;
  line: Polyline | null;
}): ReactElement<HTMLElement> => {
  const mapConfig = useMapConfig();

  // TODO: Don't hardcode the route & direction
  const vehicles = useVehiclesChannel("39", 1);
  const mapData = {
    // TODO: Default center on the selected vehicle
    default_center: { longitude: stop.longitude, latitude: stop.latitude },
    markers: [...vehicles.map(mapMarkerFromVehicle), mapMarkerFromStop(stop)],
    polylines: line ? [line] : [],
    tile_server_url: mapConfig?.tile_server_url,
    zoom: 16
  } as MapData;

  return (
    <div
      role="application"
      aria-label="Map with stop"
      className="stop_map--route-selected"
    >
      <Map mapData={mapData} />
    </div>
  );
};

export default StopMapRedesign;
