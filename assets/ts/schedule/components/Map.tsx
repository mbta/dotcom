import React, { ReactElement, Reducer, useRef } from "react";
import { SocketEvent } from "../../app/channels";
import LeafletMap from "../../leaflet/components/Map";
import getBounds from "../../leaflet/bounds";
import {
  MapData,
  MapMarker as Marker
} from "../../leaflet/components/__mapdata";
import CrowdingPill from "./line-diagram/CrowdingPill";
import useChannel from "../../hooks/useChannel";

interface Props {
  channel: string;
  data: MapData;
  currentShapes: string[];
  currentStops: string[];
}

export const iconOpts = (
  icon: string | null
): {
  icon_size?: [number, number];
  icon_anchor?: [number, number];
} => {
  switch (icon) {
    case null:
      return {};

    case "vehicle-bordered-expanded":
      return {
        icon_size: [18, 18], // eslint-disable-line camelcase
        icon_anchor: [6, 6] // eslint-disable-line camelcase
      };

    case "stop-circle-bordered-expanded":
      return {
        icon_size: [12, 12], // eslint-disable-line camelcase
        icon_anchor: [6, 6] // eslint-disable-line camelcase
      };

    default:
      throw new Error(`unexpected icon type: ${icon}`);
  }
};

const zIndex = (icon: string | null): number | undefined =>
  icon === "vehicle-bordered-expanded" ? 1000 : undefined;

const updateMarker = (marker: Marker): Marker => ({
  ...marker,
  tooltip: (
    <div>
      {marker.vehicle_crowding && (
        <>
          <CrowdingPill crowding={marker.vehicle_crowding} />
          <br />
        </>
      )}
      {marker.tooltip_text}
    </div>
  ),
  icon_opts: iconOpts(marker.icon), // eslint-disable-line camelcase
  z_index: zIndex(marker.icon) // eslint-disable-line camelcase
});

const isVehicleMarker = (marker: Marker): boolean =>
  marker.icon ? marker.icon.includes("vehicle") : false;

interface IdHash {
  [id: string]: true;
}

const shouldRemoveMarker = (id: string | null, idHash: IdHash): boolean =>
  id !== null && idHash[id] === true;

interface EventData {
  marker: Marker;
}

type DataFromSocketType = SocketEvent<EventData[]>;
interface DataReducerState {
  markers: Marker[];
}
type DataReducerAction = DataFromSocketType;
type DataReducerType = Reducer<DataReducerState, DataReducerAction>;

export const reducer: DataReducerType = (state, action) => {
  switch (action.event) {
    case "reset":
      return {
        ...state,
        markers: state.markers
          .filter(marker => !isVehicleMarker(marker))
          .concat(
            action.data.map(({ marker }: EventData) => updateMarker(marker))
          )
      };

    case "add":
      return {
        ...state,
        markers: state.markers.concat(
          action.data.map(({ marker }) => updateMarker(marker))
        )
      };

    case "update":
      if (action.data.length === 0) {
        return state;
      }
      // Filter out the existing marker if necessary, always add new marker
      return {
        ...state,
        markers: [
          updateMarker(action.data[0].marker),
          ...state.markers.filter(
            marker => marker.id !== action.data[0].marker.id
          )
        ]
      };
    case "remove":
      return {
        ...state,
        markers: state.markers.filter(
          marker =>
            !shouldRemoveMarker(
              marker.id,
              action.data.reduce((acc: IdHash, id: string) => {
                acc[id] = true;
                return acc;
              }, {})
            )
        )
      };
    default:
      /* istanbul ignore next */
      // eslint-disable-next-line no-console
      console.warn("unexpected event", action);
      return state;
  }
};

const Map = ({
  data,
  channel,
  currentShapes,
  currentStops
}: Props): ReactElement<HTMLElement> | null => {
  const state = useChannel<DataFromSocketType, DataReducerType>(
    channel,
    reducer,
    { markers: [] }
  );

  const stopMarkers = data.stop_markers
    ? data.stop_markers
        .filter(mark => currentStops.includes(mark.id as string))
        .map(marker => updateMarker(marker))
    : [];

  const mapData = {
    ...data,
    polylines: data.polylines.filter(p =>
      currentShapes.some(shape => shape === p.id)
    ),
    markers: state.markers.concat(stopMarkers)
  };
  const bounds = useRef(getBounds(stopMarkers));
  return (
    <div className="m-schedule__map">
      <LeafletMap bounds={bounds.current} mapData={mapData} />
    </div>
  );
};

export default Map;
