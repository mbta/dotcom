import React, { ReactElement } from "react";
import { Alert, Route } from "../../__v3api";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import { routeBgClass } from "../../helpers/css";
import renderSvg from "../../helpers/render-svg";
import useDepartureRow from "../../hooks/useDepartureRow";
import { DepartureInfo } from "../../models/departureInfo";
import { allAlertsForDirection } from "../../models/alert";
import { departureInfoInRoutePatterns } from "../../helpers/departureInfo";
import { isACommuterRailRoute } from "../../models/route";
import DepartureTimes from "./DepartureTimes";
import { RoutePatternGroupEntries } from "../../models/route-patterns";

const DepartureCard = ({
  alertsForRoute,
  departuresForRoute,
  routePatternsByHeadsign,
  route
}: {
  alertsForRoute: Alert[];
  departuresForRoute: DepartureInfo[];
  routePatternsByHeadsign: RoutePatternGroupEntries;
  route: Route;
}): ReactElement<HTMLElement> => {
  const { setRow } = useDepartureRow([route]);

  return (
    <li className="departure-card">
      <a
        className={`departure-card__route ${routeBgClass(route)}`}
        href={`/schedules/${route.id}`}
        data-turbolinks="false"
      >
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
        {routeName(route)}
      </a>
      {routePatternsByHeadsign.map(
        ([
          headsign,
          { direction_id: directionId, route_patterns: routePatterns }
        ]) => {
          const onClick = (): void =>
            setRow({
              routeId: route.id,
              directionId: directionId.toString(),
              headsign
            });

          return (
            <DepartureTimes
              key={headsign}
              alertsForDirection={allAlertsForDirection(
                alertsForRoute,
                directionId
              )}
              headsign={headsign}
              departures={departuresForRoute.filter(d =>
                departureInfoInRoutePatterns(d, routePatterns)
              )}
              onClick={onClick}
              isCR={isACommuterRailRoute(route)}
              hasService={routePatterns.length !== 0}
            />
          );
        }
      )}
    </li>
  );
};

export default DepartureCard;
