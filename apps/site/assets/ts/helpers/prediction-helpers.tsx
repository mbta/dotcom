import React, { ReactElement } from "react";
import { PredictedOrScheduledTime } from "../__v3api";
import { isSkippedOrCancelled } from "../models/prediction";
import { TripPrediction } from "../schedule/components/__trips";
import { compareStringTimes } from "./date";
import { PredictionWithTimestamp } from "../models/perdictions";
import { ScheduleWithTimestamp } from "../models/schedules";
import { differenceInSeconds } from "date-fns";

const delayForCommuterRail = (
  data: PredictedOrScheduledTime,
  className = ""
): ReactElement<HTMLElement> => (
  <>
    <div className={`${className ? `${className}--delayed` : ""}`}>
      {data.scheduled_time!.join("")}
    </div>
    <div className={className}>
      {data.prediction && data.prediction.time.join("")}
    </div>
  </>
);

export const timeForCommuterRail = (
  data: PredictedOrScheduledTime,
  className = ""
): ReactElement<HTMLElement> => {
  const { delay, prediction, scheduled_time: scheduledTime } = data;

  if (delay >= 5 && prediction) {
    return delayForCommuterRail(data, className);
  }

  let time = prediction ? prediction.time : scheduledTime;

  // when 'On time', show the scheduled time only if it's later than the predicted time:
  if (
    scheduledTime &&
    prediction &&
    prediction.time[2] !== "min" &&
    compareStringTimes(prediction.time, scheduledTime) === "lt"
  ) {
    // "On time"
    time = scheduledTime;
  }

  return <div className={className}>{time!.join("")}</div>;
};

export const statusForCommuterRail = ({
  delay,
  scheduled_time: scheduledTime,
  prediction
}: PredictedOrScheduledTime): string | null => {
  // If there is a human-entered status string, prioritize that
  if (prediction && prediction.status) return prediction.status;

  if (isSkippedOrCancelled((prediction as unknown) as TripPrediction))
    return "Canceled";

  // Indicate "Delayed" if train is delayed 5+ minutes
  if (delay >= 5) return `Delayed ${delay} min`;

  // Indicate "On time" if train otherwise has a prediction
  // Indicate "Scheduled" if train is not "Delayed" and we have a scheduled time
  // (even if there is no real-time prediction)
  if (scheduledTime && prediction) return "On time";
  if (scheduledTime) return "Scheduled";

  // We have just a prediction with no scheduled time, so we can't say whether
  // the train is on time, delayed, etc.
  return null;
};

export const trackForCommuterRail = ({
  prediction
}: PredictedOrScheduledTime): string =>
  prediction && prediction.track ? ` track ${prediction.track}` : "";

export const isCancelled = (
  prediction: PredictionWithTimestamp | undefined
): boolean => {
  return !!prediction && prediction.schedule_relationship === "cancelled";
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
    // Is the prediction meaningfully after the schedule
    differenceInSeconds(prediction.time, schedule.time) > maxDifferenceInSeconds
  );
};
