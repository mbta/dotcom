import { filter, groupBy, reject, sortBy } from "lodash";
import React, { ReactElement, useState } from "react";
import { Alert, Route } from "../../__v3api";
import DeparturesFilters, { ModeChoice } from "./DeparturesFilters";
import {
  isRailReplacementBus,
  isSubwayRoute,
  modeForRoute
} from "../../models/route";
import DepartureCard from "./DepartureCard";
import { alertsByRoute, isInNextXDays } from "../../models/alert";
import { DepartureInfo } from "../../models/departureInfo";
import { GroupedRoutePatterns } from "../stop-redesign-loader";
import {
  isNoncanonicalAndNoDepartures,
  sortedGroupedRoutePatterns
} from "../../models/route-patterns";
import { departureInfoInRoutePatterns } from "../../helpers/departureInfo";

interface StopPageDeparturesProps {
  routes: Route[];
  departureInfos: DepartureInfo[];
  alerts: Alert[];
  groupedRoutePatterns: GroupedRoutePatterns;
}

// Commuter Rail, then Subway, then Bus
const modeSortFn = ({ type }: Route): number => {
  if (type === 2) {
    return 1;
  }
  if (type in [0, 1]) {
    return 2;
  }
  return type;
};

const StopPageDepartures = ({
  routes,
  departureInfos,
  alerts,
  groupedRoutePatterns
}: StopPageDeparturesProps): ReactElement<HTMLElement> => {
  // default to show all modes.
  const [selectedMode, setSelectedMode] = useState<ModeChoice>("all");
  // Filters our all replacement buses that haven't been remapped in the parent component
  const nonShuttleRoutes = filter(routes, r => !isRailReplacementBus(r));
  const groupedRoutes = groupBy(nonShuttleRoutes, modeForRoute);
  const modesList = Object.keys(groupedRoutes) as ModeChoice[];
  const filteredRoutes =
    selectedMode === "all" ? nonShuttleRoutes : groupedRoutes[selectedMode];
  const currentAlerts = filter(alerts, a => isInNextXDays(a, 0));
  const groupedAlerts = alertsByRoute(currentAlerts);

  return (
    <div className="routes">
      {modesList.length > 1 && (
        <DeparturesFilters
          modesList={modesList}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
      )}
      <ul className="stop-departures list-unstyled">
        {sortBy(filteredRoutes, [modeSortFn, "sort_order"]).map(route => {
          const groupedByHeadsign = groupedRoutePatterns[route.id];
          let sortedRoutePatternsByHeadsign = sortedGroupedRoutePatterns(
            groupedByHeadsign
          );
          const departuresForRoute = departureInfos.filter(
            d => d.route.id === route.id
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
            <DepartureCard
              key={route.id}
              route={route}
              routePatternsByHeadsign={sortedRoutePatternsByHeadsign}
              alertsForRoute={groupedAlerts[route.id] || []}
              departuresForRoute={departuresForRoute}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StopPageDepartures;
