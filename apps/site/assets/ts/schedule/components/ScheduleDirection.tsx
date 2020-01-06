import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import {
  DirectionId,
  EnhancedRoute,
  ServiceWithServiceDate
} from "../../__v3api";
import {
  ShapesById,
  RoutePatternsByDirection,
  LineDiagramStop,
  SimpleStopMap
} from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { reducer as fetchReducer } from "../../helpers/fetch";
import { menuReducer, FetchAction } from "./direction/reducer";
import { MapData } from "../../leaflet/components/__mapdata";
import Map from "../components/Map";
import LineDiagram from "../components/LineDiagram";

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
  mapData: MapData;
  lineDiagram: LineDiagramStop[];
  services: ServiceWithServiceDate[];
  ratingEndDate: string;
  stops: SimpleStopMap;
}

export const fetchMapData = (
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
        `/schedules/map_api?id=${routeId}&direction_id=${directionId}&variant=${shapeId}`
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
  lineDiagram,
  services,
  ratingEndDate,
  stops
}: Props): ReactElement<HTMLElement> => {
  const defaultRoutePattern = routePatternsByDirection[directionId].slice(
    0,
    1
  )[0];
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
  const shapeId = state.shape ? state.shape.id : defaultRoutePattern.shape_id;
  useEffect(
    () => {
      fetchMapData(route.id, state.directionId, shapeId, dispatchMapData);
    },
    [route, state.directionId, shapeId]
  );
  const [lineState, dispatchLineData] = useReducer(fetchReducer, {
    data: lineDiagram,
    isLoading: false,
    error: false
  });
  useEffect(
    () => {
      fetchLineData(route.id, state.directionId, shapeId, dispatchLineData);
    },
    [route, state.directionId, shapeId]
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
        <ScheduleDirectionButton dispatch={dispatch} />
      </div>
      {mapState.data && (
        <Map
          channel={`vehicles:${route.id}:${state.directionId}`}
          data={mapState.data}
          shapeId={shapeId}
        />
      )}
      {lineState.data && (
        <LineDiagram
          lineDiagram={lineState.data}
          route={route}
          directionId={state.directionId}
          routePatternsByDirection={routePatternsByDirection}
          services={services}
          ratingEndDate={ratingEndDate}
          stops={stops}
        />
      )}
    </>
  );
};

export default ScheduleDirection;
