import React, { ReactElement } from "react";
import usePredictionsChannel, {
  Prediction
} from "../../hooks/usePredictionsChannel";
import { isACommuterRailRoute } from "../../models/route";
import { DirectionId, Route, Schedule, Stop } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import { formatToBostonTime } from "../../helpers/date";
import { filter, find, groupBy, slice } from "lodash";
import {
  differenceInSeconds,
  isSameDay,
  secondsInDay,
  secondsInHour,
  secondsInMinute
} from "date-fns";
import realtimeIcon from "../../../static/images/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";

interface DepartureTimesProps {
  route: Route;
  stop: Stop;
  directionId: DirectionId;
  schedulesForDirection: Schedule[];
}

// This interface is used to tell the front end
// how to display the ScheduleInfoModel data
interface DisplayTimeConfig {
  isPrediction?: boolean;
  displayString: string;
  trackName?: string | null;
  isTomorrow?: boolean;
  isBolded?: boolean;
  isStikethrough?: boolean;
}

// This interface is used to combine the information from the schedules
// and predictions into one model
interface ScheduleInfoModel {
  time: Date;
  isCancelled?: boolean;
  isDelayed?: boolean;
  track?: string | null;
}

const isCancelled = (prediction: Prediction): boolean => {
  return prediction.schedule_relationship === "cancelled";
};

// Finds the corresponding schedule to the prediction and compares the times
// If the prediction an schedule are more than 60 seconds apart it is delayed
const isDelayed = (
  prediction: Prediction,
  schedules: Schedule[],
  delay: number = 60
): boolean => {
  const schedule = find(
    schedules,
    (sch: Schedule) => sch.trip.id === prediction.trip.id
  );

  return (
    !!schedule &&
    // Is the prediction meaningfully after the schedule
    differenceInSeconds(prediction.time, new Date(schedule.time)) > delay
  );
};

// Assuming there are predictions
// This function will return an array containing at least one predcition.
// It will return 2 predictions if there are more than 2 predictions that are not cancelled,
// If the first prediction is cancelled, the 2nd prediction will not be cancelled
const filterPredictions = (
  predictions: Prediction[]
): Array<Prediction | undefined> => {
  if (predictions.length === 0) {
    return predictions;
  }

  const prediction1 = predictions[0];
  if (isCancelled(prediction1)) {
    const regPrediction = find(predictions, p => !isCancelled(p));
    return [prediction1, regPrediction];
  }

  // The first prediction in this list should not be deplayed or cancelled (as that case is handeled above)
  const regPredictions = filter(predictions, p => !isCancelled(p));
  return slice(regPredictions, 0, 2);
};

// This function returns time info in a consisten format.
// Returns the time from the predictions if they exist
const getNextTwoTimes = (
  schedules: Schedule[],
  predictions: Prediction[]
): [boolean, ScheduleInfoModel | undefined, ScheduleInfoModel | undefined] => {
  // it appears schedules are in chronological order (make sure this is true)
  // slice an array of 2 to safely get undefined if array is smaller than 2
  const [prd1, prd2] = filterPredictions(predictions);
  const [sch1, sch2] = slice(schedules, 0, 2);

  // only predictions can be delayed so return the old time, and the new time
  if (prd1 && isDelayed(prd1, schedules)) {
    const schedule = find(schedules, sch => sch.trip.id === prd1.trip.id);
    return [
      true,
      { time: new Date(schedule!.time), isDelayed: true },
      { time: prd1.time }
    ];
  }

  let time1: ScheduleInfoModel | undefined;
  let time2: ScheduleInfoModel | undefined;
  // Only set to true if first time is a prediction
  let isPrediction = false;
  if (prd1) {
    time1 = {
      time: prd1.time,
      isCancelled: isCancelled(prd1),
      track: prd1.track
    };
    isPrediction = true;
  }

  // Only prd1 should be cancelled, prd2 shouldn't be cancelled
  if (prd2) {
    time2 = {
      time: prd2.time,
      track: prd2.track
    };
  }

  if (!prd1 && sch1) {
    time1 = { time: new Date(sch1.time) };
  }

  if (!prd2 && sch2) {
    time2 = { time: new Date(sch2.time) };
  }

  return [isPrediction, time1, time2];
};

