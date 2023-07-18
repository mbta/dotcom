import { groupBy, sortBy } from "lodash";
import React, { ReactElement, useState } from "react";
import { Alert, Route } from "../../__v3api";
import DeparturesFilters, { ModeChoice } from "./DeparturesFilters";
import { modeForRoute } from "../../models/route";
import DepartureCard from "./DepartureCard";
import { alertsByRoute } from "../../models/alert";
import { DepartureInfo } from "../../models/departureInfo";
import { DepartureFilterFn } from "./DeparturesAndMap";

interface StopPageDeparturesProps {
  routes: Route[];
  departureInfos: DepartureInfo[];
  onClick: DepartureFilterFn;
  alerts: Alert[];
  stopName: string;
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
  onClick,
  alerts,
  stopName
}: StopPageDeparturesProps): ReactElement<HTMLElement> => {
  // default to show all modes.
  const [selectedMode, setSelectedMode] = useState<ModeChoice>("all");
  const groupedRoutes = groupBy(routes, modeForRoute);
  const groupedDepartures = groupBy(departureInfos, "route.id");
  const modesList = Object.keys(groupedRoutes) as ModeChoice[];
  const filteredRoutes =
    selectedMode === "all" ? routes : groupedRoutes[selectedMode];
  const groupedAlerts = alertsByRoute(alerts);

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
        {sortBy(filteredRoutes, [modeSortFn, "sort_order"]).map(route => (
          <DepartureCard
            key={route.id}
            route={route}
            departuresForRoute={groupedDepartures[route.id]}
            stopName={stopName}
            onClick={onClick}
            // This list should only have one value, is there another way to do this?
            alertsForRoute={groupedAlerts[route.id]}
          />
        ))}
      </ul>
    </div>
  );
};

export default StopPageDepartures;
