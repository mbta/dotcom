import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import { DirectionId, EnhancedRoute } from "../../__v3api";
import {
  RoutePatternsByDirection,
  LineDiagramStop,
  SimpleStopMap,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType
} from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { reducer as fetchReducer } from "../../helpers/fetch";
import { menuReducer, FetchAction } from "./direction/reducer";
import { MapData, StaticMapData } from "../../leaflet/components/__mapdata";
import Map from "../components/Map";
import LineDiagramAndStopListPage from "../components/line-diagram/LineDiagram";
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
  initialSelectedRoutePatternId: string | null;
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
  services,
  stops,
  today,
  scheduleNote,
  // This references the current bus variant, if applicable
  initialSelectedRoutePatternId
}: Props): ReactElement<HTMLElement> => {
  const routePatternsInCurrentDirection = routePatternsByDirection[directionId];
  const defaultRoutePattern =
    routePatternsInCurrentDirection.find(
      routePattern => routePattern.id === initialSelectedRoutePatternId
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

  // To distinguish CR shuttles and branches, we have to filter out shuttle patterns (which have priority = -1)
  const currentShapes = isABusRoute(route)
    ? [state.routePattern.shape_id]
    : isACommuterRailRoute(route)
    ? routePatternsInCurrentDirection
        .filter(pattern => pattern.shape_priority >= 0)
        .map(pattern => pattern.shape_id)
    : routePatternsInCurrentDirection.map(pattern => pattern.shape_id);

  const currentStops = isABusRoute(route)
    ? state.routePattern.stop_ids
    : routePatternsInCurrentDirection.reduce(
        (acc, cur) => acc.concat(cur.stop_ids),
        [] as string[]
      );
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
    // only re-run the effect if any of these things change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route, state.directionId, initialSelectedRoutePatternId, staticMapData]
  );

  const [lineState, dispatchLineData] = useReducer(fetchReducer, {
    data: lineDiagram,
    isLoading: false,
    error: false
  });

  useEffect(
    () => {
      fetchLineData(
        route.id,
        state.directionId,
        currentRoutePatternIdForData,
        dispatchLineData
      );
    },
    // only re-run the effect if any of these things change
    [
      route,
      state.directionId,
      initialSelectedRoutePatternId,
      currentRoutePatternIdForData
    ]
  );

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
      {lineState.data && (
        <LineDiagramAndStopListPage
          lineDiagram={lineState.data}
          route={route}
          directionId={state.directionId}
          routePatternsByDirection={routePatternsByDirection}
          services={services}
          stops={stops}
          today={today}
          scheduleNote={scheduleNote}
        />
      )}
    </>
  );
};

export default ScheduleDirection;
