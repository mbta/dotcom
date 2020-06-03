import React, { ReactElement, Dispatch, useEffect } from "react";
import { DirectionId, EnhancedRoute } from "../../../__v3api";
import { RoutePatternsByDirection } from "../__schedule";
import { MenuAction, closeRoutePatternMenuAction } from "./reducer";
import { GreenLineSelect, ExpandedGreenMenu } from "./GreenLineMenu";
import { BusMenuSelect, ExpandedBusMenu } from "./BusMenu";
import { handleNativeEscapeKeyPress } from "../../../helpers/keyboard-events";

interface Props {
  route: EnhancedRoute;
  routePatternsByDirection: RoutePatternsByDirection;
  directionId: DirectionId;
  selectedRoutePatternId: string;
  menuOpen: boolean;
  showAllRoutePatterns: boolean;
  itemFocus: string | null;
  dispatch: Dispatch<MenuAction>;
}

/* istanbul ignore next */
const externalCloseEvent = (dispatch: Dispatch<MenuAction>): void => {
  document.addEventListener(
    "click",
    (event: Event): void => {
      if (!event.target) return;
      const element = event.target as HTMLElement;
      if (element.closest(".js-m-schedule-click-boundary")) return;
      dispatch(closeRoutePatternMenuAction());
    },
    true
  );

  document.addEventListener(
    "keydown",
    (event: KeyboardEvent): void => {
      handleNativeEscapeKeyPress(event, () => {
        dispatch(closeRoutePatternMenuAction());
      });
    }
  );
};

const ScheduleDirectionMenu = ({
  route,
  routePatternsByDirection,
  directionId,
  selectedRoutePatternId,
  menuOpen,
  showAllRoutePatterns,
  itemFocus,
  dispatch
}: Props): ReactElement<HTMLElement> => {
  const routePatterns = routePatternsByDirection[directionId];

  useEffect(() => {
    externalCloseEvent(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="js-m-schedule-click-boundary">
      {// bus mode
      route.type === 3 && (
        <BusMenuSelect
          routePatterns={routePatternsByDirection[directionId]}
          selectedRoutePatternId={selectedRoutePatternId}
          dispatch={dispatch}
        />
      )}
      {// Green Line
      route.id.startsWith("Green") && (
        <GreenLineSelect
          routeId={route.id}
          dispatch={dispatch}
          directionId={directionId}
        />
      )}
      {// Mattapan Trolley
      route.id === "Mattapan" && (
        <div className="m-schedule-direction__route-pattern">
          {route.direction_destinations[directionId]}
        </div>
      )}
      {// Subway, CR, Ferry
      [1, 2, 4].indexOf(route.type) !== -1 && (
        <div className="m-schedule-direction__route-pattern">
          {route.direction_destinations[directionId]}
        </div>
      )}
      {menuOpen && route.type === 3 && (
        <ExpandedBusMenu
          routePatterns={routePatterns}
          selectedRoutePatternId={selectedRoutePatternId}
          showAllRoutePatterns={showAllRoutePatterns}
          itemFocus={itemFocus}
          dispatch={dispatch}
        />
      )}
      {menuOpen && route.id.startsWith("Green") && (
        <ExpandedGreenMenu directionId={directionId} route={route} />
      )}
    </div>
  );
};

export default ScheduleDirectionMenu;
