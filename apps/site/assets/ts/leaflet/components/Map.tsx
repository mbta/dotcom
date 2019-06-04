import React, { ReactElement } from "react";
import deepEqual from "fast-deep-equal";
import {
  Icon,
  LatLngBounds,
  Marker as LeafletMarker,
  MarkerOptions
} from "leaflet";
import Leaflet from "react-leaflet";
import { MapData, MapMarker, IconOpts } from "./__mapdata";

export interface ZoomOpts {
  maxZoom: number;
  minZoom: number;
  scrollWheelZoom: boolean;
  style: object;
}

export const defaultZoomOpts: ZoomOpts = {
  maxZoom: 18,
  minZoom: 9,
  scrollWheelZoom: false,
  style: { touchAction: "none" } // fix for chrome-android to prevent zooming page
};

interface Props {
  bounds?: LatLngBounds;
  boundsByMarkers?: boolean;
  mapData: MapData;
}

const mapCenter = (
  markers: MapMarker[],
  { latitude, longitude }: { latitude: number; longitude: number }
): [number, number] | undefined => {
  if (markers.length === 1) return [markers[0].latitude, markers[0].longitude];
  return [latitude, longitude];
};

const rotateMarker = (
  markerEl: LeafletMarker<MarkerOptions>,
  { rotation_angle: angle }: MapMarker
): void => {
  // TS does not recognize setRotationAngle, which
  // is added by the leaflet-rotatedmarker plugin
  // @ts-ignore
  markerEl.setRotationAngle(angle);
};

const Component = ({
  bounds,
  boundsByMarkers,
  mapData: {
    default_center: defaultCenter,
    markers,
    polylines,
    tile_server_url: tileServerUrl,
    zoom
  }
}: Props): ReactElement<HTMLElement> | null => {
  if (typeof window !== "undefined" && tileServerUrl !== "") {
    /* eslint-disable */
    const leaflet: typeof Leaflet = require("react-leaflet");
    const buildIcon: (
      icon: string | null,
      opts?: IconOpts
    ) => Icon | undefined = require("../icon").default;
    require("leaflet-rotatedmarker");
    const FullscreenControl = require("react-leaflet-fullscreen");
    const getBounds = require("../bounds").default;
    /* eslint-enable */
    const { Map, Marker, Polyline, Popup, TileLayer } = leaflet;
    const boundsOrByMarkers = bounds || (boundsByMarkers && getBounds(markers));
    const position = mapCenter(markers, defaultCenter);
    const nonNullZoom = zoom === null ? undefined : zoom;
    return (
      <Map
        bounds={boundsOrByMarkers}
        center={position}
        zoom={nonNullZoom}
        {...defaultZoomOpts}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`${tileServerUrl}/osm_tiles/{z}/{x}/{y}.png`}
        />
        {polylines.map(polyline => (
          <Polyline
            key={polyline.id || `polyline-${Math.floor(Math.random() * 1000)}`}
            positions={polyline.positions}
            color={polyline.color}
            weight={polyline.weight}
          />
        ))}
        {markers.map(marker => (
          <Marker
            icon={buildIcon(marker.icon, marker.icon_opts)}
            key={marker.id || `marker-${Math.floor(Math.random() * 1000)}`}
            position={[marker.latitude, marker.longitude]}
            ref={ref => ref && rotateMarker(ref.leafletElement, marker)}
            zIndexOffset={marker.z_index}
          >
            {marker.tooltip && (
              <Popup minWidth={320} maxHeight={175}>
                {marker.tooltip}
              </Popup>
            )}
          </Marker>
        ))}
        <FullscreenControl />
      </Map>
    );
  }
  return null;
};

export default React.memo(Component, deepEqual);
