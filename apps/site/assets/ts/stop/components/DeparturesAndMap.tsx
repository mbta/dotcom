import React, { ReactElement, useState } from "react";
import { chain } from "lodash";
import { DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import StopPageDepartures from "./StopPageDepartures";
import StopMapRedesign from "./StopMapRedesign";
import { RouteWithPolylines } from "../../hooks/useRoute";
import DepartureList from "./DepartureList";
import renderFa from "../../helpers/render-fa";

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
  routesWithPolylines: RouteWithPolylines[];
}

const DeparturesAndMap = ({
  routes,
  stop,
  schedules,
  routesWithPolylines
}: DeparturesAndMapProps): ReactElement<HTMLElement> => {
  const [departureInfo, setDepartureInfo] = useState<{
    departureRoute: Route | null;
    departureDirectionId: DirectionId | null;
    departureSchedules: ScheduleWithTimestamp[] | null | undefined;
  }>({
    departureRoute: null,
    departureDirectionId: null,
    departureSchedules: null
  });

  const setDepartureVariables: (
    route: Route,
    directionId: DirectionId,
    departures: ScheduleWithTimestamp[] | null | undefined
  ) => void = (route, directionId, allDepartures) => {
    setDepartureInfo({
      departureRoute: route,
      departureDirectionId: directionId,
      departureSchedules: allDepartures
    });
  };

  const polylines = chain(routesWithPolylines)
    .orderBy("sort_order", "desc")
    .flatMap("polylines")
    .uniqBy("id")
    .value();

  const viewAllRoutes: () => boolean = () => {
    if (
      !departureInfo.departureRoute &&
      !departureInfo.departureDirectionId &&
      !departureInfo.departureSchedules
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
          <div className="back-to-routes">
            <div
              onClick={() =>
                setDepartureInfo({
                  departureRoute: null,
                  departureDirectionId: null,
                  departureSchedules: null
                })
              }
              onKeyDown={() =>
                setDepartureInfo({
                  departureRoute: null,
                  departureDirectionId: null,
                  departureSchedules: null
                })
              }
              aria-label={`Back to all ${stop.name} routes`}
              role="presentation"
            >
              {renderFa("", "fa-angle-left")}
              {`Back to all ${stop.name} routes`}
            </div>
          </div>
          <div className="placeholder-map">imagine a nap</div>
          <div className="placeholder-departures">
            {`Route ${departureInfo.departureRoute?.id}`}
            {departureInfo.departureDirectionId != null &&
            departureInfo.departureSchedules &&
            departureInfo.departureRoute ? (
              <DepartureList
                route={departureInfo.departureRoute}
                stop={stop}
                schedules={departureInfo.departureSchedules}
                directionId={departureInfo.departureDirectionId}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
      <div>
        <StopMapRedesign stop={stop} lines={polylines} />
      </div>
    </div>
  );
};

export default DeparturesAndMap;