import React, { ReactElement } from "react";
import Map from "../../leaflet/components/Map";
import { Stop } from "../../__v3api";
import { MapData, MapMarker } from "../../leaflet/components/__mapdata";
import useMapConfig from "../../hooks/useMapConfig";

interface Props {
  stop: Stop;
}

const StopMapRedesign = ({ stop }: Props): ReactElement<HTMLElement> => {
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
    polylines: [],
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
