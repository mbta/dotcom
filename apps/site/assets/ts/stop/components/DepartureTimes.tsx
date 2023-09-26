import { groupBy } from "lodash";
import React, { ReactElement, ReactNode } from "react";
import { Alert, DirectionId, Route } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import {
  hasClosure,
  hasDetour,
  hasShuttleService,
  hasSuspension,
  isSuppressiveAlert
} from "../../models/alert";
import Badge from "../../components/Badge";
import { DepartureInfo } from "../../models/departureInfo";
import {
  departuresListFromInfos,
  isAtDestination
} from "../../helpers/departureInfo";
import { breakTextAtSlash } from "../../helpers/text";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";
import useDepartureRow from "../../hooks/useDepartureRow";

const toHighPriorityAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
  if (hasSuspension(alerts) || hasClosure(alerts)) {
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
        hasClosure(alerts) ||
        (hasDetour(alerts) && timeList.length === 0)) &&
        alertBadge && (
          <>
            <div style={{ float: "right" }}>See alternatives</div>
            <br />
            {alertBadgeWrapper(alertClass, alertBadge)}
          </>
        )}
    </div>
  );
};

const getRow = (
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
    return departureTimeRow([], isCR, alerts, alertBadge);
  }

  // informative badges compliment the times being shown
  const informativeAlertBadge = toInformativeAlertBadge(alerts);

  return departureTimeRow(
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
}

const ClickableDepartureRow = ({
  onClick,
  headsignName,
  children
}: {
  onClick: () => void;
  headsignName: string;
  children: ReactNode;
}): ReactElement<HTMLElement> => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => handleReactEnterKeyPress(e, onClick)}
      aria-label={`Open upcoming departures to ${headsignName}`}
      className="departure-card__headsign d-flex justify-content-space-between"
    >
      <div className="departure-card__headsign-name">
        {breakTextAtSlash(headsignName)}
      </div>
      {children}
      <div style={{ marginLeft: "0.5em" }} className="d-flex align-self-center">
        {renderFa("fa-fw", "fa-angle-right")}
      </div>
    </div>
  );
};

const DepartureTimes = ({
  route,
  directionId,
  departuresForDirection,
  alertsForDirection,
  stopName,
  overrideDate
}: DepartureTimesProps): ReactElement<HTMLElement> | null => {
  const { setRow } = useDepartureRow([route]);
  const callback = (headsignText: string) => () =>
    setRow({
      routeId: route.id,
      directionId: `${directionId}`,
      headsign: headsignText
    });
  if (!departuresForDirection.length) {
    // display using route's destination
    const destination = route.direction_destinations[directionId];
    return isAtDestination(stopName, route, directionId) ||
      !destination ? null : (
      <ClickableDepartureRow
        key={`${route.direction_destinations[directionId]}-${route.id}`}
        onClick={callback(destination)}
        headsignName={destination}
      >
        {getRow(departuresForDirection, alertsForDirection, overrideDate)}
      </ClickableDepartureRow>
    );
  }

  const groupedDepartures = groupBy(departuresForDirection, "trip.headsign");

  return (
    <>
      {Object.entries(groupedDepartures).map(([headsign, departures]) => {
        return (
          <ClickableDepartureRow
            key={`${headsign}-${route.id}`}
            onClick={callback(headsign)}
            headsignName={headsign}
          >
            {getRow(departures, alertsForDirection, overrideDate)}
          </ClickableDepartureRow>
        );
      })}
    </>
  );
};

export { DepartureTimes as default };
