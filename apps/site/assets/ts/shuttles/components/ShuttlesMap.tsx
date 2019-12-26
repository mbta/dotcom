import React, { ReactElement } from "react";
import { latLng, latLngBounds } from "leaflet";
import { Stop, Shape } from "./__shuttles";
import Map from "../../leaflet/components/Map";
import {
  MapData,
  MapMarker,
  Polyline,
  IconOpts,
  TileServerUrl
} from "../../leaflet/components/__mapdata";

interface Props {
  shapes: Shape[];
  stops: Stop[];
  selectedStop?: Stop;
  tileServerUrl: TileServerUrl;
}

/* eslint-disable @typescript-eslint/camelcase */
const makeMarkers = (stops: Stop[]): MapMarker[] => {
  const iconMap = {
    shuttle: "mode-bus-default",
    rail_affected: "circle-t-small-grey",
    rail_unaffected: "circle-t-small"
  };
  const icon_opts: IconOpts = {
    icon_size: [16, 16],
    icon_anchor: [8, 8],
    popup_anchor: [0, -8]
  };
  const rotation_angle = 0;

  return stops.map((stop: Stop, index) => {
    const icon = iconMap[stop.type] || "circle-t-small";
    const id = `${stop.name}-${index}`;
    const { longitude, latitude } = stop;
    const tooltip = (
      <span>
        {stop.name}
        {stop.type === "shuttle" && ` Shuttle Pickup (${stop.headsign})`}
      </span>
    );

    return {
      icon,
      icon_opts,
      id,
      latitude,
      longitude,
      rotation_angle,
      tooltip,
      shape_id: stop.id
    };
  });
};
/* eslint-enable @typescript-eslint/camelcase */

const makePolylines = (shapes: Shape[]): Polyline[] =>
  shapes.map((shape: Shape, index) => ({
    color: !shape.is_shuttle_route && shape.color ? `#${shape.color}` : "black",
    "dotted?": shape.is_shuttle_route,
    id: `${shape.id}-${index}`,
    positions: shape.polyline,
    weight: shape.is_shuttle_route ? 4 : 6
  }));

const boundsFromStops = (stops: Stop[], selectedStop: Stop | undefined) => {
  let includedStops;
  const padding = 0.2;

  if (selectedStop) {
    // If a stop is selected, include that stop and the nearest shuttle stop.
    const { latitude, longitude } = selectedStop,
      selectedStopLocation = latLng(latitude, longitude),
      shuttleStopsByDistance = stops
        .filter(stop => stop.type === "shuttle")
        .sort(
          (a, b) =>
            selectedStopLocation.distanceTo([a.latitude, a.longitude]) -
            selectedStopLocation.distanceTo([b.latitude, b.longitude])
        );

    includedStops = [selectedStop, shuttleStopsByDistance[0]];
  } else {
    // If no stop is selected, include all stops affected by the diversion.
    includedStops = stops.filter(stop => stop.type === "rail_affected");
  }

  return latLngBounds(
    includedStops.map(({ latitude, longitude }) => latLng(latitude, longitude))
  ).pad(padding);
};

const ShuttlesMap = ({
  shapes,
  stops,
  selectedStop,
  tileServerUrl
}: Props): ReactElement<HTMLElement> | null => {
  if (typeof window !== "undefined") {
    const bounds = boundsFromStops(stops, selectedStop);

    // the MapData interface requires a center value
    const { lng: longitude, lat: latitude } = bounds.getCenter(),
      defaultCenter = { longitude, latitude };

    /* eslint-disable @typescript-eslint/camelcase */
    const mapData: MapData = {
      height: 400,
      width: 400,
      default_center: defaultCenter,
      markers: makeMarkers(stops),
      polylines: makePolylines(shapes),
      tile_server_url: tileServerUrl,
      zoom: null
    };
    /* eslint-enable @typescript-eslint/camelcase */

    return (
      <div className="m-shuttles-map">
        <Map mapData={mapData} bounds={bounds} boundsByMarkers={false} />
      </div>
    );
  }
  return null;
};

export default ShuttlesMap;
