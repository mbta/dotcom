import { groupBy } from "lodash";
import React, { ReactElement } from "react";
import { Alert, DirectionId, Route } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import {
  hasDetour,
  hasShuttleService,
  hasSuspension,
  isSuppressiveAlert
} from "../../models/alert";
import Badge from "../../components/Badge";
import { DepartureInfo } from "../../models/departureInfo";
import {
  departuresListFromInfos,
  isAtDestination,
  stopHasHeadsignTrips
} from "../../helpers/departureInfo";
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
    <div
      className={alertClass}
      style={{ float: "right", whiteSpace: "nowrap", marginTop: "0.25rem" }}
    >
      {alertBadge}
    </div>
  );
};

const departureTimeRow = (
  headsignName: string,
  departures: DepartureInfo[],
  isCR: boolean,
  alerts: Alert[],
  alertBadge?: JSX.Element,
  targetDate?: Date
): JSX.Element => {
  let alertClass = "departure-card__alert";
  if (alertBadge && departures.length > 0) {
    // Informative badges need more padding between them and the time
    alertClass += " pt-4";
  }

  const timeList = departuresListFromInfos(
    departures,
    isCR,
    targetDate,
    isCR ? 1 : 2,
    true,
    ({ children }) => (
      <div className="stop-routes__departures-group">{children}</div>
    )
  );
  return (
    <div
      key={headsignName}
      className="departure-card__headsign d-flex justify-content-space-between"
    >
      <div className="departure-card__headsign-name">
        {breakTextAtSlash(headsignName)}
      </div>
      <div className="departure-card__content">
        {timeList.length > 0 ? (
          <div className="departure-card__times">{timeList}</div>
        ) : (
          !alertBadge && <div>No upcoming trips</div>
        )}

        {hasDetour(alerts) &&
          timeList.length > 0 &&
          alertBadgeWrapper(alertClass, alertBadge!)}
        {(hasShuttleService(alerts) ||
          hasSuspension(alerts) ||
          (hasDetour(alerts) && timeList.length === 0)) &&
          alertBadge && (
            <>
              <div style={{ float: "right" }}>See alternatives</div>
              <br />
              {alertBadgeWrapper(alertClass, alertBadge)}
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
  );
};

const getRow = (
  headsign: string,
  departures: DepartureInfo[],
  alerts: Alert[],
  overrideDate?: Date
): JSX.Element => {
  // High priority badges might override the displaying of times
  const numPredictions = departures.filter(d => !!d.prediction).length;
  const suppressiveAlerts = alerts.filter(alert =>
    isSuppressiveAlert(alert, numPredictions)
  );
  const alertBadge = toHighPriorityAlertBadge(suppressiveAlerts);
  const isCR = departures[0]
    ? departures[0].routeMode === "commuter_rail"
    : false;
  if (alertBadge) {
    return departureTimeRow(headsign, [], isCR, alerts, alertBadge);
  }

  // informative badges compliment the times being shown
  const informativeAlertBadge = toInformativeAlertBadge(alerts);

  return departureTimeRow(
    headsign,
    departures,
    isCR,
    alerts,
    informativeAlertBadge,
    overrideDate
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
  console.log(groupedDepartures);
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
            (!stopHasHeadsignTrips(groupedDepartures) && alertsForDirection.length > 0) &&
            getRow(destination, [], alertsForDirection, overrideDate)}
        </div>
      )}
    </>
  );
};

export { DepartureTimes as default };
