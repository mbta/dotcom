import React, {
  ReactElement,
  useReducer,
  useEffect,
  Dispatch,
  useRef
} from "react";
import { initChannel, stopChannel, SocketEvent } from "./Channel";
import LeafletMap from "../../leaflet/components/Map";
import getBounds from "../../leaflet/bounds";
import {
  MapData,
  MapMarker as Marker
} from "../../leaflet/components/__mapdata";
import CrowdingPill from "./line-diagram/CrowdingPill";

interface Props {
  channel: string;
  data: MapData;
  currentShapes: string[];
  currentStops: string[];
}

interface EventData {
  marker: Marker;
}

type Action = SocketEvent<EventData[]>;

interface ActionWithChannel {
  action: Action;
  channel: string;
}

const setupChannels = (
  channel: string,
  dispatch: Dispatch<ActionWithChannel>
): void => {
  dispatch({ action: { event: "setChannel", data: [] }, channel });
  /* istanbul ignore next */
  initChannel<EventData[]>(channel, (action: Action) =>
    dispatch({ action, channel })
  );
  /* istanbul ignore next */
  initChannel<EventData[]>("vehicles:remove", (action: Action) =>
    dispatch({ action, channel })
  );
};

const stopChannels = (channel: string): void => {
  stopChannel(channel);
  stopChannel("vehicles:remove");
};

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

interface State {
  channel: string;
  markers: Marker[];
}

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

const Map = ({
  data,
  channel,
  currentShapes,
  currentStops
}: Props): ReactElement<HTMLElement> | null => {
  const [state, dispatch] = useReducer(reducer, {
    channel,
    markers: data.markers
  });
  useEffect(() => {
    setupChannels(channel, dispatch);
    return () => stopChannels(channel);
  }, [channel, dispatch]);
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
