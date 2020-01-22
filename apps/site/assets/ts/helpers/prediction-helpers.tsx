import React, { ReactElement } from "react";
import { PredictedOrScheduledTime } from "../__v3api";

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
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { delay, prediction, scheduled_time } = data;
  if (delay >= 5 && prediction) {
    return delayForCommuterRail(data, className);
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  const time = prediction ? prediction.time : scheduled_time;

  return <div className={className}>{time!.join("")}</div>;
};

export const statusForCommuterRail = ({
  delay,
  prediction
}: PredictedOrScheduledTime): string => {
  if (delay >= 5) {
    return `Delayed ${delay} min`;
  }

  if (prediction && prediction.status) {
    return prediction.status;
  }

  return "On time";
};

export const trackForCommuterRail = ({
  prediction
}: PredictedOrScheduledTime): string =>
  prediction && prediction.track ? ` track ${prediction.track}` : "";
