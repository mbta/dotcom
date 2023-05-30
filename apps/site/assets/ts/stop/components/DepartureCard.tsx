import React, { ReactElement } from "react";
import { groupBy } from "lodash";
import { Alert, DirectionId, Route, Stop } from "../../__v3api";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import { routeBgClass } from "../../helpers/css";
import renderSvg from "../../helpers/render-svg";
import DepartureTimes from "./DepartureTimes";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { allAlertsForDirection } from "../../models/alert";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const DepartureCard = ({
  route,
  stop,
  schedulesForRoute,
  onClick,
  alertsForRoute = []
}: {
  route: Route;
  schedulesForRoute: ScheduleWithTimestamp[];
  stop: Stop;
  onClick: (
    route: Route,
    directionId: DirectionId,
    departures: ScheduleWithTimestamp[] | null | undefined
  ) => void;
  alertsForRoute: Alert[];
}): ReactElement<HTMLElement> => {
  const schedulesByDirection = groupBy(
    schedulesForRoute,
    (sch: ScheduleWithTimestamp) => sch.trip.direction_id
  );

  return (
    <li className="departure-card">
      <a
        className={`departure-card__route ${routeBgClass(route)}`}
        href={`/schedules/${route.id}`}
      >
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
        {routeName(route)}
      </a>
      {/* TODO can we avoid hard coding the direction ids? */}
      <DepartureTimes
        key={`${route.id}-0`}
        route={route}
        stop={stop}
        directionId={0}
        schedulesForDirection={schedulesByDirection[0]}
        onClick={onClick}
        alertsForDirection={allAlertsForDirection(alertsForRoute, 0)}
      />
      <DepartureTimes
        key={`${route.id}-1`}
        route={route}
        stop={stop}
        directionId={1}
        schedulesForDirection={schedulesByDirection[1]}
        onClick={onClick}
        alertsForDirection={allAlertsForDirection(alertsForRoute, 1)}
      />
    </li>
  );
};

export default DepartureCard;
