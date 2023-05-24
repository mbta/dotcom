import React, { ReactElement } from "react";
import { concat, groupBy } from "lodash";
import { Alert, DirectionId, Route } from "../../__v3api";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import { routeBgClass } from "../../helpers/css";
import renderSvg from "../../helpers/render-svg";
import DepartureTimes from "./DepartureTimes";
import { ScheduleWithTimestamp } from "../../models/schedules";
import {
  alertsAffectingBothDirections,
  alertsByDirectionId
} from "../../models/alert";
import { PredictionWithTimestamp } from "../../models/perdictions";

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
        alertsForDirection={concat(
          alertsAffectingBothDirectionsArray,
          alertsZeroDirectionArray
        )}
      />
      <DepartureTimes
        key={`${route.id}-1`}
        route={route}
        directionId={1}
        schedulesForDirection={schedulesByDirection[1]}
        predictionsForDirection={predictionsByDirection[1]}
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
