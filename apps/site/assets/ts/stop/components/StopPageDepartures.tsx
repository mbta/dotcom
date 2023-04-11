import { groupBy, sortBy } from "lodash";
import React, { ReactElement, useState } from "react";
import { Route, Stop } from "../../__v3api";
import DeparturesFilters, { ModeChoice } from "./DeparturesFilters";
import { modeForRoute } from "../../models/route";
import DepartureCard from "./DepartureCard";

interface StopPageDeparturesProps {
  routes: Route[];
  stop: Stop;
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
  stop
}: StopPageDeparturesProps): ReactElement<HTMLElement> => {
  // default to show all modes.
  const [selectedMode, setSelectedMode] = useState<ModeChoice>("all");
  const groupedRoutes = groupBy(routes, modeForRoute);
  const modesList = Object.keys(groupedRoutes) as ModeChoice[];
  const filteredRoutes =
    selectedMode === "all" ? routes : groupedRoutes[selectedMode];

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
          <DepartureCard key={route.id} route={route} stop={stop} />
        ))}
      </ul>
    </div>
  );
};

export default StopPageDepartures;
