import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import { DirectionId, EnhancedRoute } from "../../__v3api";
import {
  ShapesById,
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
import LineDiagram from "../components/line-diagram/LineDiagram";

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  shapesById: ShapesById;
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
  shapeIds: string[],
  dispatch: Dispatch<FetchAction>
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(`/schedules/map_api?id=${routeId}&direction_id=${directionId}`)
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
  shapeId: string,
  dispatch: Dispatch<FetchAction>
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/line_api?id=${routeId}&direction_id=${directionId}&variant=${shapeId}`
      )
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
  shapesById,
  routePatternsByDirection,
  mapData,
  staticMapData,
  lineDiagram,
  services,
  stops,
  today,
  scheduleNote,
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
    shape: shapesById[defaultRoutePattern.shape_id],
    directionId,
    shapesById,
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

  const currentShapeId = state.shape
    ? state.shape.id
    : defaultRoutePattern.shape_id;
  const shapeIds = state.routePatternsByDirection[state.directionId].map(
    routePattern => routePattern.shape_id
  );

  useEffect(
    () => {
      if (!staticMapData) {
        fetchMapData(route.id, state.directionId, shapeIds, dispatchMapData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route, state.directionId, staticMapData]
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
        currentShapeId,
        dispatchLineData
      );
    },
    [route, state.directionId, currentShapeId]
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
          shapeIds={shapeIds}
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
        <LineDiagram
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