const infoToDisplayTime = (
  time1: ScheduleInfoModel | undefined,
  time2: ScheduleInfoModel | undefined,
  isPrediction: boolean,
  targetDate: Date = new Date()
): DisplayTimeConfig[] => {
  // If there is not input time1 then we couldn't find an un-(cancelled/delayed) schedule or prediction
  if (!time1) {
    return [] as DisplayTimeConfig[];
  }

  const diffInSeconds1 = differenceInSeconds(time1.time, targetDate);
  const diffInSeconds2 = time2
    ? differenceInSeconds(time2.time, targetDate)
    : -1;

  const formatOverride = "h:mm aa";

  if (time2 && (time1.isCancelled || time1.isDelayed)) {
    // State 7
    // State 8
    // If trip1 is cancelled/delayed, then trip2 should not be cancelled/delayed
    // Display trip2 in the first time spot (and its track info in the second)
    return [
      {
        displayString: `${formatToBostonTime(time2.time, formatOverride)}`,
        isBolded: true,
        isPrediction: true
      },
      {
        displayString: `${formatToBostonTime(time1.time, formatOverride)}`,
        isStikethrough: true,
        trackName: time2.track
      }
    ];
  }

  if (diffInSeconds1 <= secondsInMinute) {
    // State 9
    return [
      { displayString: "Arriving", isPrediction: isPrediction, isBolded: true }
    ];
  }

  if (
    diffInSeconds1 < secondsInHour &&
    diffInSeconds1 > secondsInMinute &&
    diffInSeconds2 < secondsInHour &&
    diffInSeconds2 > secondsInMinute
  ) {
    // State 1
    return [
      {
        displayString: `${Math.floor(diffInSeconds1 / secondsInMinute)} min`,
        isPrediction: isPrediction,
        isBolded: true
      },
      { displayString: `${Math.floor(diffInSeconds2 / secondsInMinute)} min` }
    ];
  }

  if (
    diffInSeconds1 < secondsInHour &&
    diffInSeconds1 > secondsInMinute &&
    diffInSeconds2 >= secondsInHour
  ) {
    // State 2
    return [
      {
        displayString: `${Math.floor(diffInSeconds1 / secondsInMinute)} min`,
        isBolded: true,
        isPrediction: isPrediction
      }
    ];
  }

  if (diffInSeconds1 >= secondsInHour && diffInSeconds1 < secondsInDay) {
    // State 3
    // State 4
    // State 5
    // State 6
    return [
      {
        displayString: `${formatToBostonTime(time1.time, formatOverride)}`,
        // If the days are not the same, then one must be tomorrow
        isTomorrow: !isSameDay(time1.time, targetDate),
        isPrediction: isPrediction,
        isBolded: true,
        trackName: time1.track
      }
    ];
  }

  if (diffInSeconds1 >= secondsInDay) {
    // State 11
    return [{ displayString: "No departures within 24 hours" }];
  }

  // Default state is error
  // State 10
  return [{ displayString: "Error retrieving data" }];
};

const toDisplayTime = (
  schedules: Schedule[],
  predictions: Prediction[]
): DisplayTimeConfig[] => {
  // TODO this should be short cutted by alerts
  const [isPrediction, time1, time2] = getNextTwoTimes(schedules, predictions);

  // time 2 should always be after time 1 (TODO maybe sort the inputs?)
  return infoToDisplayTime(time1, time2, isPrediction);
};

const schedulesByHeadsign = (schedules: Schedule[]) => {
  return groupBy(schedules, (sch: Schedule) => {
    return sch.trip.headsign;
  });
};

const departureTimeClasses = (
  time: DisplayTimeConfig,
  index: number
): string => {
  let customClasses = "";
  if (time.isBolded) {
    customClasses += " font-weight-bold ";
  }
  if (time.isStikethrough) {
    // TODO keep original font color
    customClasses += " strikethrough ";
  }
  if (index === 1) {
    // All secondary times should be smaller
    customClasses += " fs-12 pt-4 ";
  }
  return customClasses;
};

const departureTimeRow = (
  headsignName: string,
  formattedTimes: DisplayTimeConfig[]
): JSX.Element => {
  return (
    <div
      key={headsignName}
      className="departure-card__headsign d-flex justify-content-space-between"
    >
      <div className="departure-card__headsign-name">{headsignName}</div>
      <div className="d-flex align-items-center">
        <div className="d-flex justify-content-space-between">
          {formattedTimes.map((time, index) => {
            const classes = departureTimeClasses(time, index);
            return (
              <>
                {time.isPrediction && (
                  <div className="me-8">
                    {SVGIcon("c-svg__icon fs-10", realtimeIcon)}
                  </div>
                )}
                <div key={`${index}-departure-times`} className={`me-8`}>
                  <div className={`${classes} u-nowrap`}>
                    {time.displayString}
                  </div>
                  <div className="fs-12">
                    {/* Prioritize displaying Tomorrow over track name if both are present */}
                    {time.isTomorrow && "Tomorrow"}
                    {!time.isTomorrow && !!time.trackName && time.trackName}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* TODO: Navigate to Realtime Tracking view (whole row should be clickable) */}
        <button
          type="button"
          aria-label={`Open upcoming departures to ${headsignName}`}
        >
          {renderFa("", "fa-angle-right")}
        </button>
      </div>
    </div>
  );
};

/* istanbul ignore next */
/**
 * A proof-of-concept component illustrating a usage of the
 * usePredictionsChannel hook to fetch live predictions for a specific
 * route/stop/direction, sorted by date.
 *
 */
const DepartureTimes = ({
  route,
  stop,
  directionId,
  schedulesForDirection
}: DepartureTimesProps): ReactElement<HTMLElement> => {
  const isCR = isACommuterRailRoute(route);
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );

  const schedules = schedulesByHeadsign(schedulesForDirection);

  return (
    <>
      {Object.entries(schedules).map(([headsign, schs]) => {
        const formattedTimes = toDisplayTime(
          schs,
          predictionsByHeadsign[headsign] ? predictionsByHeadsign[headsign] : []
        );
        return departureTimeRow(headsign, formattedTimes);
      })}
    </>
  );
};

export {
  DepartureTimes as default,
  infoToDisplayTime,
  getNextTwoTimes,
  isDelayed
};
