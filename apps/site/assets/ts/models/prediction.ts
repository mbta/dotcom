import { Dictionary, groupBy } from "lodash";
import { TripPrediction } from "../schedule/components/__trips";
import { HeadsignWithCrowding, Prediction } from "../__v3api";
import { PredictionWithTimestamp } from "./perdictions";

// eslint-disable-next-line import/prefer-default-export
export const isSkippedOrCancelled = (
  prediction: TripPrediction | null
): boolean =>
  prediction
    ? prediction.schedule_relationship === "skipped" ||
      prediction.schedule_relationship === "cancelled"
    : false;

export const hasPredictionTime = ({
  time_data_with_crowding_list: timeDataList
}: HeadsignWithCrowding): boolean =>
  !!(
    timeDataList &&
    timeDataList[0] &&
    timeDataList[0].time_data &&
    timeDataList[0].time_data.prediction &&
    timeDataList[0].time_data.prediction.time
  );

export const predictionsByHeadsign = <
  T extends Prediction | PredictionWithTimestamp
>(
  predictions: T[] | undefined
): Dictionary<T[]> => {
  return groupBy<T>(predictions, (p: T) => {
    return p.trip!.headsign;
  });
};
