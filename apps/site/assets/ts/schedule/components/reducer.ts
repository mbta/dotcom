import { MapMarker as Marker } from "../../leaflet/components/__mapdata";
import { SocketEvent } from "./Channel";

interface State {
  channel: string;
  markers: Marker[];
}

export interface EventData {
  marker: Marker;
}

export type Action = SocketEvent<EventData[]>;

export interface ActionWithChannel {
  action: Action;
  channel: string;
}

interface IdHash {
  [id: string]: true;
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

export const updateMarker = (marker: Marker): Marker => ({
  ...marker,
  icon_opts: iconOpts(marker.icon), // eslint-disable-line camelcase
  z_index: zIndex(marker.icon) // eslint-disable-line camelcase
});

const shouldRemoveMarker = (id: string | null, idHash: IdHash): boolean =>
  id !== null && idHash[id] === true;

const isVehicleMarker = (marker: Marker): boolean =>
  marker.icon ? marker.icon.includes("vehicle") : false;

export const reducer = (
  state: State,
  actionWithChannel: ActionWithChannel
): State => {
  const { action, channel } = actionWithChannel;
  if (channel !== state.channel && action.event !== "setChannel") return state;
  switch (action.event) {
    case "setChannel":
      return { ...state, channel, markers: [] };
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
      throw new Error(`unexpected event: ${action}`);
  }
};
