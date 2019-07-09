import React, { ReactElement } from "react";
import { DirectionId, EnhancedRoute } from "../../__v3api";
import { ShapesById, RoutePatternsByDirection } from "./__schedule";

export interface Props {
  route: EnhancedRoute;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
}

interface ScheduleDirectionMenuProps {
  routePatternsByDirection: RoutePatternsByDirection;
  directionId: DirectionId;
}

const ScheduleDirectionMenu = ({
  routePatternsByDirection,
  directionId
}: ScheduleDirectionMenuProps): ReactElement<HTMLElement> => (
  <div>
    Direction Menu: {routePatternsByDirection[directionId].length} items for
    direction {directionId}
  </div>
);

const ScheduleDirection = ({
  route,
  directionId,
  shapesById,
  routePatternsByDirection
}: Props): ReactElement<HTMLElement> => (
  <div>
    <h5>Schedule Direction Component</h5>
    <p>{route.direction_names[directionId]}</p>
    <p>
      active shape:{" "}
      {
        shapesById[
          routePatternsByDirection[directionId].slice(0, 1)[0].shape_id
        ].name
      }
    </p>
    <ScheduleDirectionMenu
      directionId={directionId}
      routePatternsByDirection={routePatternsByDirection}
    />
  </div>
);

export default ScheduleDirection;
