import React, { ReactElement } from "react";
import deepEqual from "fast-deep-equal/react";
import { LatLngBounds } from "leaflet";
import { LatLng } from "react-leaflet";
import { MapData, MapMarker } from "../../../leaflet/components/__mapdata";
import stopIncludesModes from "../../helpers/stop-includes-modes";
import { clickMarkerAction, SelectedStopType, Dispatch } from "../../state";
import { StopWithRoutes } from "../__tnm";
import { Stop, EnhancedRoute, Mode } from "../../../__v3api";
import MapWrapper from "./MapWrapper";

interface Props {
  initialData: MapData;
  dispatch: Dispatch;
  selectedStopId: SelectedStopType;
  selectedModes: Mode[];
  shouldCenterMapOnSelectedStop: boolean;
  shouldFilterMarkers: boolean;
  stopData: StopWithRoutes[];
}

const halfMile = 0.008333;
export const withinHalfMile = (position: [number, number]): LatLngBounds => {
  // eslint-disable-next-line
  const { latLng, latLngBounds } = require("leaflet");
  const east: LatLng = latLng([position[0] + halfMile, position[1]]);
  const west: LatLng = latLng([position[0] - halfMile, position[1]]);
  return latLngBounds(east, west);
};

export const boundsForMap = (
  markers: MapMarker[],
  defaultCenter: { latitude: number; longitude: number }
): LatLngBounds | undefined => {
  const currentLocation = markers.find(
    (marker: MapMarker) => marker.id === "current-location"
  );

  if (currentLocation) {
    return withinHalfMile([
      currentLocation!.latitude,
      currentLocation!.longitude
    ]);
  }
  return withinHalfMile([defaultCenter!.latitude, defaultCenter!.longitude]);
};

export const isMarkerVisible = (
  stopData: StopWithRoutes | undefined,
  shouldFilterMarkers: boolean,
  selectedModes: Mode[]
): boolean =>
  shouldFilterMarkers && stopData
    ? stopIncludesModes(stopData, selectedModes)
    : true;

export interface StopsForMarkers {
  [id: string]: {
    stop: Stop;
    routes: EnhancedRoute[];
    distanceFormatted: string;
  };
}

export const buildStopsForMarkers = (
  stopData: StopWithRoutes[]
): StopsForMarkers => {
  const emptyObject: StopsForMarkers = {};
  return stopData.reduce((acc, { stop, routes, distance }) => {
    acc[stop.id] = {
      stop,
      routes: routes
        .map(r => r.routes)
        .reduce((accFlat, routeList) => accFlat.concat(routeList), []),
      distanceFormatted: distance
    };
    return acc;
  }, emptyObject);
};

const Component = ({
  initialData: {
    markers: initialMarkers,
    tile_server_url: tileServerUrl,
    zoom,
    default_center: defaultCenter
  },
  shouldCenterMapOnSelectedStop,
  selectedStopId,
  stopData,
  dispatch,
  shouldFilterMarkers,
  selectedModes
}: Props): ReactElement<HTMLElement> | null => {
  if (typeof window !== "undefined" && tileServerUrl !== "") {
    // determine markers to filter from display, filter current location if no stops nearby
    const visibleMarkers = stopData.length
      ? initialMarkers.filter(m =>
          isMarkerVisible(
            stopData.find(stop => stop.stop.id === m.id),
            shouldFilterMarkers,
            selectedModes
          )
        )
      : [];

    // build data for stop tooltips
    const stopsForMarker: StopsForMarkers = buildStopsForMarkers(stopData);
    const bounds = boundsForMap(visibleMarkers, defaultCenter);
    return (
      <MapWrapper
        zoom={zoom}
        bounds={bounds}
        onClick={() => dispatch(clickMarkerAction(null))}
        tileServerUrl={tileServerUrl}
        visibleMarkers={visibleMarkers}
        markers={initialMarkers}
        dispatch={dispatch}
        selectedStopId={selectedStopId}
        tooltipData={stopsForMarker}
        shouldCenterMapOnSelectedStop={shouldCenterMapOnSelectedStop}
      />
    );
  }
  return null;
};

export default React.memo(Component, deepEqual);
