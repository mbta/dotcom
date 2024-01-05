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
import { PredictionWithTimestamp } from "../models/predictions";

/**
 * The format of a prediction emitted via websockets from
 * DotcomWeb.PredictionsChannel.
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
  error: string;
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
    "vehicle_id",
    "stop_sequence"
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
  stopId?: string;
}

function channelFromArgs(channelArgs: PredictionsChannelArgs): string | null {
  const { stopId } = channelArgs;
  if (stopId) {
    return `predictions:stop:${stopId}`;
  }
  return null;
}

/**
 * Subscribes to updates on predictions for a specific route/stop/direction via
 * websockets + Phoenix channels. The channel updates very frequently, so this
 * function takes care to only emit updated predictions if they are different
 * from the previous set of predictions.
 */
const usePredictionsChannel = (
  args: PredictionsChannelArgs
): PredictionWithTimestamp[] | null => {
  const channelName = channelFromArgs(args);
  const reducer: Reducer<
    PredictionWithTimestamp[] | null,
    ChannelPredictionResponse
  > = (_oldGroupedPredictions, detail) => {
    if (detail.error || !detail.predictions) {
      return null;
    }
    return sortBy(detail.predictions.map(parsePrediction), "time");
  };
  // useChannel will return the initialState if the channel can't be joined / if
  // the channelName is null;
  const state = useChannel(channelName, reducer, []);
  return state;
};

export default usePredictionsChannel;
