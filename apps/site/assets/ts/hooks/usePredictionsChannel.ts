import { pick, sortBy } from "lodash";
import { Reducer } from "react";
import {
  DirectionId,
  Route,
  ScheduleRelationship,
  Stop,
  Trip
} from "../__v3api";
import useChannel from "./useChannel";
import { PredictionWithTimestamp } from "../models/perdictions";

/**
 * The format of a prediction emitted via websockets from
 * SiteWeb.PredictionsChannel.
 */
export interface StreamPrediction {
  id: string;
  arrival_time: string | null;
  departure_time: string | null;
  time: string | null;
  route: Route;
  stop: Stop;
  trip: Trip;
  stop_sequence: number;
  direction_id: DirectionId;
  schedule_relationship: ScheduleRelationship;
  track: string | null;
  status: string | null;
  "departing?": boolean;
  vehicle_id: string | null;
}

interface ChannelPredictionResponse {
  predictions: StreamPrediction[];
}

export interface PredictionsByHeadsign {
  [headsign: string]: PredictionWithTimestamp[];
}

// Parses departure time into Date()
export const parsePrediction = (
  prediction: StreamPrediction
): PredictionWithTimestamp => ({
  ...pick(prediction, [
    "id",
    "route",
    "stop",
    "trip",
    "direction_id",
    "schedule_relationship",
    "track",
    "status",
    "vehicle_id"
  ]),
  arrival_time: prediction.arrival_time
    ? new Date(prediction.arrival_time)
    : null,
  departure_time: prediction.departure_time
    ? new Date(prediction.departure_time)
    : null,
  time: prediction.time ? new Date(prediction.time) : null
});

interface PredictionsChannelArgs {
  routeId?: string;
  stopId?: string;
  directionId?: 0 | 1;
}

function channelFromArgs(channelArgs: PredictionsChannelArgs): string | null {
  const keysWithValues = Object.entries({
    route: "routeId",
    stop: "stopId",
    direction_id: "directionId"
  })
    .map(([key, arg]) => {
      const value = channelArgs[arg as keyof PredictionsChannelArgs];
      if (value !== undefined) {
        return `:${key}=${value}`;
      }
      return "";
    })
    .join("");
  return keysWithValues === "" ? null : `predictions${keysWithValues}`;
}

/**
 * Subscribes to updates on predictions for a specific route/stop/direction via
 * websockets + Phoenix channels. The channel updates very frequently, so this
 * function takes care to only emit updated predictions if they are different
 * from the previous set of predictions.
 */
const usePredictionsChannel = (
  args: PredictionsChannelArgs
): PredictionWithTimestamp[] => {
  const channelName = channelFromArgs(args);
  const reducer: Reducer<
    PredictionWithTimestamp[],
    ChannelPredictionResponse
  > = (_oldGroupedPredictions, { predictions }) => {
    return sortBy(predictions.map(parsePrediction), "time");
  };
  const initialState: PredictionWithTimestamp[] = [];
  const state = useChannel(channelName, reducer, initialState);
  return state;
};

export default usePredictionsChannel;
