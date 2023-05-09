import React, { ReactElement } from "react";
import { slice } from "lodash";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { Alert, DirectionId, Route, Stop } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import realtimeIcon from "../../../static/images/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";
import { ScheduleWithTimestamp } from "../../models/schedules";
import {
  getNextUnCancelledDeparture,
  mergeIntoDepartureInfo
} from "../../helpers/departureInfo";
import { DepartureInfo } from "../../models/departureInfo";
import {
  hasDetour,
  hasShuttleService,
  hasSuspension
} from "../../models/alert";
import Badge from "../../components/Badge";
import {
  DisplayTimeConfig,
  infoToDisplayTime
} from "../models/displayTimeConfig";
import { schedulesByHeadsign } from "../../models/schedule";
import { PredictionWithTimestamp } from "../../models/perdictions";

// Returns 2 times from the departureInfo array
// ensuring that upto one returned time is cancelled
const getNextTwoTimes = (
  departureInfos: DepartureInfo[]
): [DepartureInfo | undefined, DepartureInfo | undefined] => {
  const departure1 = departureInfos[0];
  const departure2 = getNextUnCancelledDeparture(slice(departureInfos, 1));

  return [departure1, departure2];
};

const toAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
  if (hasSuspension(alerts)) {
    return <Badge text="Stop Closed" contextText="Route Status" />;
  }

  if (hasShuttleService(alerts)) {
    return <Badge text="Shuttle Service" contextText="Route Status" />;
  }

  if (hasDetour(alerts)) {
    return <Badge text="Detour" contextText="Route Status" />;
  }
  return undefined;
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

const displayFormattedTimes = (
  formattedTimes: DisplayTimeConfig[]
): JSX.Element => {
  return (
    <div className="d-flex justify-content-space-between">
      {formattedTimes.map((time, index) => {
        const classes = departureTimeClasses(time, index);
        return (
          <div className="d-flex" key={`${time.displayString}-departure-times`}>
            {time.isPrediction && (
              <div className="me-4">
                {SVGIcon("c-svg__icon--realtime fs-10", realtimeIcon)}
              </div>
            )}
            <div key={`${time.displayString}-departure-times`} className="me-8">
              <div className={`${classes} u-nowrap`}>{time.displayString}</div>
              <div className="fs-12">
                {/* Prioritize displaying Tomorrow over track name if both are present */}
                {time.isTomorrow && "Tomorrow"}
                {!time.isTomorrow && !!time.trackName && time.trackName}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const departureTimeRow = (
  headsignName: string,
  formattedTimes: DisplayTimeConfig[],
  alertBadge?: JSX.Element
): JSX.Element => {
  return (
    <div
      key={headsignName}
      className="departure-card__headsign d-flex justify-content-space-between"
    >
      <div className="departure-card__headsign-name">{headsignName}</div>
      <div className="d-flex align-items-center">
        {formattedTimes.length > 0 && displayFormattedTimes(formattedTimes)}
        {alertBadge}
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

const getRow = (
  headsign: string,
  schedules: ScheduleWithTimestamp[],
  predictions: PredictionWithTimestamp[],
  alerts: Alert[],
  overrideDate?: Date
): JSX.Element => {
  const alertBadge = toAlertBadge(alerts);
  if (alertBadge) {
    return departureTimeRow(headsign, [], alertBadge);
  }

  // Merging should happen after alert processing incase a route is cancelled
  const departureInfos = mergeIntoDepartureInfo(schedules, predictions);

  const [time1, time2] = getNextTwoTimes(departureInfos);
  const formattedTimes = infoToDisplayTime(time1, time2, overrideDate);

  return departureTimeRow(headsign, formattedTimes);
};

interface DepartureTimesProps {
  route: Route;
  stop: Stop;
  directionId: DirectionId;
  schedulesForDirection: ScheduleWithTimestamp[] | undefined;
  alertsForDirection: Alert[];
  // override date primarily used for testing
  overrideDate?: Date;
  onClick: (
    route: Route,
    directionId: DirectionId,
    departures: ScheduleWithTimestamp[] | null | undefined
  ) => void;
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
  onClick,
  alertsForDirection,
  overrideDate
}: DepartureTimesProps): ReactElement<HTMLElement> => {
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );

  const groupedSchedules = schedulesByHeadsign(schedulesForDirection);
  return (
    <>
      {Object.entries(groupedSchedules).map(([headsign, schedules]) => {
        const predictions = predictionsByHeadsign[headsign] || [];
        return (
          <div
            // TODO remove this class name in favor of test ids
            className="departure-row-click-test"
            key={`${headsign}-${route.id}`}
            onClick={() => onClick(route, directionId, schedules)}
            onKeyDown={() => onClick(route, directionId, schedules)}
            role="presentation"
          >
            {getRow(
              headsign,
              schedules,
              predictions,
              alertsForDirection,
              overrideDate
            )}
          </div>
        );
      })}
    </>
  );
};

export { DepartureTimes as default, infoToDisplayTime, getNextTwoTimes };
