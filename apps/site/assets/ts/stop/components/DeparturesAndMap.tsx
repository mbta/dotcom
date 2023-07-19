import React, { ReactElement, useLayoutEffect, useRef, useState } from "react";
import { chain, isNull, some } from "lodash";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { Alert, DirectionId, Route, Stop } from "../../__v3api";
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
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { useSchedulesByStop } from "../../hooks/useSchedules";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  routesWithPolylines: RouteWithPolylines[];
  alerts: Alert[];
}

const DeparturesAndMap = ({
  routes,
  stop,
  routesWithPolylines,
  alerts
}: DeparturesAndMapProps): ReactElement<HTMLElement> => {
  const { data: schedules } = useSchedulesByStop(stop.id);
  const predictions = usePredictionsChannel({ stopId: stop.id });
  const departureInfos = mergeIntoDepartureInfo(schedules || [], predictions);
  const [departureFilters, setDepartureFilters] = useState<{
    departureRoute: Route | null;
    departureDirectionId: DirectionId | null;
  }>({
    departureRoute: null,
    departureDirectionId: null
  });

  const setDepartureVariables: (
    route: Route,
    directionId: DirectionId
  ) => void = (route, directionId) => {
    setDepartureFilters({
      departureRoute: route,
      departureDirectionId: directionId
    });
  };

  const viewSelectedDeparture = !some(Object.values(departureFilters), isNull);
  // filter by chosen route and direction
  const filteredDepartures = viewSelectedDeparture
    ? departureInfos.filter(departure => {
        const { route, trip } = departure;
        return (
          route.id === departureFilters.departureRoute!.id &&
          trip.direction_id === departureFilters.departureDirectionId
        );
      })
    : departureInfos;

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

  /** TODO: Filter by selected trip. Blocked by being unable to match
   * schedule/prediction shape IDs with route canonical shape IDs */
  const shapeForSelection = routesWithPolylines.find(
    route => route.id === departureFilters.departureRoute?.id
  )?.polylines;

  const vehiclesForSelectedRoute = useVehiclesChannel(
    departureFilters.departureRoute &&
      departureFilters.departureDirectionId &&
      departureFilters.departureDirectionId in [0, 1]
      ? {
          routeId: departureFilters.departureRoute.id,
          directionId: departureFilters.departureDirectionId
        }
      : null
  );

  const unsetDepartureInfo = (): void =>
    setDepartureFilters({
      departureRoute: null,
      departureDirectionId: null
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
              route={departureFilters.departureRoute!}
              stop={stop}
              departures={viewSelectedDeparture ? filteredDepartures : null}
              directionId={departureFilters.departureDirectionId!}
              alerts={alerts}
            />
          </div>
        ) : (
          <StopPageDepartures
            routes={routes}
            departureInfos={departureInfos}
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
              ? shapeForSelection
              : defaultPolylines
          }
          vehicles={viewSelectedDeparture ? vehiclesForSelectedRoute : []}
        />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
