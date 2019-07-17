import React, { ReactElement, useReducer } from "react";
import { DirectionId, EnhancedRoute } from "../../__v3api";
import { ShapesById, RoutePatternsByDirection } from "./__schedule";
import ScheduleDirectionMenu from "./direction/ScheduleDirectionMenu";
import ScheduleDirectionButton from "./direction/ScheduleDirectionButton";
import { reducer } from "./direction/reducer";

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
      <p id="direction-name">{route.direction_names[state.directionId]}</p>
      <p id="active-shape">{state.shape && state.shape.name}</p>
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
