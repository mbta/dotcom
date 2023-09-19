import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { chain, concat, filter, uniqBy } from "lodash";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { Alert, Route, Stop } from "../../__v3api";
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
import useDepartureRow from "../../hooks/useDepartureRow";

interface DeparturesAndMapProps {
  routes: Route[];
  stop: Stop;
  routesWithPolylines: RouteWithPolylines[];
  alerts: Alert[];
  setPredictionError: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeparturesAndMap = ({
  routes,
  stop,
  routesWithPolylines,
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
    ? departureInfos.filter(departure => {
        const { route, trip } = departure;
        return (
          route.id === activeRow.route.id &&
          trip.direction_id === activeRow.directionId &&
          trip.headsign === activeRow.headsign
        );
      })
    : departureInfos;

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
  const shapeForSelection = activeRow
    ? uniqBy(
        routesWithPolylines.find(route => route.id === activeRow.route.id)
          ?.polylines,
        "id"
      )
    : [];

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
      <div className="stop-routes">
        {activeRow ? (
          <div ref={refEl} className="stop-departures--realtime">
            <DepartureList
              route={activeRow.route}
              stop={stop}
              departures={filteredDepartures}
              directionId={activeRow.directionId}
              headsign={activeRow.headsign}
              alerts={realtimeAlerts}
            />
          </div>
        ) : (
          <StopPageDepartures
            routes={routes}
            departureInfos={departureInfos}
            stopName={stop.name}
            alerts={alerts}
          />
        )}
      </div>
      <div className={`stop-map ${activeRow ? "" : "hidden-sm-down"}`}>
        <StopMapRedesign
          stop={stop}
          lines={
            activeRow && shapeForSelection
              ? shapeForSelection
              : defaultPolylines
          }
          vehicles={[]}
          selectedRoute={activeRow?.route}
        />
      </div>
    </div>
  );
};

export default DeparturesAndMap;
