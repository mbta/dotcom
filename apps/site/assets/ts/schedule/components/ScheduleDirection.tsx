import React, { ReactElement, useReducer, useEffect, Dispatch } from "react";
import { DirectionId, EnhancedRoute, Route } from "../../__v3api";
import {
  ShapesById,
  RoutePatternsByDirection,
  LineDiagramStop
} from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { reducer as mapDataReducer } from "../../helpers/fetch";
import { menuReducer, FetchAction } from "./direction/reducer";
import { MapData } from "../../leaflet/components/__mapdata";
import Map from "../components/Map";
import { modeIcon, accessibleIcon, parkingIcon } from "../../helpers/icon";

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
  mapData: MapData;
  lineDiagram: LineDiagramStop[];
}

export const fetchData = (
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
const ScheduleDirection = ({
  route,
  directionId,
  shapesById,
  routePatternsByDirection,
  mapData,
  lineDiagram
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
  const shapeId = state.shape ? state.shape.id : defaultRoutePattern.shape_id;
  useEffect(
    () => {
      fetchData(route.id, state.directionId, shapeId, dispatchMapData);
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
      {lineDiagram &&
        lineDiagram.map(
          ({ route_stop: routeStop, stop_data: stopData }: LineDiagramStop) => (
            <div className="m-schedule-line-diagram__stop">
              <div className="m-schedule-line-diagram__card-left">
                <div className="m-schedule-line-diagram__stop-name">
                  {routeStop.name}
                </div>
                <div>{stopData.type === "terminus" && stopData.branch}</div>
                <div className="m-schedule-line-diagram__connections">
                  {routeStop.connections.map((route: Route) =>
                    route.type === 3 && !route.name.startsWith("SL") ? (
                      <span className="c-icon__bus-pill m-schedule-line-diagram__connection u-bg--bus">
                        {route.name}
                      </span>
                    ) : (
                      modeIcon(route.id)
                    )
                  )}
                </div>
              </div>
              <div>
                <div className="m-schedule-line-diagram__features">
                  {routeStop.stop_features.includes("parking_lot")
                    ? parkingIcon("c-svg__icon-parking-default")
                    : null}
                  {routeStop.stop_features.includes("access")
                    ? accessibleIcon("c-svg__icon-acessible-default")
                    : null}
                  {routeStop.zone && (
                    <span className="c-icon__cr-zone">{`Zone ${
                      routeStop.zone
                    }`}</span>
                  )}
                </div>
                <div>
                  {stopData.branch ? `${stopData.branch}, ` : ""}
                  {stopData.type}
                </div>
              </div>
            </div>
          )
        )}
    </>
  );
};

export default ScheduleDirection;
