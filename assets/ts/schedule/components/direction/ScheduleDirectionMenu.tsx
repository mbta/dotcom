import React, { ReactElement, Dispatch, useEffect } from "react";
import { DirectionId, EnhancedRoute } from "../../../__v3api";
import { RoutePatternsByDirection } from "../__schedule";
import { MenuAction, closeRoutePatternMenuAction } from "./reducer";
import { GreenLineSelect, ExpandedGreenMenu } from "./GreenLineMenu";
import { BusMenuSelect, ExpandedBusMenu } from "./BusMenu";
import { handleNativeEscapeKeyPress } from "../../../helpers/keyboard-events";
import { isABusRoute, isAGreenLineRoute } from "../../../models/route";

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
    if (!menuOpen) return () => {};
    // if the menu is open, add event listeners to enable closing the menu by
    // clicking outside the menu or with keypress
    const clickToClose = (event: Event): void => {
      if (!event.target) return;
      const element = event.target as HTMLElement;
      if (element.closest(".js-m-schedule-click-boundary")) return;
      dispatch(closeRoutePatternMenuAction());
    };

    const keyToClose = (event: KeyboardEvent): void => {
      handleNativeEscapeKeyPress(event, () => {
        dispatch(closeRoutePatternMenuAction());
      });
    };

    document.addEventListener("click", clickToClose, true);
    document.addEventListener("keydown", keyToClose);

    return () => {
      // remove the event listeners
      document.removeEventListener("click", clickToClose, true);
      document.removeEventListener("keydown", keyToClose);
    };
  }, [menuOpen, dispatch]);

  return (
    <div className="js-m-schedule-click-boundary">
      {// bus mode
      isABusRoute(route) && (
        <BusMenuSelect
          routePatterns={routePatternsByDirection[directionId]}
          selectedRoutePatternId={selectedRoutePatternId}
          dispatch={dispatch}
        />
      )}
      {// Green Line
      isAGreenLineRoute(route) && (
        <GreenLineSelect
          routeId={route.id}
          dispatch={dispatch}
          directionId={directionId}
        />
      )}
      {// Mattapan Trolley
      route.id === "Mattapan" && (
        <div className="m-schedule-direction__route-pattern notranslate">
          {route.direction_destinations[directionId]}
        </div>
      )}
      {// Subway, CR, Ferry
      [1, 2, 4].indexOf(route.type) !== -1 && (
        <div className="m-schedule-direction__route-pattern notranslate">
          {route.direction_destinations[directionId]}
        </div>
      )}
      {menuOpen && isABusRoute(route) && (
        <ExpandedBusMenu
          routePatterns={routePatterns}
          selectedRoutePatternId={selectedRoutePatternId}
          dispatch={dispatch}
        />
      )}
      {menuOpen && isAGreenLineRoute(route) && (
        <ExpandedGreenMenu directionId={directionId} route={route} />
      )}
    </div>
  );
};

export default ScheduleDirectionMenu;
