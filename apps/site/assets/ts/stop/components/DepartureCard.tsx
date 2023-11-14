import { reject } from "lodash";
import React, { ReactElement } from "react";
import { Alert, Route } from "../../__v3api";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import { routeBgClass } from "../../helpers/css";
import renderSvg from "../../helpers/render-svg";
import useDepartureRow from "../../hooks/useDepartureRow";
import { DepartureInfo } from "../../models/departureInfo";
import { allAlertsForDirection } from "../../models/alert";
import { departureInfoInRoutePatterns } from "../../helpers/departureInfo";
import { isACommuterRailRoute, isSubwayRoute } from "../../models/route";
import DepartureTimes from "./DepartureTimes";
import {
  RoutePatternGroup,
  RoutePatternWithPolyline,
  sortedGroupedRoutePatterns
} from "../../models/route-patterns";

const isNoncanonicalAndNoDepartures = (
  routePatterns: RoutePatternWithPolyline[],
  departures: DepartureInfo[]
): boolean => {
  const isNonCanonical = !routePatterns.find(rp => !!rp.canonical);
  return isNonCanonical && departures.length === 0;
};

const DepartureCard = ({
  alertsForRoute,
  departuresForRoute,
  routePatternsByHeadsign,
  route
}: {
  alertsForRoute: Alert[];
  departuresForRoute: DepartureInfo[];
  routePatternsByHeadsign: RoutePatternGroup;
  route: Route;
}): ReactElement<HTMLElement> | null => {
  const { setRow } = useDepartureRow([route]);

  let sortedRoutePatternsByHeadsign = sortedGroupedRoutePatterns(
    routePatternsByHeadsign
  );

  if (isSubwayRoute(route)) {
    // remove certain headsigns based on route pattern and departures
    sortedRoutePatternsByHeadsign = reject(
      sortedRoutePatternsByHeadsign,
      entry => {
        const [, { route_patterns: routePatterns }] = entry;
        const departures = departuresForRoute.filter(d =>
          departureInfoInRoutePatterns(d, routePatterns)
        );
        return isNoncanonicalAndNoDepartures(routePatterns, departures);
      }
    );
    // don't render a route card if there's no headsigns left to show
    if (sortedRoutePatternsByHeadsign.length === 0) return null;
  }

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
      {sortedRoutePatternsByHeadsign.map(
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
