import { DirectionId, Shape } from "../../../__v3api";
import {
  ShapesById,
  RoutePatternsByDirection,
  RoutePatternWithShape
} from "../__schedule";

export interface State {
  routePattern: RoutePatternWithShape;
  shape: Shape;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
}

export interface Payload {
  routePattern?: RoutePatternWithShape;
}

export interface Action {
  event: "toggleDirection" | "setRoutePattern";
  payload?: Payload;
}

const toggleDirection = (state: State): State => {
  const nextDirection = state.directionId === 0 ? 1 : 0;
  const [
    defaultRoutePatternForDirection,
    ..._rest
  ] = state.routePatternsByDirection[nextDirection];

  return {
    ...state,
    directionId: nextDirection,
    routePattern: defaultRoutePatternForDirection,
    shape: state.shapesById[defaultRoutePatternForDirection.shape_id]
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.event) {
    case "toggleDirection":
      return toggleDirection(state);

    case "setRoutePattern":
      return {
        ...state,
        routePattern: action.payload!.routePattern!,
        shape: state.shapesById[action.payload!.routePattern!.shape_id]
      };
  }
};
