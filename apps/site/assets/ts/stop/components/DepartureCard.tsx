import React, { ReactElement } from "react";
import { Dictionary, groupBy } from "lodash";
import { routeBgClass, busClass } from "../../helpers/css";
import { breakTextAtSlash } from "../../helpers/text";
import { isASilverLineRoute } from "../../models/route";
import { DirectionId, Route, Stop } from "../../__v3api";
import CRsvg from "../../../static/images/icon-commuter-rail-default.svg";
import Bussvg from "../../../static/images/icon-bus-default.svg";
import SubwaySvg from "../../../static/images/icon-subway-default.svg";
import FerrySvg from "../../../static/images/icon-ferry-default.svg";
import renderSvg from "../../helpers/render-svg";
import DepartureTimes from "./DepartureTimes";
import { ScheduleWithTimestamp } from "../../models/schedules";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routeToModeIcon = (route: Route): any => {
  switch (route.type) {
    case 0:
    case 1:
      return SubwaySvg;

    case 2:
      return CRsvg;

    case 3:
      return Bussvg;

    case 4:
      return FerrySvg;

    default:
      return null;
  }
};

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
    departures: Dictionary<ScheduleWithTimestamp[]> | null | undefined
  ) => void;
}): ReactElement<HTMLElement> => {
  const routeName = (
    <span className={busClass(route)}>
      {isASilverLineRoute(route.id)
        ? `Silver Line ${route.name}`
        : breakTextAtSlash(route.name)}
    </span>
  );
  const schedulesByDirection = groupBy(
    schedulesForRoute,
    (sch: ScheduleWithTimestamp) => sch.trip.direction_id
  );

  return (
    <li className="departure-card">
      <div className={`departure-card__route ${routeBgClass(route)}`}>
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)} {routeName}
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
