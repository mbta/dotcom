import React, { ReactElement, useState } from "react";
import { uniqueId } from "lodash";
import DeparturesFilters from "./DeparturesFilters";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import StopMapRedesign from "./StopMapRedesign";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";

// TODO replace with real data
/* eslint-disable @typescript-eslint/no-explicit-any */
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

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  // TODO replace type with actual data type
  const [filteredDepartures, setFilteredDepartures] = useState<any[]>([]);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const stop = useStop(stopId);
  const routes = useRoutesByStop(stopId);

  // Return loading indicator while waiting on data fetch
  if (!stop || !routes) {
    return <Loading />;
  }

  return (
    <article>
      <StopPageHeaderRedesign stop={stop} routes={routes} />
      {/* Route and Map Div */}
      <div className="container">
        <div className="d-flex">
          <div style={{ minWidth: "50%" }}>
            <h2 className="hidden-sm-down">Route Schedules & Maps</h2>
            <div className="d-flex">
              <DeparturesFilters
                departures={departures}
                onModeChange={setFilteredDepartures}
              />
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
            <button type="button">Plan your Trip PLACEHOLDER</button>
          </div>
          <div className="hidden-sm-down">
            {stop && <StopMapRedesign stop={stop} />}
          </div>
        </div>
        {/* Station Information Div */}
        <footer>
          <StationInformation stop={stop} />
        </footer>
      </div>
      {/* Station Information Div */}
      <h2>{stop?.["station?"] ? "Station Information" : "Stop Information"}</h2>
      <footer>{stop && <StationInformation stop={stop} />}</footer>
    </article>
  );
};

export default StopPageRedesign;
