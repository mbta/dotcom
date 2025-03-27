import React, { ReactElement, useLayoutEffect } from "react";
import { uniqBy } from "lodash";
import deepEqual from "fast-deep-equal/react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = React.createRef<any>();
  useLayoutEffect(() => {
    if (mapRef.current && mapRef.current.leafletElement) {
      // tells Leaflet to redraw the map
      mapRef.current.leafletElement.invalidateSize();
    }
  }, [mapRef]);

  if (typeof window !== "undefined" && tileServerUrl !== "") {
    /* eslint-disable */
    const leaflet: typeof Leaflet = require("react-leaflet");
    const buildIcon: (
      icon: string | null,
      opts?: IconOpts
    ) => Icon | undefined = require("../icon").default;
    require("leaflet-rotatedmarker");
    const getBounds = require("../bounds").default;
    /* eslint-enable */
    const { Map, Marker, Polyline, Popup, TileLayer } = leaflet;
    /* istanbul ignore next */
    const boundsOrByMarkers = bounds || (boundsByMarkers && getBounds(markers));
    const position = mapCenter(markers, defaultCenter);
    const nonNullZoom = zoom === null ? undefined : zoom;

    const onTilesLoaded = (): void => {
      mapRef.current.container.parentElement.classList += " map--loaded";
    };

    return (
      <Map
        ref={mapRef}
        bounds={boundsOrByMarkers}
        center={position}
        zoom={nonNullZoom}
        {...defaultZoomOpts}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`${tileServerUrl}/osm_tiles/{z}/{x}/{y}.png`}
          onload={onTilesLoaded}
        />
        {polylines.map(
          /* istanbul ignore next */
          polyline => (
            <Polyline
              className={polyline.className}
              key={
                polyline.id || `polyline-${Math.floor(Math.random() * 1000)}`
              }
              positions={polyline.positions}
              color={polyline.color}
              weight={polyline.weight}
              dashArray={polyline["dotted?"] ? "4px 8px" : "none"}
              lineCap={polyline["dotted?"] ? "butt" : "round"}
              lineJoin={polyline["dotted?"] ? "miter" : "round"}
            />
          )
        )}
        {uniqBy(markers, "id").map(marker => (
          <Marker
            icon={buildIcon(marker.icon, marker.icon_opts)}
            key={
              marker.id ||
              /* istanbul ignore next */ `marker-${Math.floor(
                Math.random() * 1000
              )}`
            }
            alt={marker.alt || "Marker"}
            position={[marker.latitude, marker.longitude]}
            ref={ref => ref && rotateMarker(ref.leafletElement, marker)}
            zIndexOffset={marker.z_index}
            keyboard={false}
            onclick={marker.onClick}
          >
            {marker.tooltip && <Popup offset={[0, 40]}>{marker.tooltip}</Popup>}
          </Marker>
        ))}
      </Map>
    );
  }
  return null;
};

export default React.memo(Component, deepEqual);
