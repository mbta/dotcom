import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import { Alert, DirectionId, EnhancedRoute } from "../../__v3api";
import {
  RoutePatternsByDirection,
  EnhancedRoutePattern,
  StopTree,
  RouteStop,
  IndexedRouteStop
} from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { fetchAction, reducer as fetchReducer } from "../../helpers/fetch";
import { menuReducer } from "./direction/reducer";
import { MapData, StaticMapData } from "../../leaflet/components/__mapdata";
import Map from "./Map";
import {
  isABusRoute,
  isSubwayRoute,
  isACommuterRailRoute
} from "../../models/route";
import LineDiagram from "./line-diagram/LineDiagram";
import { fromStopTreeData } from "./SchedulePage";

export interface Props {
  alerts: Alert[];
  busVariantId: string | null;
  directionId: DirectionId;
  mapData?: MapData;
  route: EnhancedRoute;
  routePatternsByDirection: RoutePatternsByDirection;
  routeStopLists: RouteStop[][] | null;
  staticMapData?: StaticMapData;
  stopTree: StopTree | null;
}

export const fetchMapData = (
  routeId: string,
  directionId: DirectionId,
  currentRoutePatternIdForData: string | undefined,
  dispatch: Dispatch<fetchAction>
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  const baseURL = `/schedules/map_api?id=${routeId}&direction_id=${directionId}`;
  const url = currentRoutePatternIdForData
    ? `${baseURL}&shape_id=${currentRoutePatternIdForData}`
    : baseURL;

  return (
    window.fetch &&
    window
      .fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

export const fetchLineData = (
  routeId: string,
  directionId: DirectionId,
  currentRoutePatternIdForData: string | undefined,
  dispatch: Dispatch<fetchAction>
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });

  const baseURL = `/schedules/line_api?id=${routeId}&direction_id=${directionId}`;
  const url = currentRoutePatternIdForData
    ? `${baseURL}&route_pattern=${currentRoutePatternIdForData}`
    : baseURL;

  return (
    window.fetch &&
    window
      .fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(({ stop_tree, route_stop_lists }) => {
        const stopTree = stop_tree ? fromStopTreeData(stop_tree) : null;
        const routeStopListsWithIndices: IndexedRouteStop[][] = route_stop_lists
          ? (route_stop_lists as RouteStop[][]).map(rs_list =>
              rs_list.map((rs, index) => ({ ...rs, routeIndex: index }))
            )
          : [];
        dispatch({
          type: "FETCH_COMPLETE",
          payload: { stopTree, routeStopLists: routeStopListsWithIndices }
        });
      })
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

const ScheduleDirection = ({
  alerts,
  busVariantId,
  directionId,
  mapData,
  route,
  routePatternsByDirection,
  routeStopLists: initialRouteStopLists,
  staticMapData,
  stopTree: initialStopTree
}: Props): ReactElement<HTMLElement> => {
  const routePatternsInCurrentDirection = routePatternsByDirection[directionId];
  const defaultRoutePattern =
    routePatternsInCurrentDirection.find(
      routePattern => routePattern.id === busVariantId
    ) || routePatternsInCurrentDirection.slice(0, 1)[0];

  const reverseDirection = directionId === 0 ? 1 : 0;
  const directionIsChangeable = route.direction_names[reverseDirection] != null;

  const [state, dispatch] = useReducer(menuReducer, {
    routePattern: defaultRoutePattern,
    directionId,
    routePatternsByDirection,
    routePatternMenuOpen: false,
    routePatternMenuAll: false,
    itemFocus: null
  });

  const [mapState, dispatchMapData] = useReducer(fetchReducer, {
    data: mapData,
    isLoading: false,
    error: false
  });

  // To distinguish CR shuttles and branches and multi-route trips, we have to filter in a particular order:
  //    1. Filter by route_id - we only want to show the primary path, not the multi-route trips
  //    2. Filter by typicality
  //    3. If there are multiple route_patterns with different shape values, then filter out shuttles (which usually have priority = -1)
  let currentShapes;
  let currentStops;
  if (isABusRoute(route)) {
    currentShapes = [state.routePattern.shape_id];
    currentStops = state.routePattern.stop_ids;
  } else if (isACommuterRailRoute(route)) {
    const currentPatterns = routePatternsInCurrentDirection
      .filter(pattern => pattern.route_id === route.id)
      .reduce((result, current) => {
        if (result.length === 0 || current.typicality < result[0].typicality)
          return [current];
        if (current.typicality === result[0].typicality) {
          return result.concat(current);
        }
        return result;
      }, [] as EnhancedRoutePattern[]);

    currentShapes = currentPatterns.map(pattern => pattern.shape_id);
    currentStops = currentPatterns.reduce(
      (acc, cur) => acc.concat(cur.stop_ids),
      [] as string[]
    );
  } else {
    currentShapes = routePatternsInCurrentDirection.map(
      pattern => pattern.shape_id
    );
    currentStops = routePatternsInCurrentDirection.reduce(
      (acc, cur) => acc.concat(cur.stop_ids),
      [] as string[]
    );
  }

  const currentRoutePatternIdForData =
    isABusRoute(route) && routePatternsInCurrentDirection.length > 1
      ? state.routePattern.id
      : undefined;

  useEffect(
    () => {
      if (!staticMapData) {
        fetchMapData(
          route.id,
          state.directionId,
          currentRoutePatternIdForData,
          dispatchMapData
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route, state.directionId, busVariantId, staticMapData]
  );

  const [lineState, dispatchLineData] = useReducer(fetchReducer, {
    data: {
      routeStopLists: initialRouteStopLists,
      stopTree: initialStopTree
    },
    isLoading: false,
    error: false
  });
  useEffect(() => {
    fetchLineData(
      route.id,
      state.directionId,
      currentRoutePatternIdForData,
      dispatchLineData
    );
  }, [route, state.directionId, busVariantId, currentRoutePatternIdForData]);

  const routeStopList =
    lineState.data && lineState.data.routeStopLists
      ? (lineState.data.routeStopLists as IndexedRouteStop[][]).find(
          rsList => !!rsList.find(rs => rs.branch === state.routePattern.name)
        ) || []
      : [];
  return (
    <>
      <div className="m-schedule-direction">
        <div id="direction-name" className="m-schedule-direction__direction">
          {route.direction_names[state.directionId]}
        </div>
        <ScheduleDirectionMenu
          directionId={state.directionId}
          dispatch={dispatch}
          menuOpen={state.routePatternMenuOpen}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          selectedRoutePatternId={state.routePattern.id}
        />
        {directionIsChangeable ? (
          <ScheduleDirectionButton dispatch={dispatch} />
        ) : null}
      </div>
      {isSubwayRoute(route) && lineState.data && (
        <LineDiagram
          alerts={alerts}
          directionId={state.directionId}
          route={route}
          routeStopList={routeStopList}
          stopTree={lineState.data.stopTree}
        />
      )}
      {!staticMapData && mapState.data && (
        <Map
          channel={`vehicles:${route.id}:${state.directionId}`}
          currentShapes={currentShapes}
          currentStops={currentStops}
          data={mapState.data}
        />
      )}
      {staticMapData && (
        <>
          <img
            alt={`${route.name} route map`}
            className="img-fluid"
            src={staticMapData.img_src}
          />
          <a
            href={staticMapData.pdf_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa fa-search-plus" aria-hidden="true" />
            View map as a PDF
          </a>
        </>
      )}
      {!isSubwayRoute(route) && (
        <LineDiagram
          alerts={alerts}
          directionId={state.directionId}
          route={route}
          routeStopList={routeStopList}
          stopTree={lineState.data && lineState.data.stopTree}
        />
      )}
    </>
  );
};

export default ScheduleDirection;
