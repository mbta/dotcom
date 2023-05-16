import React, { ReactElement } from "react";
import { concat, groupBy } from "lodash";
import { routeBgClass, busClass } from "../../helpers/css";
import { breakTextAtSlash } from "../../helpers/text";
import { isASilverLineRoute } from "../../models/route";
import { Alert, DirectionId, Route, Stop } from "../../__v3api";
import CRsvg from "../../../static/images/icon-commuter-rail-default.svg";
import Bussvg from "../../../static/images/icon-bus-default.svg";
import SubwaySvg from "../../../static/images/icon-subway-default.svg";
import FerrySvg from "../../../static/images/icon-ferry-default.svg";
import renderSvg from "../../helpers/render-svg";
import DepartureTimes from "./DepartureTimes";
import { ScheduleWithTimestamp } from "../../models/schedules";
import {
  alertsAffectingBothDirections,
  alertsByDirectionId
} from "../../models/alert";

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

  const alertsByDirectionObj = alertsByDirectionId(alertsForRoute);
  const alertsAffectingBothDirectionsArray = alertsAffectingBothDirections(
    alertsForRoute
  );

  const alertsZeroDirectionArray = alertsByDirectionObj[0]
    ? alertsByDirectionObj[0]
    : [];
  const alertsOneDirectionArray = alertsByDirectionObj[1]
    ? alertsByDirectionObj[1]
    : [];

  return (
    <li className="departure-card">
      <a
        className={`departure-card__route ${routeBgClass(route)}`}
        href={`/schedules/${route.id}`}
      >
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)} {routeName}
      </a>
      {/* TODO can we avoid hard coding the direction ids? */}
      <DepartureTimes
        key={`${route.id}-0`}
        route={route}
        stop={stop}
        directionId={0}
        schedulesForDirection={schedulesByDirection[0]}
        onClick={onClick}
        alertsForDirection={concat(
          alertsAffectingBothDirectionsArray,
          alertsZeroDirectionArray
        )}
      />
      <DepartureTimes
        key={`${route.id}-1`}
        route={route}
        stop={stop}
        directionId={1}
        schedulesForDirection={schedulesByDirection[1]}
        onClick={onClick}
        alertsForDirection={concat(
          alertsAffectingBothDirectionsArray,
          alertsOneDirectionArray
        )}
      />
    </li>
  );
};

export default DepartureCard;
