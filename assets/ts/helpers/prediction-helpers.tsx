import { differenceInSeconds } from "date-fns";
import { PredictionWithTimestamp } from "../models/predictions";
import { ScheduleWithTimestamp } from "../models/schedules";

export const isCancelled = (
  prediction: PredictionWithTimestamp | undefined
): boolean => {
  return !!prediction && prediction.schedule_relationship === "cancelled";
};

export const isSkipped = (
  prediction: PredictionWithTimestamp | undefined
): boolean => {
  return !!prediction && prediction.schedule_relationship === "skipped";
};

// Finds the corresponding schedule to the prediction and compares the times
// If the prediction and schedule are more than 60 seconds apart it is delayed
export const isDelayed = (
  prediction: PredictionWithTimestamp | undefined,
  schedule: ScheduleWithTimestamp | undefined,
  maxDifferenceInSeconds: number = 60
): boolean => {
  return (
    !!schedule &&
    !!prediction &&
    !!prediction.time &&
    // Is the prediction meaningfully after the schedule
    differenceInSeconds(prediction.time, schedule.time) > maxDifferenceInSeconds
  );
};
