import { groupBy } from "lodash";
import React, { ReactElement, useState } from "react";
import renderFa from "../../helpers/render-fa";
import { Route } from "../../__v3api";
import { modeForRoute, isASilverLineRoute } from "../../models/route";
import { busClass, routeBgClass } from "../../helpers/css";
import { breakTextAtSlash } from "../../helpers/text";
import DeparturesFilters, { ModeChoice } from "./DeparturesFilters";

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
      <ul
        className="list-unstyled"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        {filteredRoutes.map(route => (
          <li key={route.id}>
            <div
              className={`c-link-block h3 m-tnm-sidebar__route-name ${routeBgClass(
                route
              )}`}
            >
              <div className="c-link-block__inner">
                <span className={busClass(route)}>
                  {isASilverLineRoute(route.id)
                    ? `Silver Line ${route.name}`
                    : breakTextAtSlash(route.name)}
                </span>
              </div>
            </div>
            {Object.entries(route.direction_destinations).map(
              ([direction_id, headsign]) => (
                <div
                  key={`${route.id}-${direction_id}-${headsign}`}
                  className="d-flex justify-content-space-between mb-05"
                  style={{ border: "1px solid whitesmoke", padding: "1rem" }}
                >
                  <div>
                    <div className="fs-18">{headsign}</div>
                    [Times here]
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    aria-label={`Open upcoming departures to ${headsign}`}
                  >
                    {renderFa("", "fa-chevron-right")}
                  </button>
                </div>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopPageDepartures;
