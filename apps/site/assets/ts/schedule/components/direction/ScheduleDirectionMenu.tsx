import React, { ReactElement, Dispatch } from "react";
import { DirectionId } from "../../../__v3api";
import { RoutePatternsByDirection, RoutePatternWithShape } from "../__schedule";
import { Action } from "../ScheduleDirection";

interface Props {
  routePatternsByDirection: RoutePatternsByDirection;
  directionId: DirectionId;
  selectedRoutePatternId: string;
  dispatch: Dispatch<Action>;
}

const ScheduleDirectionMenu = ({
  routePatternsByDirection,
  directionId,
  selectedRoutePatternId,
  dispatch
}: Props): ReactElement<HTMLElement> => (
  <div>
    <select
      value={selectedRoutePatternId}
      onChange={e =>
        dispatch({
          event: "setRoutePattern",
          payload: {
            routePattern: routePatternsByDirection[directionId].filter(
              routePattern => routePattern.id === e.currentTarget.value
            )[0]
          }
        })
      }
    >
      {routePatternsByDirection[directionId].map(
        (routePattern: RoutePatternWithShape) => (
          <option key={routePattern.id} value={routePattern.id}>
            {routePattern.name}
          </option>
        )
      )}
    </select>
  </div>
);

export default ScheduleDirectionMenu;
