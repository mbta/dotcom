import { groupBy } from "lodash";
import React, { ReactElement, useState } from "react";
import { Route } from "../../__v3api";
import DeparturesFilters, { ModeChoice } from "./DeparturesFilters";
import { modeForRoute } from "../../models/route";
import DepartureCard from "./DepartureCard";

interface StopPageDeparturesProps {
  routes: Route[];
}

const StopPageDepartures = ({
  routes
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
        <div className="d-flex">
          <DeparturesFilters
            modesList={modesList}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />
        </div>
      )}
      <ul className="stop-departures list-unstyled">
        {filteredRoutes.map(route => (
          <DepartureCard key={route.id} route={route} />
        ))}
      </ul>
    </div>
  );
};

export default StopPageDepartures;
