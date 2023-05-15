import { pick, keyBy } from "lodash";
import deepEqual from "fast-deep-equal/react";
import { Reducer } from "react";
import { DirectionId } from "../__v3api";
import useChannel from "./useChannel";
import { CrowdingType } from "../schedule/components/__schedule";

/**
 * The format of a vehicle emitted by the VehiclesChannel
 */
export interface VehicleData {
  id: string;
  route_id: string | null;
  trip_id: string | null;
  shape_id: string | null;
  stop_id: string | null;
  direction_id: DirectionId;
  longitude: number;
  latitude: number;
  bearing: number;
  status: string;
  crowding: CrowdingType | null;
}

export interface Vehicle {
  id: string;
  route_id: string | null;
  trip_id: string | null;
  shape_id: string | null;
  stop_id: string | null;
  direction_id: DirectionId;
  longitude: number;
  latitude: number;
  bearing: number;
  status: string;
  crowding: CrowdingType | null;
}

// Parses departure time into Date()
export const parseVehicle = (vehicle: VehicleData): Vehicle =>
  pick(vehicle, [
    "id",
    "route_id",
    "trip_id",
    "shape_id",
    "stop_id",
    "direction_id",
    "longitude",
    "latitude",
    "bearing",
    "status",
    "crowding"
  ]);

interface AddEvent {
  event: "add" | "update" | "reset";
  data: VehicleData[];
}
interface UpdateEvent {
  event: "update";
  data: VehicleData[];
}

interface ResetEvent {
  event: "reset";
  data: VehicleData[];
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
      return channelMessage.data.map(parseVehicle);

    case "add":
      return initialState.concat(channelMessage.data.map(parseVehicle));

    case "update": {
      if (channelMessage.data.length === 0) {
        return initialState;
      }

      const vehiclesToUpdate = keyBy(
        channelMessage.data,
        vehicleData => vehicleData.id
      );

      return initialState.map(oldVehicle => {
        if (oldVehicle.id in vehiclesToUpdate) {
          return parseVehicle(vehiclesToUpdate[oldVehicle.id]);
        }
        return oldVehicle;
      });
    }

    case "remove": {
      const ids_to_remove = new Set(channelMessage.data);
      return initialState.filter(vehicle => !ids_to_remove.has(vehicle.id));
    }
    default:
      /* istanbul ignore next */
      // eslint-disable-next-line no-console
      console.error("unexpected event", channelMessage);
      return initialState;
  }
};

/**
 * Subscribes to updates on vehicles for a specific route and direction via
 * websockets + Phoenix channels.
 */
const useVehiclesChannel = (
  routeId: string,
  directionId: DirectionId
): Vehicle[] => {
  const channelName = `vehicles-v2:${routeId}:${directionId}`;
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
