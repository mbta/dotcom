import React, { ReactElement, SetStateAction, useReducer, useEffect, useState, Dispatch } from "react";
import { DirectionId, EnhancedRoute } from "../../__v3api";
import { ShapesById, RoutePatternsByDirection } from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { reducer as mapDataReducer } from "../../helpers/fetch";
import { menuReducer, FetchAction } from "./direction/reducer";
import { MapData } from "../../leaflet/components/__mapdata";
import Map from "../components/Map";

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
  mapData: MapData;
  stopListHtml: string;
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

export const fetchStopListHtml = (routeId: string, directionId: DirectionId, shapeId: string, setStopListHtml: Dispatch<SetStateAction<string>>): Promise<void> => {
	const stopListUrl = `/schedules/${routeId}/line/diagram?direction_id=${directionId}&variant=${shapeId}`;
	return(
    window.fetch && window
      .fetch(stopListUrl)
      .then((response: Response) => {
        if (response.ok) return response.text();
        throw new Error(response.statusText);
      })
      .then((newStopListHtml: string) => {
        setStopListHtml(newStopListHtml)
      })
  );
}

const ScheduleDirection = ({
  route,
  directionId,
  shapesById,
  routePatternsByDirection,
  mapData,
  stopListHtml: initialStopListHtml
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
  const [mapState, dispatchMapData] = useReducer(mapDataReducer, {
    data: mapData,
    isLoading: false,
    error: false
  });
  const [stopListHtml, setStopListHtml] = useState(initialStopListHtml);

  const shapeId = state.shape ? state.shape.id : defaultRoutePattern.shape_id;

  useEffect(
    () => {
      fetchMapData(route.id, state.directionId, shapeId, dispatchMapData);
    },
    [route, state.directionId, shapeId]
  );
  useEffect(
    () => {
      fetchStopListHtml(route.id, state.directionId, shapeId, setStopListHtml);
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
      <div dangerouslySetInnerHTML={{__html: stopListHtml}} />
    </>
  );
};

export default ScheduleDirection;
