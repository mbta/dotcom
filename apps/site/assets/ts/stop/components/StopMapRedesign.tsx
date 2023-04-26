import { uniqBy } from "lodash";
import React, { ReactElement } from "react";
import Map from "../../leaflet/components/Map";
import { Stop } from "../../__v3api";
import {
  MapData,
  MapMarker,
  Polyline
} from "../../leaflet/components/__mapdata";
import useMapConfig from "../../hooks/useMapConfig";

interface Props {
  stop: Stop;
  lines: Polyline[];
}

const StopMapRedesign = ({ stop, lines }: Props): ReactElement<HTMLElement> => {
  const mapConfig = useMapConfig();

  const mapData = {
    default_center: {
      longitude: stop.longitude,
      latitude: stop.latitude
    },
    markers: [
      {
        icon: "map-station-marker",
        id: stop.id,
        longitude: stop.longitude,
        latitude: stop.latitude,
        rotation_angle: 0,
        tooltip: null
      } as MapMarker
    ],
    polylines: uniqBy(lines, "id"),
    tile_server_url: mapConfig?.tile_server_url,
    zoom: 16
  } as MapData;

  return (
    <div
      id={stop.id}
      role="application"
      aria-label="Map with stop"
      className="hidden-sm-down map"
    >
      <Map mapData={mapData} />
    </div>
  );
};

export default StopMapRedesign;
