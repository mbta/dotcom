import React, { ReactElement } from "react";
import { Dictionary, groupBy, slice } from "lodash";
import {
  differenceInSeconds,
  isSameDay,
  secondsInDay,
  secondsInHour,
  secondsInMinute
} from "date-fns";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { DirectionId, Route, Stop } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import { formatToBostonTime } from "../../helpers/date";
import realtimeIcon from "../../../static/images/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { PredictionWithTimestamp } from "../../models/perdictions";
import {
  departureInfoToTime,
  displayInfoContainsPrediction,
  getNextUnCancelledDeparture,
  mergeIntoDepartureInfo
} from "../../helpers/departureInfo";
import { DepartureInfo } from "../../models/departureInfo";

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

// Returns 2 times from the departureInfo array
// ensuring that upto one returned time is cancelled
const getNextTwoTimes = (
  departureInfos: DepartureInfo[]
): [DepartureInfo | undefined, DepartureInfo | undefined] => {
  const departure1 = departureInfos[0];
  const departure2 = getNextUnCancelledDeparture(slice(departureInfos, 1));

  return [departure1, departure2];
};

const infoToDisplayTime = (
  time1: DepartureInfo | undefined,
  time2: DepartureInfo | undefined,
  targetDate: Date = new Date()
): DisplayTimeConfig[] => {
  const defaultState = [{ displayString: "Updates unavailable" }];
  // If there is not input time1 then a schedule or prediction could not be found
  if (!time1) {
    return defaultState;
  }

  const departure1Time = departureInfoToTime(time1);
  const formatOverride = "h:mm aa";

  if (time1.isDelayed) {
    // is delayed can only be true if both a prediction and schedule exist
    const scheduleTime = time1.schedule!.time;
    const predictionTime = time1.prediction!.time;
    return [
      {
        displayString: `${formatToBostonTime(predictionTime, formatOverride)}`,
        isBolded: true,
        // only predictions can be delayed
        isPrediction: true
      },
      {
        displayString: `${formatToBostonTime(scheduleTime, formatOverride)}`,
        isStikethrough: true,
        trackName: time1.prediction!.track
      }
    ];
  }

  if (time2 && time1.isCancelled) {
    const departure2Time = departureInfoToTime(time2);
    // State 7
    // State 8
    // If trip1 is cancelled, then trip2 should not be cancelled
    // Display trip2 in the first time spot (and its track info in the second)
    return [
      {
        displayString: `${formatToBostonTime(departure2Time, formatOverride)}`,
        isBolded: true,
        isPrediction: displayInfoContainsPrediction(time2)
      },
      {
        displayString: `${formatToBostonTime(departure1Time, formatOverride)}`,
        isStikethrough: true,
        trackName: time2.prediction?.track
      }
    ];
  }

  const diffInSeconds1 = differenceInSeconds(departure1Time, targetDate);
  const diffInSeconds2 = time2
    ? differenceInSeconds(departureInfoToTime(time2), targetDate)
    : -1;

  if (diffInSeconds1 <= secondsInMinute) {
    // State 9
    return [
      {
        displayString: "Arriving",
        isPrediction: displayInfoContainsPrediction(time1),
        isBolded: true
      }
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
        isPrediction: displayInfoContainsPrediction(time1),
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
        isPrediction: displayInfoContainsPrediction(time1)
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
        displayString: `${formatToBostonTime(departure1Time, formatOverride)}`,
        // If the days are not the same, then one must be tomorrow
        isTomorrow: !isSameDay(departure1Time, targetDate),
        isPrediction: displayInfoContainsPrediction(time1),
        isBolded: true,
        trackName: time1.prediction?.track
      }
    ];
  }

  if (diffInSeconds1 >= secondsInDay) {
    // State 11
    return [{ displayString: "No upcoming trips" }];
  }

  // Default state is error
  // State 10
  return defaultState;
};

const toDisplayTime = (
  schedules: ScheduleWithTimestamp[],
  predictions: PredictionWithTimestamp[],
  targetDate = new Date()
): DisplayTimeConfig[] => {
  // TODO this should be short cutted by alerts
  const departureInfos = mergeIntoDepartureInfo(schedules, predictions);

  const [time1, time2] = getNextTwoTimes(departureInfos);

  return infoToDisplayTime(time1, time2, targetDate);
};

const schedulesByHeadsign = (
  schedules: ScheduleWithTimestamp[] | undefined
): Dictionary<ScheduleWithTimestamp[]> => {
  return groupBy(schedules, (sch: ScheduleWithTimestamp) => {
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
    customClasses += " fs-14 pt-2 ";
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
                  <div className="me-4">
                    {SVGIcon("c-svg__icon--realtime fs-10", realtimeIcon)}
                  </div>
                )}
                <div
                  key={`${time.displayString}-departure-times`}
                  className="me-8"
                >
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

interface DepartureTimesProps {
  route: Route;
  stop: Stop;
  directionId: DirectionId;
  schedulesForDirection: ScheduleWithTimestamp[] | undefined;
  overrideDate?: Date;
  onClick?: any;
}

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
  schedulesForDirection,
  overrideDate,
  onClick
}: DepartureTimesProps): ReactElement<HTMLElement> => {
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );

  const schedules = schedulesByHeadsign(schedulesForDirection);

  return (
    <div>
      {onClick ? (
        <div
          className="testSample"
          onClick={() => onClick(route, directionId, schedulesForDirection)}
        >
          {Object.entries(schedules).map(([headsign, schs]) => {
            const formattedTimes = toDisplayTime(
              schs,
              predictionsByHeadsign[headsign]
                ? predictionsByHeadsign[headsign]
                : [],
              overrideDate
            );
            return departureTimeRow(headsign, formattedTimes);
          })}
        </div>
      ) : (
        <div>
          {Object.entries(schedules).map(([headsign, schs]) => {
            const formattedTimes = toDisplayTime(
              schs,
              predictionsByHeadsign[headsign]
                ? predictionsByHeadsign[headsign]
                : [],
              overrideDate
            );
            return departureTimeRow(headsign, formattedTimes);
          })}
        </div>
      )}
    </div>
  );
};

export { DepartureTimes as default, infoToDisplayTime, getNextTwoTimes };
