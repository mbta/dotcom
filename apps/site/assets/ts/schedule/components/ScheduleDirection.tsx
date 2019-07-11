import React, { ReactElement, useReducer } from "react";
import { DirectionId, EnhancedRoute, Shape } from "../../__v3api";
import {
  ShapesById,
  RoutePatternsByDirection,
  RoutePatternWithShape
} from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";

interface State {
  routePattern: RoutePatternWithShape;
  shape: Shape;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
}

interface Payload {
  routePattern?: RoutePatternWithShape;
}

export interface Action {
  event: "toggleDirection" | "setRoutePattern";
  payload?: Payload;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.event) {
    case "toggleDirection":
      return {
        ...state,
        directionId: state.directionId === 0 ? 1 : 0,
        routePattern: state.routePatternsByDirection[
          state.directionId === 0 ? 1 : 0
        ].slice(0, 1)[0],
        shape:
          state.shapesById[
            state.routePatternsByDirection[
              state.directionId === 0 ? 1 : 0
            ].slice(0, 1)[0].shape_id
          ]
      };

    case "setRoutePattern":
      return {
        ...state,
        routePattern: action.payload!.routePattern!,
        shape: state.shapesById[action.payload!.routePattern!.shape_id]
      };

    default:
      // @ts-ignore
      throw new Error(`unexpected event: ${action.event}`);
  }
};

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
}

const ScheduleDirection = ({
  route,
  directionId,
  shapesById,
  routePatternsByDirection
}: Props): ReactElement<HTMLElement> => {
  const defaultRoutePattern = routePatternsByDirection[directionId].slice(
    0,
    1
  )[0];

  const [state, dispatch] = useReducer(reducer, {
    routePattern: defaultRoutePattern,
    shape: shapesById[defaultRoutePattern.shape_id],
    directionId,
    shapesById,
    routePatternsByDirection
  });

  return (
    <div>
      <h5>Schedule Direction Component</h5>
      <p>{route.direction_names[state.directionId]}</p>
      <p>active shape: {state.shape && state.shape.name}</p>
      <ScheduleDirectionMenu
        directionId={state.directionId}
        routePatternsByDirection={routePatternsByDirection}
        selectedRoutePatternId={state.routePattern.id}
        dispatch={dispatch}
      />
      <ScheduleDirectionButton dispatch={dispatch} />
    </div>
  );
};

export default ScheduleDirection;
