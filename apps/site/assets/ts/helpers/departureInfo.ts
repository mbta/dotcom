import { concat, difference, keyBy, keys, map, sortBy } from "lodash";
import { PredictionWithTimestamp } from "../models/perdictions";
import { ScheduleWithTimestamp } from "../models/schedules";
import { isCancelled, isDelayed } from "./prediction-helpers";
import { DepartureInfo } from "../models/departureInfo";

const departureInfoToTime = (departureInfo: DepartureInfo): Date => {
  // If there isn't a prediction there should be a schedule
  return departureInfo.prediction
    ? departureInfo.prediction.time
    : departureInfo.schedule!.time;
};

const mergeIntoDepartureInfo = (
  schedules: ScheduleWithTimestamp[],
  predictions: PredictionWithTimestamp[]
): DepartureInfo[] => {
  const schedulesByTripId = keyBy(schedules, sch => sch.trip.id);
  const predictionsByTripId = keyBy(predictions, prd => prd.trip.id);

  const scheduleTripIds = keys(schedulesByTripId);
  const predictionTripIds = keys(predictionsByTripId);

  // All the schedules with and without predictions
  const scheduleDirectionInfo = map(
    schedulesByTripId,
    (schedule, tripId): DepartureInfo => {
      // prediction could be undefined
      const prediction = predictionsByTripId[tripId];
      return {
        prediction: prediction,
        schedule: schedule,
        isCancelled: isCancelled(prediction),
        isDelayed: isDelayed(prediction, schedule)
      };
    }
  );

  const unmatchedPredictionTripIds = difference(
    predictionTripIds,
    scheduleTripIds
  );
  // All the predictions with no schedules
  const predictionDirectionInfo = map(
    unmatchedPredictionTripIds,
    (tripId: string): DepartureInfo => {
      const prediction = predictionsByTripId[tripId];
      return {
        prediction: prediction,
        isCancelled: isCancelled(prediction)
      } as DepartureInfo;
    }
  );

  const departureInfos = concat(scheduleDirectionInfo, predictionDirectionInfo);
  const sortedDepartureInfo = sortBy(departureInfos, di => {
    // prioritize sorting by predictions
    if (di.prediction) {
      return di.prediction.time;
    }
    return di.schedule?.time;
  });

  return sortedDepartureInfo;
};

export { mergeIntoDepartureInfo, departureInfoToTime };
