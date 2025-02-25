import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { cloneDeep, concat, filter, orderBy, uniqBy } from "lodash";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useLoaderData } from "react-router-dom";
import { Alert, Route, Stop } from "../../__v3api";
import StopPageDepartures from "./StopPageDepartures";
import StopMap from "./StopMap";
import DepartureList from "./DepartureList";
import renderFa from "../../helpers/render-fa";
import {
  isASilverLineRoute,
  isSubwayRoute,
  isACommuterRailRoute,
  isRailReplacementBus,
  isRapidTransit
} from "../../models/route";
import { useSMDown } from "../../helpers/media-breakpoints-react";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { useSchedulesByStop } from "../../hooks/useSchedules";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import {
  alertsForRoute,
  alertsForStopAndRoute,
  isUpcomingOrCurrentLifecycle,
  routeWideAlerts
} from "../../models/alert";
import useDepartureRow from "../../hooks/useDepartureRow";
import { DepartureInfo } from "../../models/departureInfo";
import { GroupedRoutePatterns } from "../../models/route-patterns";

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  alerts: Alert[];
  setPredictionError: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RouteIdReplacementMap {
  [key: string]: Route;
}

// map replacement routes to the routes they replace
const mapRouteIds = (routes: Route[]): RouteIdReplacementMap => {
  const railReplacementRoutes = filter(routes, r => isRailReplacementBus(r));
  // We don't want to display the shuttle information on subway cards so don't map the subway routes
  const regularRoutesSansSubway = filter(
    routes,
    r => !isRailReplacementBus(r) && !isRapidTransit(r)
  );

  const routeIdMap: RouteIdReplacementMap = {};
  railReplacementRoutes.forEach(r => {
    regularRoutesSansSubway.forEach(rr => {
      if (r.line_id === rr.line_id) {
        routeIdMap[r.id] = rr;
      }
    });
  });

  return routeIdMap;
};

const updateDepartureInfos = (
  departureInfos: DepartureInfo[],
  routeIdMap: RouteIdReplacementMap
): DepartureInfo[] => {
  return departureInfos.map(di => {
    let updatedRoute = di.route;
    if (routeIdMap[di.route.id]) {
      updatedRoute = routeIdMap[di.route.id];
    }
    return {
      ...di,
      route: updatedRoute
    };
  });
};

// Maps a route pattern from one route to a different route based off the routeIdMap
// Used to map shuttles to train routes, as to display the same info on the card
const updateRoutePatterns = (
  groupedRoutePatterns: GroupedRoutePatterns,
  routeIdMap: { [key: string]: Route }
): GroupedRoutePatterns => {
  const updatedPatterns = cloneDeep(groupedRoutePatterns);
  Object.keys(groupedRoutePatterns).forEach(key => {
    if (routeIdMap[key]) {
      const routeIdToUpdate = routeIdMap[key].id;

      updatedPatterns[routeIdToUpdate] = {
        ...updatedPatterns[routeIdToUpdate],
        ...updatedPatterns[key]
      };
      // remove the route from the list (we don't want it displayed)
      delete updatedPatterns[key];
    }
  });
  return updatedPatterns;
};

