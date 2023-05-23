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
  isACommuterRailRoute
} from "../../models/route";
import useVehiclesChannel from "../../hooks/useVehiclesChannel";

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
  alerts
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

  const defaultPolylines = chain(routesWithPolylines)
    .filter(
      route =>
        isASilverLineRoute(route) ||
        isSubwayRoute(route) ||
        isACommuterRailRoute(route)
    )
    .orderBy("sort_order", "desc")
    .flatMap("polylines")
    .uniqBy("id")
    .value();

  const DefaultRoutesMap = (): JSX.Element => {
    return (
      <StopMapRedesign stop={stop} lines={defaultPolylines} vehicles={[]} />
    );
  };

  const SelectedRoutePatternMap = (): JSX.Element => {
    const vehiclesForSelectedRoute = useVehiclesChannel(
      departureInfo.departureRoute && departureInfo.departureDirectionId != null
        ? {
            routeId: departureInfo.departureRoute.id,
            directionId: departureInfo.departureDirectionId
          }
        : null
    );

    const selectedRoute:
      | RouteWithPolylines
      | undefined = departureInfo.departureRoute
      ? routesWithPolylines.find(
          route => route.id === departureInfo.departureRoute!.id
        )
      : undefined;
    const shapeIdForSelection: string | undefined =
      ((departureInfo.departureSchedules || []).length > 0 &&
        departureInfo.departureSchedules![0].trip.shape_id) ||
      undefined;

    const selectedLine =
      selectedRoute && shapeIdForSelection
        ? selectedRoute.polylines.find(line => line.id === shapeIdForSelection)
        : undefined;

    return (
      <StopMapRedesign
        stop={stop}
        lines={selectedLine ? [selectedLine] : []}
        vehicles={vehiclesForSelectedRoute}
      />
    );
  };

  return (
    <div className="stop-routes-and-map">
      {viewAllRoutes() ? (
        <div className="stop-routes__all">
          <StopPageDepartures
            routes={routes}
            stop={stop}
            schedules={schedules}
            onClick={setDepartureVariables}
            alerts={alerts}
          />
          <div className="hidden-sm-down">
            <DefaultRoutesMap />
          </div>
        </div>
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
          <div className="stop-routes__map stop-routes__map--selected-route">
            <SelectedRoutePatternMap />
          </div>
          <div className="stop-routes__departures stop-routes__departures--selected-route">
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
    </div>
  );
};

export default DeparturesAndMap;
