import React, { ReactElement } from "react";
import { DirectionId } from "../../__v3api";
import { RoutePatternsByDirection } from "./__schedule";

interface Props {
  routePatternsByDirection: RoutePatternsByDirection;
  directionId: DirectionId;
  selectedRoutePatternId: string;
}

const ScheduleDirectionMenu = ({
  routePatternsByDirection,
  directionId,
  selectedRoutePatternId
}: Props): ReactElement<HTMLElement> => (
  <div>
    Selected Route Pattern:{" "}
    {
      routePatternsByDirection[directionId].filter(
        routePattern => routePattern.id === selectedRoutePatternId
      )[0].name
    }
  </div>
);

export default ScheduleDirectionMenu;
