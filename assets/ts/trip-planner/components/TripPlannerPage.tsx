import React, { Dispatch, ReactElement, useReducer, useEffect } from "react";
import LeafletMap from "../../leaflet/components/Map";
import {
  MapData,
  MapMarker as Marker
} from "../../leaflet/components/__mapdata";
import getBounds from "../../leaflet/bounds";

interface Props {
  mapData: MapData;
}

export interface State {
  markers: Marker[];
}

interface UpdateAction {
  type: "UPDATE_MARKER";
  payload: {
    marker: Marker;
  };
}

interface RemoveAction {
  type: "REMOVE_MARKER";
  payload: {
    id: string;
  };
}

export type Action = UpdateAction | RemoveAction;

export type RemoveEvent = Event & { detail: { label: string } };
export type UpdateEvent = Event & {
  detail: {
    latitude: number;
    longitude: number;
    label: string;
    title: string;
  };
};

export const onRemove = (
  { detail: { label } }: RemoveEvent,
  dispatch: Dispatch<Action>
): void => {
  dispatch({ type: "REMOVE_MARKER", payload: { id: label } });
};

export const onUpdate = (
  { detail }: UpdateEvent,
  dispatch: Dispatch<Action>
): void => {
  const marker: Marker = {
    icon: `map-pin-${detail.label.toLowerCase()}`,
    id: detail.label,
    latitude: detail.latitude,
    longitude: detail.longitude,
    rotation_angle: 0, // eslint-disable-line camelcase
    tooltip: <div>{detail.title}</div>
  };

  dispatch({ type: "UPDATE_MARKER", payload: { marker } });
};

const removeMarker = (markers: Marker[], id: string | null): Marker[] =>
  markers.reduce(
    (acc: Marker[], m: Marker) => (m.id === id ? acc : acc.concat(m)),
    []
  );

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_MARKER":
      return {
        markers: removeMarker(state.markers, action.payload.marker.id).concat(
          action.payload.marker
        )
      };

    case "REMOVE_MARKER":
      return { markers: removeMarker(state.markers, action.payload.id) };

    default:
      // @ts-ignore
      throw new Error(`unexpected action type: ${action.type}`);
  }
};

const TripPlannerPage = ({ mapData }: Props): ReactElement<HTMLElement> => {
  const [state, dispatch] = useReducer(reducer, { markers: mapData.markers });
  useEffect(() => {
    const onRemoveCb = (ev: Event): void =>
      onRemove(ev as RemoveEvent, dispatch);
    const onUpdateCb = (ev: Event): void =>
      onUpdate(ev as UpdateEvent, dispatch);

    document.addEventListener("trip-plan:remove-marker", onRemoveCb);
    document.addEventListener("trip-plan:update-marker", onUpdateCb);

    return () => {
      document.removeEventListener("trip-plan:remove-marker", onRemoveCb);
      document.removeEventListener("trip-plan:update-marker", onUpdateCb);
    };
  });
  const bounds = state.markers.length ? getBounds(state.markers) : undefined;
  return (
    <LeafletMap
      bounds={bounds}
      mapData={{ ...mapData, markers: state.markers }}
    />
  );
};

export default TripPlannerPage;
