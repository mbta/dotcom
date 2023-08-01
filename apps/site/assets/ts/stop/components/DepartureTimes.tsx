import { groupBy } from "lodash";
import React, { ReactElement } from "react";
import { Alert, DirectionId, Route } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import realtimeIcon from "../../../static/images/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";
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
import { DepartureInfo } from "../../models/departureInfo";
import { isAtDestination } from "../../helpers/departureInfo";
import { DepartureFilterFn } from "./DeparturesAndMap";
import { breakTextAtSlash } from "../../helpers/text";

const toHighPriorityAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
  if (hasSuspension(alerts)) {
    return <Badge text="No Service" contextText="Route Status" />;
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

const alertBadgeWrapper = (
  alertClass: string,
  alertBadge: JSX.Element
): JSX.Element => {
  return (
    <div className={alertClass} style={{ float: "right" }}>
      {alertBadge}
    </div>
  );
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
  formattedTimes: DisplayTimeConfig[],
  isCR: Boolean
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
                {!time.isTomorrow &&
                  isCR &&
                  !!time.trackName &&
                  `Track ${time.trackName}`}
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
  isCR: Boolean,
  alerts: Alert[],
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
      <div className="departure-card__headsign-name">
        {breakTextAtSlash(headsignName)}
      </div>
      <div className="d-flex align-items-baseline">
        <div>
          {formattedTimes.length > 0
            ? displayFormattedTimes(formattedTimes, isCR)
            : !alertBadge && <div>No upcoming trips</div>}

          {hasDetour(alerts) &&
            formattedTimes.length > 0 &&
            alertBadgeWrapper(alertClass, alertBadge!)}
          {(hasShuttleService(alerts) ||
            hasSuspension(alerts) ||
            (hasDetour(alerts) && formattedTimes.length === 0)) && (
            <>
              <div style={{ float: "right" }}>See alternatives</div>
              <br />
              {alertBadgeWrapper(alertClass, alertBadge!)}
            </>
          )}
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
  departures: DepartureInfo[],
  alerts: Alert[],
  overrideDate?: Date
): JSX.Element => {
  // High priority badges override the displaying of times
  const alertBadge = toHighPriorityAlertBadge(alerts);
  const isCR = departures[0]
    ? departures[0].routeMode === "commuter_rail"
    : false;
  if (alertBadge) {
    return departureTimeRow(headsign, [], isCR, alerts, alertBadge);
  }

  // informative badges compliment the times being shown
  const informativeAlertBadge = toInformativeAlertBadge(alerts);

  // Merging should happen after alert processing incase a route is cancelled
  const formattedTimes = infoToDisplayTime(departures, overrideDate);

  return departureTimeRow(
    headsign,
    formattedTimes,
    isCR,
    alerts,
    informativeAlertBadge
  );
};

interface DepartureTimesProps {
  route: Route;
  directionId: DirectionId;
  departuresForDirection: DepartureInfo[];
  alertsForDirection: Alert[];
  stopName: string;
  // override date primarily used for testing
  overrideDate?: Date;
  onClick: DepartureFilterFn;
}

const DepartureTimes = ({
  route,
  directionId,
  departuresForDirection,
  onClick,
  alertsForDirection,
  stopName,
  overrideDate
}: DepartureTimesProps): ReactElement<HTMLElement> => {
  const groupedDepartures = groupBy(departuresForDirection, "trip.headsign");
  const destination = route.direction_destinations[directionId];
  return (
    <>
      {Object.keys(groupedDepartures).length > 0 ? (
        <>
          {Object.entries(groupedDepartures).map(([headsign, departures]) => {
            return (
              <div
                key={`${headsign}-${route.id}`}
                onClick={() => onClick({ route, directionId, headsign })}
                onKeyDown={() => onClick({ route, directionId, headsign })}
                role="presentation"
              >
                {getRow(headsign, departures, alertsForDirection, overrideDate)}
              </div>
            );
          })}
        </>
      ) : (
        <div
          key={`${route.direction_destinations[directionId]}-${route.id}`}
          onClick={() =>
            onClick({ route, directionId, headsign: destination! })
          }
          onKeyDown={() =>
            onClick({ route, directionId, headsign: destination! })
          }
          role="presentation"
        >
          {!isAtDestination(stopName, route, directionId) &&
            destination &&
            departureTimeRow(
              destination,
              [],
              route.type === 2,
              alertsForDirection
            )}
        </div>
      )}
    </>
  );
};

export { DepartureTimes as default, infoToDisplayTime };
