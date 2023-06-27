import React, { ReactElement } from "react";
import { groupBy } from "lodash";
import { Alert, DirectionId, Route } from "../../__v3api";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import { routeBgClass } from "../../helpers/css";
import renderSvg from "../../helpers/render-svg";
import DepartureTimes from "./DepartureTimes";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { allAlertsForDirection } from "../../models/alert";
import { PredictionWithTimestamp } from "../../models/perdictions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const DepartureCard = ({
  route,
  schedulesForRoute,
  predictionsForRoute,
  onClick,
  alertsForRoute = []
}: {
  route: Route;
  schedulesForRoute: ScheduleWithTimestamp[];
  predictionsForRoute: PredictionWithTimestamp[];
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
  const predictionsByDirection = groupBy(
    predictionsForRoute,
    p => p.trip.direction_id
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
        directionId={0}
        schedulesForDirection={schedulesByDirection[0]}
        predictionsForDirection={predictionsByDirection[0]}
        onClick={onClick}
        alertsForDirection={allAlertsForDirection(alertsForRoute, 0)}
      />
      <DepartureTimes
        key={`${route.id}-1`}
        route={route}
        directionId={1}
        schedulesForDirection={schedulesByDirection[1]}
        predictionsForDirection={predictionsByDirection[1]}
        onClick={onClick}
        alertsForDirection={allAlertsForDirection(alertsForRoute, 1)}
      />
    </li>
  );
};

export default DepartureCard;
