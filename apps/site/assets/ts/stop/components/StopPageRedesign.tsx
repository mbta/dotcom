import React, { ReactElement, useEffect, useState } from "react";
import Pill from "./Pill";
import { Mode } from "../../__v3api";
import { uniqueId } from "lodash";

export const BUS = "bus";
export const SUBWAY = "subway";
export const FERRY = "ferry";
export const COMMUTER_RAIL = "commuter_rail";

// TODO replace with real data
const departures: any[] = [
  {
    headsign: "Fields Corner",
    routeNumber: 210,
    mode: "bus"
  },
  {
    headsign: "Columbian Square",
    routeNumber: 226,
    mode: "commuter_rail"
  },
  {
    headsign: "Quincy Center",
    routeNumber: 230,
    mode: "subway"
  },
  {
    headsign: "Montello",
    routeNumber: 230,
    mode: "ferry"
  },
  {
    headsign: "South Shore Plaza",
    routeNumber: 236,
    mode: "bus"
  }
];

const filterDeparturesByMode = (
  departures: any[],
  mode: Mode | "all"
): any[] => {
  if (mode === "all") {
    return departures;
  }
  return departures.filter(d => d.mode === mode);
};

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const [selectedMode, setSelectedMode] = useState<"all" | Mode>("all");
  // TODO replace type with actual data type
  const [filteredDepartures, setFilteredDepartures] = useState<any[]>([]);

  const [hasBusRoutes, setHasBusRoutes] = useState<boolean>(false);
  const [hasCommuterRailRoutes, setHasCommuterRailRoutes] = useState<boolean>(
    false
  );
  const [hasSubwayRoutes, setHasSubwayRoutes] = useState<boolean>(false);
  const [hasFerryRoutes, setHasFerryRoutes] = useState<boolean>(false);

  useEffect(() => {
    setHasBusRoutes(filterDeparturesByMode(departures, BUS).length > 0);
    setHasCommuterRailRoutes(
      filterDeparturesByMode(departures, COMMUTER_RAIL).length > 0
    );
    setHasSubwayRoutes(filterDeparturesByMode(departures, SUBWAY).length > 0);
    setHasFerryRoutes(filterDeparturesByMode(departures, FERRY).length > 0);
  }, [departures]);

  useEffect(() => {
    setFilteredDepartures(filterDeparturesByMode(departures, selectedMode));
  }, [departures, selectedMode]);

  return (
    <article>
      {/* Title Bar Div */}
      <header className="d-flex justify-content-space-between">
        <div>
          <h1>{stopId}</h1>
          {/* ICONS GO HERE */}
        </div>
        <div style={{ marginTop: "3.075rem" }}>
          Zone Information PLACEHOLDER
        </div>
      </header>
      {/* Route and Map Div */}
      <div className="d-flex">
        <div style={{ minWidth: "50%" }}>
          <div>Route schedules & maps / Upcoming Trips PLACEHOLDER</div>
          <div className="d-flex">
            {departures.length > 0 && (
              <Pill
                onClick={() => setSelectedMode("all")}
                selected={selectedMode === "all"}
              >
                All
              </Pill>
            )}
            {hasBusRoutes && (
              <Pill
                onClick={() => setSelectedMode(BUS)}
                selected={selectedMode === BUS}
              >
                Bus
              </Pill>
            )}
            {hasSubwayRoutes && (
              <Pill
                onClick={() => setSelectedMode(SUBWAY)}
                selected={selectedMode === SUBWAY}
              >
                Subway
              </Pill>
            )}
            {hasCommuterRailRoutes && (
              <Pill
                onClick={() => setSelectedMode(COMMUTER_RAIL)}
                selected={selectedMode === COMMUTER_RAIL}
              >
                Commuter Rail
              </Pill>
            )}
            {hasFerryRoutes && (
              <Pill
                onClick={() => setSelectedMode(FERRY)}
                selected={selectedMode === FERRY}
              >
                Ferry
              </Pill>
            )}
          </div>
          <ul style={{ maxHeight: "250px", overflowY: "auto" }}>
            {filteredDepartures.map(departure => (
              <li className="d-flex" key={uniqueId()}>
                <div className="me-8">{departure.routeNumber}</div>
                <div>
                  <div>{departure.headsign}</div>
                  <div className="d-flex">
                    <div>Open Schedule</div>
                    <div>View Realtime Map</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button>Plan your Trip PLACEHOLDER</button>
        </div>
        <div className="hidden-sm-down">
          Map PLACEHOLDER Imageine a pretty map
        </div>
      </div>
      {/* Station Information Div */}
      <footer>
        <div>Station information PLACEHOLDER</div>
        <div>Station Address PLACEHOLDER</div>
        <div>Station Status Blocks PLACEHOLDER</div>
      </footer>
    </article>
  );
};

export default StopPageRedesign;
