import { TripPrediction } from "../schedule/components/__trips";
import { HeadsignWithTimeData } from "../__v3api";

export const hasPredictionTime = ({
  predicted_time
}: HeadsignWithTimeData): boolean => !!predicted_time;

export const isSkippedOrCancelled = (
  prediction: TripPrediction | null
): boolean =>
  prediction
    ? prediction.schedule_relationship === "skipped" ||
      prediction.schedule_relationship === "cancelled"
    : false;
