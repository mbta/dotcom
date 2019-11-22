import React, { ReactElement } from "react";
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
  centerStop?: Stop;
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

const ShuttlesMap = ({
  shapes,
  stops,
  centerStop,
  tileServerUrl
}: Props): ReactElement<HTMLElement> | null => {
  if (typeof window !== "undefined") {
    /* eslint-disable-next-line global-require */
    const getBounds = require("../../leaflet/bounds").default;
    const defaultBounds = getBounds(
      makeMarkers(stops.filter(stop => stop.type === "rail_affected"))
    );

    const bounds = centerStop
      ? getBounds(makeMarkers([centerStop]))
      : defaultBounds;

    // the MapData interface requires a center value
    const { lng: longitude, lat: latitude } = defaultBounds.getCenter();
    const defaultCenter = centerStop
      ? {
          longitude: centerStop.longitude,
          latitude: centerStop.latitude
        }
      : { longitude, latitude };

    /* eslint-disable @typescript-eslint/camelcase */
    const mapData: MapData = {
      height: 400,
      width: 400,
      default_center: defaultCenter,
      markers: makeMarkers(stops),
      polylines: makePolylines(shapes),
      tile_server_url: tileServerUrl,
      zoom: centerStop ? 18 : 13
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
