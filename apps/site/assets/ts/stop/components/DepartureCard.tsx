import React, { ReactElement, useMemo } from "react";
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
import { RoutePatternWithPolyline } from "../stop-redesign-loader";

const DepartureCard = ({
  alertsForRoute,
  departuresForRoute,
  routePatternsByHeadsign,
  route
}: {
  alertsForRoute: Alert[];
  departuresForRoute: DepartureInfo[];
  routePatternsByHeadsign: Record<string, RoutePatternWithPolyline[]>;
  route: Route;
}): ReactElement<HTMLElement> => {
  const { setRow } = useDepartureRow([route]);
  // sort headsigns to reflect the route pattern's sort_order
  const sortedRoutePatternsByHeadsign = useMemo(
    () =>
      Object.entries(routePatternsByHeadsign).sort((entryA, entryB) => {
        const [orderA, orderB] = [entryA, entryB].map(([, routePatterns]) =>
          Math.min(...routePatterns.map(rp => rp.sort_order))
        );
        return orderA - orderB;
      }),
    [routePatternsByHeadsign]
  );

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
      {sortedRoutePatternsByHeadsign.map(([headsign, routePatterns]) => {
        const { direction_id } = routePatterns[0];
        const onClick = (): void =>
          setRow({
            routeId: route.id,
            directionId: direction_id.toString(),
            headsign
          });

        return (
          <DepartureTimes
            key={headsign}
            alertsForDirection={allAlertsForDirection(
              alertsForRoute,
              direction_id
            )}
            headsign={headsign}
            departures={departuresForRoute.filter(d =>
              departureInfoInRoutePatterns(d, routePatterns)
            )}
            onClick={onClick}
            isCR={isACommuterRailRoute(route)}
          />
        );
      })}
    </li>
  );
};

export default DepartureCard;
