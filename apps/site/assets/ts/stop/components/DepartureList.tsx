import React, { ReactElement } from "react";
import { concat, filter } from "lodash";
import { Alert, DirectionId, Route, Stop, Trip } from "../../__v3api";
import { DepartureInfo } from "../../models/departureInfo";
import { SUBWAY } from "../../helpers/departureInfo";
import { routeBgClass } from "../../helpers/css";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import renderSvg from "../../helpers/render-svg";
import {
  alertsByRoute,
  alertsByStop,
  allAlertsForDirection,
  hasSuspension,
  isInNextXDays,
  isHighPriorityAlert
} from "../../models/alert";
import Alerts from "../../components/Alerts";
import { getInfoKey } from "../models/displayTimeConfig";
import DisplayTime from "./DisplayTime";
import { isACommuterRailRoute } from "../../models/route";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  departures: DepartureInfo[] | null;
  directionId: DirectionId;
  alerts: Alert[];
  targetDate?: Date | undefined;
}

const displayDeparturesStateMessage = (message: string): JSX.Element => {
  return (
    <div className="c-alert-item--low m-8 d-flex justify-content-center align-items-center pb-40 pt-40">
      {message}
    </div>
  );
};

const DepartureList = ({
  route,
  stop,
  departures,
  directionId,
  alerts,
  targetDate
}: DepartureListProps): ReactElement<HTMLElement> => {
  const tripForSelectedRoutePattern: Trip | undefined = departures?.length
    ? departures[0].trip
    : undefined;
  const isCR = isACommuterRailRoute(route);
  const groupedAlerts = alertsByRoute(alerts);
  const alertsForRoute = groupedAlerts[route.id] || [];

  const routeAlerts = allAlertsForDirection(alertsForRoute, directionId);
  const stopAlerts = alertsByStop(alerts, stop.id);
  const allCurrentAlerts = concat(routeAlerts, stopAlerts).filter(alert => {
    return isHighPriorityAlert(alert) && isInNextXDays(alert, 0);
  });

  // don's show cancelled departures for subway
  const modeSpecificDepartures: DepartureInfo[] = filter(
    departures,
    (d: DepartureInfo) => !(d.isCancelled && d.routeMode === SUBWAY)
  );

  return (
    <>
      <div className="stop-departures departure-list-header">
        <div className={`departure-card__route ${routeBgClass(route)}`}>
          <div>
            {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
            {routeName(route)}
          </div>
          <a
            className="open-schedule"
            href={`../schedules/${route.id}/line?schedule_direction[direction_id]=${directionId}&schedule_direction[variant]=${tripForSelectedRoutePattern?.route_pattern_id}&schedule_finder[direction_id]=${directionId}&schedule_finder[origin]=${stop.id}`}
          >
            View all schedules
          </a>
        </div>
      </div>
      <h2 className="departure-list__sub-header">
        <div className="departure-list__origin-stop-name">{stop.name} to</div>
        <div className="departure-list__headsign">
          {tripForSelectedRoutePattern?.headsign}
        </div>
      </h2>
      {allCurrentAlerts.length ? <Alerts alerts={allCurrentAlerts} /> : null}
      {departures &&
        departures.length === 0 &&
        displayDeparturesStateMessage("No upcoming trips")}
      {!departures && displayDeparturesStateMessage("Updates unavailable")}
      {tripForSelectedRoutePattern && !hasSuspension(allCurrentAlerts) && (
        <ul className="stop-routes__departures list-unstyled">
          {modeSpecificDepartures.map(departure => {
            return (
              <li key={getInfoKey(departure)}>
                <DisplayTime
                  departure={departure}
                  isCR={isCR}
                  targetDate={targetDate}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DepartureList;
