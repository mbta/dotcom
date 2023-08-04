import React, { ReactElement } from "react";
import { filter } from "lodash";
import { Alert, DirectionId, Route, Stop, Trip } from "../../__v3api";
import { DepartureInfo } from "../../models/departureInfo";
import { SUBWAY, departuresListFromInfos } from "../../helpers/departureInfo";
import { routeBgClass } from "../../helpers/css";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import renderSvg from "../../helpers/render-svg";
import { hasShuttleService, hasSuspension } from "../../models/alert";
import Alerts from "../../components/Alerts";
import { isACommuterRailRoute } from "../../models/route";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  departures: DepartureInfo[];
  directionId: DirectionId;
  headsign: string;
  alerts: Alert[];
  targetDate?: Date | undefined;
}

const displayNoUpcomingTrips = (): JSX.Element => {
  return (
    <div className="c-alert-item--low m-8 d-flex justify-content-center align-items-center pb-40 pt-40">
      No upcoming trips today
    </div>
  );
};

const DepartureList = ({
  route,
  stop,
  departures,
  directionId,
  headsign,
  alerts,
  targetDate
}: DepartureListProps): ReactElement<HTMLElement> => {
  const tripForSelectedRoutePattern: Trip | undefined = departures[0]?.trip;
  const isCR = isACommuterRailRoute(route);

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
        <div className="departure-list__headsign">{headsign}</div>
      </h2>
      {alerts.length ? <Alerts alerts={alerts} /> : null}
      {departures.length === 0 && displayNoUpcomingTrips()}
      {tripForSelectedRoutePattern &&
        !hasSuspension(alerts) &&
        !hasShuttleService(alerts) && (
          <ul className="stop-routes__departures list-unstyled">
            {departuresListFromInfos(modeSpecificDepartures, isCR, targetDate)}
          </ul>
        )}
    </>
  );
};

export default DepartureList;
