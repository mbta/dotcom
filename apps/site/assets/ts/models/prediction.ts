import { TripPrediction } from "../schedule/components/__trips";

// eslint-disable-next-line import/prefer-default-export
export const isSkippedOrCancelled = (
  prediction: TripPrediction | null
): boolean =>
  prediction
    ? prediction.schedule_relationship === "skipped" ||
      prediction.schedule_relationship === "cancelled"
    : false;
