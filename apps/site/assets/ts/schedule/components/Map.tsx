import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import { LatLng, latLng, LatLngBounds, latLngBounds } from "leaflet";
import initChannel, { SocketEvent } from "./Channel";
import Map from "../../leaflet/components/Map";
import {
  MapData,
  MapMarker as Marker
} from "../../leaflet/components/__mapdata";

interface Props {
  channel: string;
  data: MapData;
}

interface EventData {
  marker: Marker;
}

type Action = SocketEvent<EventData[]>;

const setupChannels = (channel: string, dispatch: Dispatch<Action>): void => {
  initChannel<EventData[]>(channel, (action: Action) => dispatch(action));
  initChannel<EventData[]>("vehicles:remove", (action: Action) =>
    dispatch(action)
  );
};

export const getBounds = (markers: Marker[]): LatLngBounds => {
  const points: LatLng[] = markers.map(m => latLng(m.latitude, m.longitude));
  return latLngBounds(points);
};

export const iconOpts = (
  icon: string | null
): {
  iconSize?: [number, number];
  iconAnchor?: [number, number];
} => {
  switch (icon) {
    case null:
      return {};

    case "vehicle-bordered-expanded":
      return {
        iconSize: [18, 18],
        iconAnchor: [6, 6]
      };

    case "stop-circle-bordered-expanded":
      return {
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      };

    default:
      throw new Error(`unexpected icon type: ${icon}`);
  }
};

const zIndex = (icon: string | null): number | undefined =>
  icon === "vehicle-bordered-expanded" ? 1000 : undefined;

const updateMarker = (marker: Marker): Marker => ({
  ...marker,
  tooltip: <div>{marker.tooltip_text}</div>,
  iconOpts: iconOpts(marker.icon),
  zIndex: zIndex(marker.icon)
});

const isVehicleMarker = (marker: Marker): boolean =>
  marker.icon ? marker.icon.includes("vehicle") : false;

interface IdHash {
  [id: string]: true;
}

const shouldRemoveMarker = (id: string | null, idHash: IdHash): boolean =>
  id !== null && idHash[id] === true;

export const reducer = (state: Marker[], action: Action): Marker[] => {
  switch (action.event) {
    case "reset":
      return state
        .filter(marker => !isVehicleMarker(marker))
        .concat(action.data.map(({ marker }) => updateMarker(marker)));

    case "add":
      return state.concat(
        action.data.map(({ marker }) => updateMarker(marker))
      );

    case "update":
      return state.map(marker =>
        marker.id === action.data[0].marker.id
          ? updateMarker(action.data[0].marker)
          : marker
      );

    case "remove":
      return state.filter(
        marker =>
          !shouldRemoveMarker(
            marker.id,
            action.data.reduce((acc: IdHash, id: string) => {
              acc[id] = true;
              return acc;
            }, {})
          )
      );

    default:
      // @ts-ignore
      throw new Error(`unexpected event: ${action.event}`);
  }
};

export default ({ data, channel }: Props): ReactElement<HTMLElement> => {
  const [state, dispatch] = useReducer(reducer, data.markers.map(updateMarker));
  useEffect(() => setupChannels(channel, dispatch), [channel]);
  return (
    <div className="m-schedule__map">
      <Map bounds={getBounds(state)} mapData={{ ...data, markers: state }} />
    </div>
  );
};
