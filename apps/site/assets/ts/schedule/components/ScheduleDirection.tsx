import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import { DirectionId, EnhancedRoute } from "../../__v3api";
import {
  RoutePatternsByDirection,
  LineDiagramStop,
  SimpleStopMap,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  EnhancedRoutePattern
} from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { reducer as fetchReducer } from "../../helpers/fetch";
import { menuReducer, FetchAction } from "./direction/reducer";
import { MapData, StaticMapData } from "../../leaflet/components/__mapdata";
import Map from "./Map";
import LineDiagramAndStopListPage from "./line-diagram/LineDiagram";
import { isABusRoute, isACommuterRailRoute } from "../../models/route";

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  routePatternsByDirection: RoutePatternsByDirection;
  mapData?: MapData;
  staticMapData?: StaticMapData;
  lineDiagram: LineDiagramStop[];
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
  scheduleNote: ScheduleNoteType | null;
  busVariantId: string | null;
}

export const fetchMapData = (
  routeId: string,
  directionId: DirectionId,
  currentRoutePatternIdForData: string | undefined,
  dispatch: Dispatch<FetchAction>
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
  dispatch: Dispatch<FetchAction>
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
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

const ScheduleDirection = ({
  route,
  directionId,
  routePatternsByDirection,
  mapData,
  staticMapData,
  lineDiagram,
  busVariantId
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
          if (result[0].shape_priority < 0 && current.shape_priority > 0)
            return [current];
          if (current.shape_priority < 0 && result[0].shape_priority > 0)
            return result;
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
    data: lineDiagram,
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

  return (
    <>
      <div className="m-schedule-direction">
        <div id="direction-name" className="m-schedule-direction__direction">
          {route.direction_names[state.directionId]}
        </div>
        <ScheduleDirectionMenu
          route={route}
          directionId={state.directionId}
          routePatternsByDirection={routePatternsByDirection}
          selectedRoutePatternId={state.routePattern.id}
          menuOpen={state.routePatternMenuOpen}
          showAllRoutePatterns={state.routePatternMenuAll}
          itemFocus={state.itemFocus}
          dispatch={dispatch}
        />
        {directionIsChangeable ? (
          <ScheduleDirectionButton dispatch={dispatch} />
        ) : null}
      </div>

      {lineState.data && lineState.data[0] && (
        <LineDiagramAndStopListPage
          lineDiagram={lineState.data}
          route={route}
          directionId={state.directionId}
        />
      )}

      {!staticMapData && mapState.data && (
        <Map
          channel={`vehicles:${route.id}:${state.directionId}`}
          data={mapState.data}
          currentShapes={currentShapes}
          currentStops={currentStops}
        />
      )}
      {staticMapData && (
        <>
          <img
            src={staticMapData.img_src}
            alt={`${route.name} route map`}
            className="img-fluid"
          />
          <a
            href={staticMapData.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-search-plus" aria-hidden="true" />
            View map as a PDF
          </a>
        </>
      )}
    </>
  );
};

export default ScheduleDirection;