const DeparturesAndMap = ({
  routes,
  stop,
  alerts,
  setPredictionError
}: DeparturesAndMapProps): ReactElement<HTMLElement> => {
  const { data: schedules } = useSchedulesByStop(stop.id);
  const predictions = usePredictionsChannel({ stopId: stop.id });
  const departureInfos = mergeIntoDepartureInfo(
    schedules || [],
    predictions || []
  );
  useEffect(() => {
    setPredictionError(predictions === null);
  }, [setPredictionError, predictions]);
  const [realtimeAlerts, setRealtimeAlerts] = useState<Alert[]>([]);

  const mappedRouteIds = mapRouteIds(routes);
  const updatedDepartureInfos = updateDepartureInfos(
    departureInfos,
    mappedRouteIds
  );

  const { activeRow, resetRow } = useDepartureRow(routes);
  useEffect(() => {
    if (activeRow && activeRow.route) {
      // grab all the alerts that are current or upcoming
      const currentAndUpcomingAlerts = filter(alerts, a =>
        isUpcomingOrCurrentLifecycle(a)
      );
      // There are the alerts that affect a whole route and not a stop
      const routeWideAlertsArray = routeWideAlerts(currentAndUpcomingAlerts);
      // filter all the route wide alerts to the selected route
      const alertsForSelectedRoute = alertsForRoute(
        routeWideAlertsArray,
        activeRow.route.id
      );
      // all the alerts that affect this stop on the route
      const alertsForStop = alertsForStopAndRoute(
        currentAndUpcomingAlerts,
        stop.id,
        activeRow.route.id
      );
      // combine route wide, and route stop alerts into a single list for the real time page
      setRealtimeAlerts(concat(alertsForStop, alertsForSelectedRoute));
    } else {
      setRealtimeAlerts([]);
    }
  }, [activeRow, alerts, stop]);

  // filter by chosen route and direction
  const filteredDepartures = activeRow
    ? updatedDepartureInfos.filter(departure => {
        const { route, schedule, trip } = departure;
        return (
          route.id === activeRow.route.id &&
          trip.direction_id === activeRow.directionId &&
          // We have to match the headsign from the schedule or the trip.
          // If the schedule doesn't have a headsign, we use the trip's headsign.
          (schedule?.stop_headsign === activeRow.headsign ||
            (schedule?.stop_headsign === null &&
              trip.headsign === activeRow.headsign))
        );
      })
    : updatedDepartureInfos;

  const isSmallBreakpoint = useSMDown();
  const refEl = useRef<HTMLDivElement>(null);

  // prevent scrolling the page when in fullscreen "app" view
  useLayoutEffect(() => {
    if (isSmallBreakpoint && activeRow && refEl.current) {
      disableBodyScroll(refEl.current);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [activeRow, isSmallBreakpoint]);

  const routesForMap = routes.filter(
    route =>
      isASilverLineRoute(route) ||
      isSubwayRoute(route) ||
      isACommuterRailRoute(route)
  );
  const groupedRoutePatterns = useLoaderData() as GroupedRoutePatterns;

  const updatedGroupedRoutePatterns = updateRoutePatterns(
    groupedRoutePatterns,
    mappedRouteIds
  );

  const defaultPolylines = orderBy(routesForMap, "sort_order", "desc").flatMap(
    route => {
      const routePatterns = Object.values(
        updatedGroupedRoutePatterns[route.id]
      ).flatMap(obj => obj.route_patterns);
      return routePatterns.map(rp => rp.representative_trip_polyline);
    }
  );

  // We have to have a route pattern in order to show the polyline on a map.
  // Because the stop headsign doesn't match a route pattern, we have to find the trip headsign from a departure.
  // If we can't find a trip headsign, we just return an empty div. But, this should never happen.
  const routePatterns = activeRow
    ? updatedGroupedRoutePatterns[activeRow.route.id]
    : {};
  let routePatternsForSelection = [];

  if (
    activeRow &&
    Object.keys(Object.keys(routePatterns)).includes(activeRow.headsign)
  ) {
    routePatternsForSelection =
      routePatterns[activeRow.headsign].route_patterns;
  } else {
    const routePatternDeparture = filteredDepartures.find(departure => {
      return departure && departure.trip && departure.trip.headsign;
    });

    const routePatternHeadsign = routePatternDeparture?.trip?.headsign || null;
    if (!routePatternHeadsign) {
      return <div />;
    }

    routePatternsForSelection = Object.keys(routePatterns).includes(
      routePatternHeadsign
    )
      ? routePatterns[routePatternHeadsign].route_patterns
      : [];
  }

  const shapeForSelection = routePatternsForSelection.map(
    rp => rp.representative_trip_polyline
  );

  const BackToRoutes = (
    <div className="back-to-routes">
      <button
        className="btn"
        onClick={() => resetRow()}
        onKeyDown={() => resetRow()}
        type="button"
      >
        {renderFa("", "fa-fw fa-angle-left")}
        <span className="btn-link">{`Back to all ${stop.name} routes`}</span>
      </button>
    </div>
  );

  return (
    <div
      className={`stop-routes-and-map ${activeRow ? "selected-departure" : ""}`}
    >
      {activeRow && BackToRoutes}
      <div ref={refEl} className="stop-routes">
        {activeRow ? (
          <div className="stop-departures--realtime">
            <DepartureList
              route={activeRow.route}
              stop={stop}
              departures={filteredDepartures}
              directionId={activeRow.directionId}
              headsign={activeRow.headsign}
              alerts={realtimeAlerts}
              hasService={filteredDepartures.length !== 0}
            />
          </div>
        ) : (
          <StopPageDepartures
            routes={routes}
            departureInfos={updatedDepartureInfos}
            alerts={alerts}
            groupedRoutePatterns={updatedGroupedRoutePatterns}
          />
        )}
      </div>
      <div className="stop-map hidden-sm-down">
        <StopMap
          stop={stop}
          lines={
            activeRow && shapeForSelection
              ? shapeForSelection
              : uniqBy(defaultPolylines, "id")
          }
          vehicles={[]}
          selectedRoute={activeRow?.route}
        />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
