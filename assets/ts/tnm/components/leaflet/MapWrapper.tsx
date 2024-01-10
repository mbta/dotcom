import React, { useState, ReactElement } from "react";
import { LatLngBounds } from "leaflet";
import Leaflet, { Viewport } from "react-leaflet";
import { MapMarker } from "../../../leaflet/components/__mapdata";
import { StopsForMarkers } from "./TransitNearMeMap";
import MarkerWrapper from "./MarkerWrapper";
import {
  Dispatch,
  SelectedStopType,
  resetCenterMapOnSelectedStop
} from "../../state";
import { defaultZoomOpts } from "../../../leaflet/components/Map";

type State = Viewport;

export interface Props {
  bounds: LatLngBounds | undefined;
  dispatch: Dispatch;
  markers: MapMarker[];
  onClick: Function;
  selectedStopId: SelectedStopType;
  shouldCenterMapOnSelectedStop: boolean;
  tileServerUrl: string;
  tooltipData: StopsForMarkers;
  visibleMarkers: MapMarker[];
  zoom: number | undefined | null;
}

export const centerMapByMarker = (
  markers: MapMarker[],
  selectedStopId: SelectedStopType
): [number, number] => {
  const marker = markers.find((m: MapMarker) => m.id === selectedStopId);
  return [marker!.latitude, marker!.longitude];
};

export const centerMap = (
  shouldCenterMapOnSelectedStop: boolean,
  selectedStopId: string | null,
  markers: MapMarker[],
  viewport: Viewport,
  dispatch: Dispatch
): Viewport => {
  if (shouldCenterMapOnSelectedStop && selectedStopId) {
    dispatch(resetCenterMapOnSelectedStop(selectedStopId));
    return {
      center: centerMapByMarker(markers, selectedStopId),
      zoom: viewport.zoom
    };
  }
  return viewport;
};

const LeafletMap = ({
  bounds,
  dispatch,
  markers,
  onClick,
  selectedStopId,
  shouldCenterMapOnSelectedStop,
  tileServerUrl,
  tooltipData,
  visibleMarkers,
  zoom
}: Props): ReactElement<HTMLElement> => {
  /* eslint-disable */
  const leaflet: typeof Leaflet = require("react-leaflet");
  const { Map, TileLayer } = leaflet;
  /* eslint-enable */

  // position map by selected stop or current viewport (when no longer selecting)
  const [viewport, setViewport] = useState<State>({
    center: undefined,
    zoom
  });
  const onViewport = (view: Viewport): void => {
    setViewport(view);
  };

  // determine position for map, either new center by selected stop or current center
  const position = centerMap(
    shouldCenterMapOnSelectedStop,
    selectedStopId,
    markers,
    viewport,
    dispatch
  );

  return (
    <Map
      viewport={position}
      bounds={bounds}
      onClick={onClick}
      onViewportChange={onViewport}
      {...defaultZoomOpts}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${tileServerUrl}/osm_tiles/{z}/{x}/{y}.png`}
      />
      {visibleMarkers.map(marker => (
        <MarkerWrapper
          key={`markerwrapper-${marker.id || Math.floor(Math.random() * 1000)}`}
          marker={{
            ...marker
          }}
          tooltipData={marker.id ? tooltipData[marker.id] : null}
          tileServerUrl={tileServerUrl}
          isSelected={selectedStopId === marker.id}
          dispatch={dispatch}
        />
      ))}
    </Map>
  );
};

export default LeafletMap;
