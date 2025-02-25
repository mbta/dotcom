import { reject, uniq } from "lodash";
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

/**
 * Groups departures by headsign.
 * This can either be the stop headsign (if it exists) or the trip headsign (default).
 *
 * @param departures DepartureInfo[]
 * @returns Object.<string, departures[]>
 */
const groupDepartures = (
  departures: DepartureInfo[]
): { [key: string]: DepartureInfo[] } => {
  return departures.reduce((acc, departure) => {
    if (departure && departure.schedule && departure.schedule.stop_headsign) {
      if (!Object.keys(acc).includes(departure.schedule.stop_headsign)) {
        acc[departure.schedule.stop_headsign] = [];
      }

      acc[departure.schedule.stop_headsign].push(departure);
    } else if (departure && departure.trip && departure.trip.headsign) {
      if (!Object.keys(acc).includes(departure.trip.headsign)) {
        acc[departure.trip.headsign] = [];
      }

      acc[departure.trip.headsign].push(departure);
    }

    return acc;
  }, Object());
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
console.log(departuresForRoute);
  const departures = groupDepartures(departuresForRoute);

  // We have to ensure that all route patterns are represented in departures.
  // This is because we use the departures, but want to show all route patterns even if they have no departures.
  Object.keys(routePatternsByHeadsign).forEach(headsign => {
    if (!Object.keys(departures).includes(headsign)) {
      departures[headsign] = [];
    }
  });

  let sortedRoutePatternsByHeadsign = sortedGroupedRoutePatterns(
    routePatternsByHeadsign
  );

  if (isSubwayRoute(route)) {
    // remove certain headsigns based on route pattern and departures
    sortedRoutePatternsByHeadsign = reject(
      sortedRoutePatternsByHeadsign,
      entry => {
        const [, { route_patterns: routePatterns }] = entry;
        const filteredDepartures = departuresForRoute.filter(d =>
          departureInfoInRoutePatterns(d, routePatterns)
        );
        return isNoncanonicalAndNoDepartures(routePatterns, filteredDepartures);
      }
    );
    // don't render a route card if there's no headsigns left to show
    if (sortedRoutePatternsByHeadsign.length === 0) return null;
  }

  const directionIds = uniq(
    sortedRoutePatternsByHeadsign.map(
      ([, { direction_id: directionId }]) => directionId
    )
  );
  const routeHref =
    directionIds.length === 1
      ? `/schedules/${route.id}?schedule_direction[direction_id]=${directionIds[0]}`
      : `/schedules/${route.id}`;

  return (
    <li className="departure-card">
      <a
        className={`departure-card__route ${routeBgClass(route)} notranslate`}
        href={routeHref}
      >
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
        {routeName(route)}
      </a>
      {Object.entries(departures).map(([headsign, departureList]) => {
        // Alerts and direction_id are based on the first departure if there is one.
        let alerts: Alert[] = [];
        let directionId = 0;

        if (departureList.length > 0) {
          directionId = departureList[0].trip.direction_id;

          alerts = allAlertsForDirection(alertsForRoute, directionId);
          // If there is no departure then alerts is empty and the direction_id is based on the route pattern.
        } else {
          directionId = routePatternsByHeadsign[headsign].direction_id;
        }

        const onClick = (): void =>
          setRow({
            routeId: route.id,
            directionId: directionId.toString(),
            headsign
          });

        return (
          <DepartureTimes
            key={headsign}
            alertsForDirection={alerts}
            headsign={headsign}
            departures={departureList}
            onClick={onClick}
            isCR={isACommuterRailRoute(route)}
            isSubway={isSubwayRoute(route)}
            hasService={departureList.length !== 0}
          />
        );
      })}
    </li>
  );
};

export default DepartureCard;
