import { filter, groupBy, sortBy } from "lodash";
import React, { ReactElement, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Alert, Route } from "../../__v3api";
import DeparturesFilters, { ModeChoice } from "./DeparturesFilters";
import { modeForRoute } from "../../models/route";
import DepartureCard from "./DepartureCard";
import { alertsByRoute, isInNextXDays } from "../../models/alert";
import { DepartureInfo } from "../../models/departureInfo";
import {
  GroupedRoutePatterns,
  RoutePatternWithPolyline
} from "../stop-redesign-loader";

interface StopPageDeparturesProps {
  routes: Route[];
  departureInfos: DepartureInfo[];
  alerts: Alert[];
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
  alerts
}: StopPageDeparturesProps): ReactElement<HTMLElement> => {
  // default to show all modes.
  const [selectedMode, setSelectedMode] = useState<ModeChoice>("all");
  const groupedRoutes = groupBy(routes, modeForRoute);
  const modesList = Object.keys(groupedRoutes) as ModeChoice[];
  const filteredRoutes =
    selectedMode === "all" ? routes : groupedRoutes[selectedMode];
  const currentAlerts = filter(alerts, a => isInNextXDays(a, 0));
  const groupedAlerts = alertsByRoute(currentAlerts);
  const groupedRoutePatterns = useLoaderData() as GroupedRoutePatterns;

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
          const groupedByHeadsign: Record<string, RoutePatternWithPolyline[]> =
            groupedRoutePatterns[route.id];
          return (
            <DepartureCard
              key={route.id}
              route={route}
              routePatternsByHeadsign={groupedByHeadsign}
              alertsForRoute={groupedAlerts[route.id] || []}
              departuresForRoute={departureInfos.filter(
                d => d.route.id === route.id
              )}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StopPageDepartures;
