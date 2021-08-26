import { MapMarker as Marker } from "../../leaflet/components/__mapdata";
// import { LineDiagramVehicle } from "../components/__schedule";
import { SocketEvent } from "./Channel";
import {
  shouldRemoveMarker,
  isVehicleMarker,
  updateMarker
} from "./marker-utils";

export interface State {
  channel: string;
  markers: Marker[];
  // data: {
  //   vehicle: LineDiagramVehicle;
  //   stop_name: string; // eslint-disable-line camelcase
  // };
}

export interface EventData {
  marker: Marker;
  // data: {
  //   vehicle: LineDiagramVehicle;
  //   stop_name: string; // eslint-disable-line camelcase
  // };
}

export type Action = SocketEvent<EventData[]>;

export interface ActionWithChannel {
  action: Action;
  channel: string;
}

export interface IdHash {
  [id: string]: true;
}

export const reducer = (
  state: State,
  actionWithChannel: ActionWithChannel
): State => {
  const { action, channel } = actionWithChannel;
  if (channel !== state.channel && action.event !== "setChannel") return state;
  switch (action.event) {
    case "setChannel":
      return {
        ...state,
        channel,
        // data: { vehicle: {} as LineDiagramVehicle, stop_name: "" },
        markers: []
      };
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
        // data ??
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
        // data: action.data[0].data,
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
