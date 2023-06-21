import React, { ReactElement, useLayoutEffect, useRef, useState } from "react";
import { chain, isUndefined, some } from "lodash";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
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
import { useSMDown } from "../../helpers/media-breakpoints-react";
import { Polyline } from "../../leaflet/components/__mapdata";
import { DepartureInfo } from "../../models/departureInfo";

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
    departures: DepartureInfo[] | null | undefined;
  }>({
    departureRoute: null,
    departureDirectionId: null,
    departures: null
  });

  const setDepartureVariables: (
    route: Route,
    directionId: DirectionId,
    departures: DepartureInfo[] | null | undefined
  ) => void = (route, directionId, allDepartures) => {
    setDepartureInfo({
      departureRoute: route,
      departureDirectionId: directionId,
      departures: allDepartures
    });
  };

  const viewSelectedDeparture = !some(
    Object.values(departureInfo),
    isUndefined
  );

  const isSmallBreakpoint = useSMDown();
  const refEl = useRef<HTMLDivElement>(null);

  // prevent scrolling the page when in fullscreen "app" view
  useLayoutEffect(() => {
    if (isSmallBreakpoint && viewSelectedDeparture && refEl.current) {
      disableBodyScroll(refEl.current);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [viewSelectedDeparture, isSmallBreakpoint]);

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

  const shapeForSelection = routesWithPolylines
    .find(route => route.id === departureInfo.departureRoute?.id)
    ?.polylines.find(
      line => line.id === departureInfo.departureSchedules?.[0]?.trip.shape_id
    );

  const vehiclesForSelectedRoute = useVehiclesChannel(
    departureInfo.departureRoute &&
      departureInfo.departureDirectionId !== undefined
      ? {
          routeId: departureInfo.departureRoute.id,
          directionId: departureInfo.departureDirectionId
        }
      : null
  );

  const unsetDepartureInfo = (): void =>
    setDepartureInfo({
      departureRoute: undefined,
      departureDirectionId: undefined,
      departureSchedules: undefined
    });

  const BackToRoutes = (
    <div className="back-to-routes">
      <div
        onClick={unsetDepartureInfo}
        onKeyDown={unsetDepartureInfo}
        aria-label={`Back to all ${stop.name} routes`}
        role="presentation"
      >
        {renderFa("", "fa-angle-left")}
        {`Back to all ${stop.name} routes`}
      </div>
    </div>
  );

  return (
    <div
      className={`stop-routes-and-map ${
        viewSelectedDeparture ? "selected-departure" : ""
      }`}
    >
      {viewSelectedDeparture && BackToRoutes}
      <div className="stop-routes">
        {viewSelectedDeparture ? (
          <div ref={refEl} className="stop-departures">
            <DepartureList
              route={departureInfo.departureRoute!}
              stop={stop}
              schedules={departureInfo.departureSchedules!}
              directionId={departureInfo.departureDirectionId!}
              alerts={alerts}
            />
          </div>
        ) : (
          <StopPageDepartures
            routes={routes}
            stop={stop}
            schedules={schedules}
            onClick={setDepartureVariables}
            alerts={alerts}
          />
        )}
      </div>
      <div
        className={`stop-map ${viewSelectedDeparture ? "" : "hidden-sm-down"}`}
      >
        <StopMapRedesign
          stop={stop}
          lines={
            viewSelectedDeparture && shapeForSelection
              ? [shapeForSelection]
              : defaultPolylines
          }
          vehicles={viewSelectedDeparture ? vehiclesForSelectedRoute : []}
        />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
