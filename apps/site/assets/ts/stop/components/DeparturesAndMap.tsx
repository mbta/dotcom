import React, { ReactElement, useState } from "react";
import { chain } from "lodash";
import { Alert, DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import StopPageDepartures from "./StopPageDepartures";
import StopMapRedesign from "./StopMapRedesign";
import { RouteWithPolylines } from "../../hooks/useRoute";
import DepartureList from "./DepartureList";
import renderFa from "../../helpers/render-fa";
import {
  isASilverLineRoute,
  isSubwayRoute,
  isACommuterRailRoute,
} from "../../models/route";
import useVehiclesChannel from "../../hooks/useVehiclesChannel";
import { Polyline } from "../../leaflet/components/__mapdata";

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
  routesWithPolylines: RouteWithPolylines[];
  alerts: Alert[];
}

const DeparturesAndMap = ({
  routes,
  stop,
  schedules,
  routesWithPolylines,
  alerts,
}: DeparturesAndMapProps): ReactElement<HTMLElement> => {
  const [departureInfo, setDepartureInfo] = useState<{
    departureRoute: Route | null;
    departureDirectionId: DirectionId | null;
    departureSchedules: ScheduleWithTimestamp[] | null | undefined;
  }>({
    departureRoute: null,
    departureDirectionId: null,
    departureSchedules: null,
  });

  const setDepartureVariables: (
    route: Route,
    directionId: DirectionId,
    departures: ScheduleWithTimestamp[] | null | undefined
  ) => void = (route, directionId, allDepartures) => {
    setDepartureInfo({
      departureRoute: route,
      departureDirectionId: directionId,
      departureSchedules: allDepartures,
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

  const MapForSelection = () => {
    const vehiclesForSelectedRoute = useVehiclesChannel(
      departureInfo.departureRoute && departureInfo.departureDirectionId != null
        ? {
            routeId: departureInfo.departureRoute.id,
            directionId: departureInfo.departureDirectionId,
          }
        : null
    );
    let lines: Polyline[] = [];
    if (viewAllRoutes()) {
      lines = defaultPolylines;
    } else {
      const selectedRoute:
        | RouteWithPolylines
        | undefined = departureInfo.departureRoute
        ? routesWithPolylines.find(
            (route) => route.id === departureInfo.departureRoute!.id
          )
        : undefined;
      const shapeIdForSelection: string | undefined =
        ((departureInfo.departureSchedules || []).length > 0 &&
          departureInfo.departureSchedules![0].trip.shape_id) ||
        undefined;

      const selectedLine =
        selectedRoute && shapeIdForSelection
          ? selectedRoute.polylines.find(
              (line) => line.id === shapeIdForSelection
            )
          : undefined;

      lines = selectedLine ? [selectedLine] : [];
    }

    return (
      <StopMapRedesign
        stop={stop}
        lines={lines}
        vehicles={vehiclesForSelectedRoute}
      />
    );
  };

  const defaultPolylines = chain(routesWithPolylines)
    .filter(
      (route) =>
        isASilverLineRoute(route) ||
        isSubwayRoute(route) ||
        isACommuterRailRoute(route)
    )
    .orderBy("sort_order", "desc")
    .flatMap("polylines")
    .uniqBy("id")
    .value();

  return (
    <div className="stop-routes-and-map">
      {viewAllRoutes() ? (
        <StopPageDepartures
          routes={routes}
          stop={stop}
          schedules={schedules}
          onClick={setDepartureVariables}
          alerts={alerts}
        />
      ) : (
        <div className="departures-container">
          <div className="back-to-routes">
            <div
              onClick={() =>
                setDepartureInfo({
                  departureRoute: null,
                  departureDirectionId: null,
                  departureSchedules: null,
                })
              }
              onKeyDown={() =>
                setDepartureInfo({
                  departureRoute: null,
                  departureDirectionId: null,
                  departureSchedules: null,
                })
              }
              aria-label={`Back to all ${stop.name} routes`}
              role="presentation"
            >
              {renderFa("", "fa-angle-left")}
              {`Back to all ${stop.name} routes`}
            </div>
          </div>
          <div className="placeholder-map">imagine a map</div>
          <div className="placeholder-departures">
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
        <MapForSelection />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
