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
import { LiveDataByStop } from "../../schedule/components/line-diagram/__line-diagram";
import CrowdingPill from "../../schedule/components/line-diagram/CrowdingPill";
import { isACommuterRailRoute } from "../../models/route";
import { maybeAddTrackToTooltip } from "../../../js/cr-timetable-tooltips";

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
  // liveData set as optional since it's also used in Itinerary.tsx
  // and we don't need liveData there
  liveData?: LiveDataByStop;
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

export const buildTooltip = (
  marker: MapMarker,
  liveData: LiveDataByStop | undefined
): ReactElement<HTMLElement> => {
  // for Commuter Rail, conditionally adjust vehicle markers' tooltip
  // with information from both prediction and vehicle
  const tooltipText =
    marker.z_index === 1000 &&
    liveData &&
    marker.mode &&
    isACommuterRailRoute(marker.mode)
      ? maybeAddTrackToTooltip(marker, liveData)
      : marker.tooltip_text;

  return (
    <div>
      {marker.vehicle_crowding && (
        <>
          <CrowdingPill crowding={marker.vehicle_crowding} />
          <br />
        </>
      )}
      {tooltipText}
    </div>
  );
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
  },
  liveData
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
    /* istanbul ignore next */
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
        {polylines.map(
          /* istanbul ignore next */
          polyline => (
            <Polyline
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
        {markers.map(marker => (
          <Marker
            icon={buildIcon(marker.icon, marker.icon_opts)}
            key={
              marker.id ||
              /* istanbul ignore next */ `marker-${Math.floor(
                Math.random() * 1000
              )}`
            }
            position={[marker.latitude, marker.longitude]}
            ref={ref => ref && rotateMarker(ref.leafletElement, marker)}
            zIndexOffset={marker.z_index}
            keyboard={false}
          >
            {marker.tooltip_text && (
              <Popup maxHeight={175}>{buildTooltip(marker, liveData)}</Popup>
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
