import { groupBy, mapValues, pick, sortBy } from "lodash";
import deepEqual from "fast-deep-equal/react";
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
  // backend removes all predictions with a null departure_time
  // so this is always populated
  time: new Date(prediction.time!)
});

export const groupByHeadsigns = (
  predictions: PredictionWithTimestamp[],
  numPredictions?: number
): PredictionsByHeadsign => {
  const byHeadsign = groupBy(predictions, "trip.headsign");
  return mapValues(byHeadsign, headsignPredictions =>
    sortBy(headsignPredictions, "time").slice(0, numPredictions)
  );
};

/**
 * Subscribes to updates on predictions for a specific route/stop/direction via
 * websockets + Phoenix channels. The channel updates very frequently, so this
 * function takes care to only emit updated predictions if they are different
 * from the previous set of predictions.
 * - Transforms the predictions via a reducer function that groups the
 *   predictions by trip headsign, sorting the lists of predictions by time.
 * - Default behavior will keep all predictions, but `numPredictions` can be
 *   used to truncate to a certain number of predictions per headsign.
 */
interface PredictionKey {
  routeId?: string;
  stopId?: string;
  directionId?: 0 | 1;
}
const usePredictionsChannel = ({
  routeId,
  stopId,
  directionId
}: PredictionKey): PredictionWithTimestamp[] => {
  let channelName = `predictions`;

  if (routeId) {
    channelName += `:route=${routeId}`;
  }

  if (stopId) {
    channelName += `:stop=${stopId}`;
  }

  if (directionId) {
    channelName += `:direction_id=${directionId}`;
  }
  const reducer: Reducer<
    PredictionWithTimestamp[],
    ChannelPredictionResponse
  > = (oldPredictions, { predictions }) => {
    const parsedPredictions = predictions.map(parsePrediction);
    // don't attempt to reconcile with prior predictions, just replace state with
    // all the new predictions from the channel if there are any changes.
    return deepEqual(oldPredictions, parsedPredictions)
      ? oldPredictions
      : parsedPredictions;
  };
  const initialState: PredictionWithTimestamp[] = [];
  const state = useChannel(channelName, reducer, initialState);
  return state;
};

export default usePredictionsChannel;
