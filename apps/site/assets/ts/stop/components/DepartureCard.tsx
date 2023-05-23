import React, { ReactElement } from "react";
import { groupBy } from "lodash";
import { routeBgClass } from "../../helpers/css";
import { DirectionId, Route, Stop } from "../../__v3api";
import renderSvg from "../../helpers/render-svg";
import DepartureTimes from "./DepartureTimes";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const DepartureCard = ({
  route,
  stop,
  schedulesForRoute,
  onClick
}: {
  route: Route;
  schedulesForRoute: ScheduleWithTimestamp[];
  stop: Stop;
  onClick: (
    route: Route,
    directionId: DirectionId,
    departures: ScheduleWithTimestamp[] | null | undefined
  ) => void;
}): ReactElement<HTMLElement> => {
  const schedulesByDirection = groupBy(
    schedulesForRoute,
    (sch: ScheduleWithTimestamp) => sch.trip.direction_id
  );

  return (
    <li className="departure-card">
      <div className={`departure-card__route ${routeBgClass(route)}`}>
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
        {routeName(route)}
      </div>
      {/* TODO can we avoid hard coding the direction ids? */}
      <DepartureTimes
        key={`${route.id}-0`}
        route={route}
        stop={stop}
        directionId={0}
        schedulesForDirection={schedulesByDirection[0]}
        onClick={onClick}
      />
      <DepartureTimes
        key={`${route.id}-1`}
        route={route}
        stop={stop}
        directionId={1}
        schedulesForDirection={schedulesByDirection[1]}
        onClick={onClick}
      />
    </li>
  );
};

export default DepartureCard;
