import React, { ReactElement } from "react";
import { filter } from "lodash";
import { Alert, DirectionId, Route, Stop, Trip } from "../../__v3api";
import { DepartureInfo } from "../../models/departureInfo";
import { SUBWAY, departuresListFromInfos } from "../../helpers/departureInfo";
import { routeBgClass } from "../../helpers/css";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import renderSvg from "../../helpers/render-svg";
import { isSuppressiveAlert } from "../../models/alert";
import Alerts from "../../components/Alerts";
import { isACommuterRailRoute, isSubwayRoute } from "../../models/route";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  departures: DepartureInfo[];
  directionId: DirectionId;
  headsign: string;
  alerts: Alert[];
  hasService: boolean;
  targetDate?: Date | undefined;
}

const displayNoUpcomingTrips = (
  message = "No more trips today"
): JSX.Element => {
  return (
    <div className="c-alert-item--low u-m-8 d-flex justify-content-center align-items-center u-pb-40 u-pt-40">
      {message}
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
  hasService,
  targetDate
}: DepartureListProps): ReactElement<HTMLElement> => {
  const isCR = isACommuterRailRoute(route);
  const isSubway = isSubwayRoute(route);

  // don's show cancelled departures for subway
  const modeSpecificDepartures: DepartureInfo[] = filter(
    departures,
    (d: DepartureInfo) => !(d.isCancelled && d.routeMode === SUBWAY)
  );
  const numPredictions = modeSpecificDepartures.filter(d => !!d.prediction)
    .length;
  const alertsShouldSuppressDepartures = alerts.some(alert =>
    isSuppressiveAlert(alert, numPredictions)
  );
  const tripForSelectedRoutePattern: Trip | undefined =
    modeSpecificDepartures[0]?.trip;

  const noTrips =
    modeSpecificDepartures.length === 0 && displayNoUpcomingTrips();
  const noService = !hasService && displayNoUpcomingTrips("No trips today");
  const noServiceOrNoTrips = noService || noTrips;

  return (
    <>
      <div className="stop-departures departure-list-header">
        <div className={`departure-card__route ${routeBgClass(route)}`}>
          <div className="notranslate">
            {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
            {routeName(route)}
          </div>
          <a
            className="open-schedule"
            href={`/schedules/${route.id}/line?schedule_direction[direction_id]=${directionId}&schedule_direction[variant]=${tripForSelectedRoutePattern?.route_pattern_id}&schedule_finder[direction_id]=${directionId}&schedule_finder[origin]=${stop.id}`}
          >
            View all schedules
          </a>
        </div>
      </div>
      <h2 className="departure-list__sub-header">
        <div className="departure-list__origin-stop-name notranslate">
          {stop.name} to
        </div>
        <div className="departure-list__headsign notranslate">{headsign}</div>
      </h2>
      {alerts.length ? <Alerts alerts={alerts} /> : null}
      {noServiceOrNoTrips ||
        (!alertsShouldSuppressDepartures && (
          <ul className="stop-routes__departures list-unstyled">
            {departuresListFromInfos(
              modeSpecificDepartures,
              isCR,
              isSubway,
              targetDate
            )}
          </ul>
        ))}
    </>
  );
};

export default DepartureList;
