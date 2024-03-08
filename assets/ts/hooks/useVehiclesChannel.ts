import { keyBy } from "lodash";
import deepEqual from "fast-deep-equal/react";
import { Reducer } from "react";
import { DirectionId } from "../__v3api";
import useChannel from "./useChannel";
import { CrowdingType } from "../schedule/components/__schedule";

export interface Vehicle {
  id: string;
  route_id: string | null;
  trip_id: string | null;
  stop_id: string | null;
  direction_id: DirectionId;
  longitude: number;
  latitude: number;
  bearing: number;
  status: string;
  crowding: CrowdingType | null;
}

interface AddEvent {
  event: "add";
  data: Vehicle[];
}
interface UpdateEvent {
  event: "update";
  data: Vehicle[];
}

interface ResetEvent {
  event: "reset";
  data: Vehicle[];
}

interface RemoveEvent {
  event: "remove";
  data: string[];
}
type ChannelMessage = AddEvent | UpdateEvent | ResetEvent | RemoveEvent;

export const vehiclesReducer = (
  initialState: Vehicle[],
  channelMessage: ChannelMessage
): Vehicle[] => {
  switch (channelMessage.event) {
    case "reset":
      return channelMessage.data;

    case "add":
      return initialState.concat(channelMessage.data);

    case "update": {
      if (channelMessage.data.length === 0) {
        return initialState;
      }

      const vehiclesToUpdate = keyBy(
        channelMessage.data,
        vehicleData => vehicleData.id
      );

      return initialState.map(oldVehicle =>
        oldVehicle.id in vehiclesToUpdate
          ? vehiclesToUpdate[oldVehicle.id]
          : oldVehicle
      );
    }

    case "remove": {
      const ids_to_remove = new Set(channelMessage.data);
      return initialState.filter(vehicle => !ids_to_remove.has(vehicle.id));
    }
    default:
      /* istanbul ignore next */
      // eslint-disable-next-line no-console
      console.error("unexpected event: vehiclesChannel", channelMessage);
      return initialState;
  }
};

/**
 * Subscribes to updates on vehicles for a specific route and direction via
 * websockets + Phoenix channels.
 */
const useVehiclesChannel = (
  routeAndDirection: {
    routeId: string;
    directionId: DirectionId;
  } | null
): Vehicle[] => {
  const channelName = routeAndDirection
    ? `vehicles-v2:${routeAndDirection.routeId}:${routeAndDirection.directionId}`
    : null;
  const reducer: Reducer<Vehicle[], ChannelMessage> = (
    oldVehicles,
    incomingMessage
  ) => {
    const newVehicles = vehiclesReducer(oldVehicles, incomingMessage);
    return deepEqual(oldVehicles, newVehicles) ? oldVehicles : newVehicles;
  };
  const initialState: Vehicle[] = [];
  const state = useChannel(channelName, reducer, initialState);
  return state;
};

export default useVehiclesChannel;
