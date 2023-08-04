import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { chain, concat, filter, uniqBy } from "lodash";
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

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  routesWithPolylines: RouteWithPolylines[];
  alerts: Alert[];
}

type DepartureFilter = {
  route: Route;
  directionId: DirectionId;
  headsign: string;
};
export type DepartureFilterFn = (filters: DepartureFilter) => void;

const DeparturesAndMap = ({
  routes,
  stop,
  routesWithPolylines,
  alerts
}: DeparturesAndMapProps): ReactElement<HTMLElement> => {
  const { data: schedules } = useSchedulesByStop(stop.id);
  const predictions = usePredictionsChannel({ stopId: stop.id });
  const departureInfos = mergeIntoDepartureInfo(schedules || [], predictions);
  const [realtimeAlerts, setRealtimeAlerts] = useState<Alert[]>([]);
  const [
    departureFilters,
    setDepartureFilters
  ] = useState<DepartureFilter | null>(null);

  const setDepartureVariables: DepartureFilterFn = (
    filters: DepartureFilter
  ) => {
    setDepartureFilters(filters);
  };

  useEffect(() => {
    if (departureFilters && departureFilters.route) {
      // grab all the alerts that are current or upcoming
      const currentAndUpcomingAlerts = filter(alerts, a =>
        isUpcomingOrCurrentLifecycle(a)
      );
      // There are the alerts that affect a whole route and not a stop
      const routeWideAlertsArray = routeWideAlerts(currentAndUpcomingAlerts);
      // filter all the route wide alerts to the selected route
      const alertsForSelectedRoute = alertsForRoute(
        routeWideAlertsArray,
        departureFilters.route.id
      );
      // all the alerts that affect this stop on the route
      const alertsForStop = alertsForStopAndRoute(
        currentAndUpcomingAlerts,
        stop.id,
        departureFilters.route.id
      );
      // combine route wide, and route stop alerts into a single list for the real time page
      setRealtimeAlerts(concat(alertsForStop, alertsForSelectedRoute));
    } else {
      setRealtimeAlerts([]);
    }
  }, [departureFilters, alerts, stop]);

  // filter by chosen route and direction
  const filteredDepartures = departureFilters
    ? departureInfos.filter(departure => {
        const { route, trip } = departure;
        return (
          route.id === departureFilters.route.id &&
          trip.direction_id === departureFilters.directionId &&
          trip.headsign === departureFilters.headsign
        );
      })
    : departureInfos;

  const isSmallBreakpoint = useSMDown();
  const refEl = useRef<HTMLDivElement>(null);

  // prevent scrolling the page when in fullscreen "app" view
  useLayoutEffect(() => {
    if (isSmallBreakpoint && departureFilters && refEl.current) {
      disableBodyScroll(refEl.current);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [departureFilters, isSmallBreakpoint]);

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
  const shapeForSelection = departureFilters
    ? uniqBy(
        routesWithPolylines.find(
          route => route.id === departureFilters.route.id
        )?.polylines,
        "id"
      )
    : [];

  const unsetDepartureInfo = (): void => setDepartureFilters(null);

  const BackToRoutes = (
    <div className="back-to-routes">
      <button
        className="btn"
        onClick={unsetDepartureInfo}
        onKeyDown={unsetDepartureInfo}
        type="button"
      >
        {renderFa("", "fa-fw fa-angle-left")}
        <span className="btn-link">{`Back to all ${stop.name} routes`}</span>
      </button>
    </div>
  );

  return (
    <div
      className={`stop-routes-and-map ${
        departureFilters ? "selected-departure" : ""
      }`}
    >
      {departureFilters && BackToRoutes}
      <div className="stop-routes">
        {departureFilters ? (
          <div ref={refEl} className="stop-departures">
            <DepartureList
              route={departureFilters.route}
              stop={stop}
              departures={filteredDepartures}
              directionId={departureFilters.directionId}
              headsign={departureFilters.headsign}
              alerts={realtimeAlerts}
            />
          </div>
        ) : (
          <StopPageDepartures
            routes={routes}
            departureInfos={departureInfos}
            onClick={setDepartureVariables}
            stopName={stop.name}
            alerts={alerts}
          />
        )}
      </div>
      <div className={`stop-map ${departureFilters ? "" : "hidden-sm-down"}`}>
        <StopMapRedesign
          stop={stop}
          lines={
            departureFilters && shapeForSelection
              ? shapeForSelection
              : defaultPolylines
          }
          vehicles={[]}
          selectedRoute={departureFilters?.route}
        />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
