import React, { ReactElement } from "react";
import { Alert, DirectionId, Route } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import realtimeIcon from "../../../static/images/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
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
import { predictionsByHeadsign } from "../../models/prediction";

const toHighPriorityAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
  if (hasSuspension(alerts)) {
    return <Badge text="Stop Closed" contextText="Route Status" />;
  }

  if (hasShuttleService(alerts)) {
    return <Badge text="Shuttle Service" contextText="Route Status" />;
  }

  return undefined;
};

const toInformativeAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
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
  if (time.isStrikethrough) {
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
          <div className="d-flex" key={`${time.reactKey}`}>
            {time.isPrediction && (
              <div className="me-4">
                {SVGIcon("c-svg__icon--realtime fs-10", realtimeIcon)}
              </div>
            )}
            <div className="me-8">
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
  let alertClass = "";
  if (alertBadge && formattedTimes.length > 0) {
    // Informative badges need more padding between them and the time
    alertClass = "pt-4";
  }
  return (
    <div
      key={headsignName}
      className="departure-card__headsign d-flex justify-content-space-between"
    >
      <div className="departure-card__headsign-name">{headsignName}</div>
      <div className="d-flex align-items-center">
        <div>
          {formattedTimes.length > 0 && displayFormattedTimes(formattedTimes)}
          <div className={alertClass} style={{ float: "right" }}>
            {alertBadge}
          </div>
        </div>
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
  // High priority badges override the displaying of times
  const alertBadge = toHighPriorityAlertBadge(alerts);
  if (alertBadge) {
    return departureTimeRow(headsign, [], alertBadge);
  }

  // informative badges compliment the times being shown
  const informativeAlertBadge = toInformativeAlertBadge(alerts);

  // Merging should happen after alert processing incase a route is cancelled
  const departureInfos = mergeIntoDepartureInfo(schedules, predictions);

  const formattedTimes = infoToDisplayTime(departureInfos, overrideDate);

  return departureTimeRow(headsign, formattedTimes, informativeAlertBadge);
};

interface DepartureTimesProps {
  route: Route;
  directionId: DirectionId;
  schedulesForDirection: ScheduleWithTimestamp[] | undefined;
  predictionsForDirection: PredictionWithTimestamp[];
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
  directionId,
  schedulesForDirection,
  predictionsForDirection,
  onClick,
  alertsForDirection,
  overrideDate
}: DepartureTimesProps): ReactElement<HTMLElement> => {
  const groupedSchedules = schedulesByHeadsign(schedulesForDirection);
  const groupedPredictions = predictionsByHeadsign(predictionsForDirection);
  return (
    <>
      {Object.entries(groupedSchedules).map(([headsign, schedules]) => {
        return (
          <div
            key={`${headsign}-${route.id}`}
            onClick={() => onClick(route, directionId, schedules)}
            onKeyDown={() => onClick(route, directionId, schedules)}
            role="presentation"
          >
            {getRow(
              headsign,
              schedules,
              groupedPredictions[headsign],
              alertsForDirection,
              overrideDate
            )}
          </div>
        );
      })}
    </>
  );
};

export { DepartureTimes as default, infoToDisplayTime };
