import React, { ReactElement, useState } from "react";
import { DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import StopPageDepartures from "./StopPageDepartures";
import { Polyline } from "leaflet";
import StopMapRedesign from "./StopMapRedesign";
import { useRoutesByStop } from "../../hooks/useRoute";
import { chain } from "lodash";

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
  lines: Polyline[];
}

const DeparturesAndMap = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  routes,
  stop,
  schedules,
  lines
}: /* eslint-enable @typescript-eslint/no-unused-vars */
DeparturesAndMapProps): ReactElement<HTMLElement> => {
  const [departureInfo, setDepartureInfo] = useState<any | any | any>({
    departureRoute: null,
    departureDirectionId: null,
    departureSchedules: null
  });

  const routesWithPolylines = useRoutesByStop(stop.id);

  const polylines = chain(routesWithPolylines)
    .orderBy("sort_order", "desc")
    .flatMap("polylines")
    .uniqBy("id")
    .value();

  const setDepartureVariables: (
    route: Route,
    directionId: DirectionId,
    schedules: ScheduleWithTimestamp
  ) => void = (route, directionId, schedules) => {
    setDepartureInfo({
      departureRoute: route,
      departureDirectionId: directionId,
      departureSchedules: schedules
    });
  };
  const clearDepartureVariables: () => void = () => {
    setDepartureInfo({
      departureRoute: null,
      departureDirectionId: null,
      departureSchedules: null
    });
  };

  const viewAllRoutes: () => boolean = () => {
    if (
      [
        departureInfo.departureRoute,
        departureInfo.departureDirectionId,
        departureInfo.departureSchedules
      ].includes(null)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="stop-routes-and-map">
      {viewAllRoutes() ? (
        <StopPageDepartures
          routes={routes}
          stop={stop}
          schedules={schedules}
          onClick={setDepartureVariables}
        />
      ) : (
        <div className="departures-container">
          <button onClick={clearDepartureVariables}>
            {" "}
            Back to all {stop.name}
          </button>
          <div className="placeholder-map">imagine a nap</div>
          <div className="placeholder-departures">
            {"Route " + departureInfo.departureRoute.id}
          </div>
        </div>
      )}
      <div className="">
        <StopMapRedesign stop={stop} lines={polylines} />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
