import React, {
  ReactElement,
  Dispatch,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent
} from "react";
import { DirectionId, EnhancedRoute } from "../../../__v3api";
import { RoutePatternsByDirection, EnhancedRoutePattern } from "../__schedule";
import { Action } from "./reducer";
import renderSvg from "../../../helpers/render-svg";
import arrowIcon from "../../../../static/images/icon-down-arrow.svg";
import checkIcon from "../../../../static/images/icon-checkmark.svg";
import {
  handleNativeEscapeKeyPress,
  handleReactEnterKeyPress
} from "../../../helpers/keyboard-events";

interface Props {
  route: EnhancedRoute;
  routePatternsByDirection: RoutePatternsByDirection;
  directionId: DirectionId;
  selectedRoutePatternId: string;
  menuOpen: boolean;
  showAllRoutePatterns: boolean;
  itemFocus: string | null;
  dispatch: Dispatch<Action>;
}

interface ExpandedMenuProps {
  routePatterns: EnhancedRoutePattern[];
  selectedRoutePatternId: string;
  showAllRoutePatterns: boolean;
  itemFocus: string | null;
  dispatch: Dispatch<Action>;
}

interface RoutePatternItem {
  routePatternIds: string[];
  routePattern: EnhancedRoutePattern;
  selected: boolean;
  focused: boolean;
  duplicated: boolean;
  dispatch: Dispatch<Action>;
}

const nextRoutePatternIndex = (
  currentId: string,
  routePatternIds: string[]
): number => {
  const index = routePatternIds.indexOf(currentId);
  return index === routePatternIds.length - 1 ? 0 : index + 1;
};

const prevRoutePatternIndex = (
  currentId: string,
  routePatternIds: string[]
): number => {
  const index = routePatternIds.indexOf(currentId);
  return index === 0 ? routePatternIds.length - 1 : index - 1;
};

const handleNavigation = (
  e: ReactKeyboardEvent,
  routePatternIds: string[]
): void => {
  if (
    e.key !== "Tab" &&
    e.key !== "ArrowRight" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowDown" &&
    e.key !== "ArrowUp"
  )
    return;

  e.preventDefault();

  const targetEl = e.target as HTMLDivElement;
  const targetElId = targetEl.id.replace("route-pattern_", "");

  // forward
  if (
    (e.key === "Tab" && !e.shiftKey) ||
    e.key === "ArrowRight" ||
    e.key === "ArrowDown"
  ) {
    const nextIndex = nextRoutePatternIndex(targetElId, routePatternIds);
    const nextElId = `route-pattern_${routePatternIds[nextIndex]}`;
    // eslint-disable-next-line no-unused-expressions
    document.getElementById(nextElId) &&
      /* istanbul ignore next */
      document.getElementById(nextElId)!.focus();
  }

  // backwards
  if (
    (e.key === "Tab" && e.shiftKey) ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp"
  ) {
    const prevIndex = prevRoutePatternIndex(targetElId, routePatternIds);
    const prevElId = `route-pattern_${routePatternIds[prevIndex]}`;
    // eslint-disable-next-line no-unused-expressions
    document.getElementById(prevElId) &&
      /* istanbul ignore next */
      document.getElementById(prevElId)!.focus();
  }
};

const typicalityDefaultText = (typicality: number): string => {
  if (typicality === 1) return "typical route";
  if (typicality === 2) return "less common route";
  return "";
};

const RoutePatternItem = ({
  routePatternIds,
  routePattern,
  selected,
  focused,
  duplicated,
  dispatch
}: RoutePatternItem): ReactElement<HTMLElement> => {
  const selectedClass = selected ? " m-schedule-direction__menu--selected" : "";
  const icon = selected ? (
    <div className="m-schedule-direction__checkmark">
      {renderSvg("c-svg__icon", checkIcon)}
    </div>
  ) : null;
  const handleClick = (): void =>
    dispatch({
      event: "setRoutePattern",
      payload: { routePattern }
    });
  return (
    <div
      aria-current={selected ? "page" : undefined}
      id={`route-pattern_${routePattern.id}`}
      tabIndex={0}
      role="menuitem"
      className={`m-schedule-direction__menu-item${selectedClass}`}
      onClick={handleClick}
      ref={item => item && focused && item.focus()}
      onKeyUp={(e: ReactKeyboardEvent) => {
        handleReactEnterKeyPress(e, () => {
          handleClick();
        });
      }}
      onKeyDown={(e: ReactKeyboardEvent) => {
        handleNavigation(e, routePatternIds);
      }}
    >
      <div className="m-schedule-direction__menu-item-headsign">
        {icon}
        {routePattern.headsign}
      </div>
      <div className="m-schedule-direction__menu-item-description">
        {duplicated && `from ${routePattern.name.split(" - ")[0]}, `}
        {routePattern.time_desc ||
          typicalityDefaultText(routePattern.typicality)}
      </div>
    </div>
  );
};

const hasMoreRoutePatterns = (routePatterns: EnhancedRoutePattern[]): boolean =>
  routePatterns.some(
    (routePattern: EnhancedRoutePattern) => routePattern.typicality > 2
  );

const determineFocusIndex = (
  itemFocus: string | null,
  routePatterns: EnhancedRoutePattern[]
): number => {
  if (itemFocus === "first") return 0;
  return routePatterns.findIndex(
    (routePattern: EnhancedRoutePattern) => routePattern.typicality > 2
  );
};

const isDuplicateHeadsign = (
  compareRoutePattern: EnhancedRoutePattern,
  routePatterns: EnhancedRoutePattern[]
): boolean =>
  routePatterns.filter(
    (routePattern: EnhancedRoutePattern) =>
      routePattern.id !== compareRoutePattern.id &&
      routePattern.headsign === compareRoutePattern.headsign
  ).length > 0;

const ExpandedMenu = ({
  routePatterns,
  selectedRoutePatternId,
  showAllRoutePatterns,
  itemFocus,
  dispatch
}: ExpandedMenuProps): ReactElement<HTMLElement> => {
  const filterRule = (routePattern: EnhancedRoutePattern): boolean =>
    showAllRoutePatterns ? true : routePattern.typicality < 3;
  const handleClick = (): void =>
    dispatch({ event: "showAllRoutePatterns", payload: {} });
  const focusIndex = determineFocusIndex(itemFocus, routePatterns);
  const toggleButtonIds =
    hasMoreRoutePatterns(routePatterns) && showAllRoutePatterns === false
      ? ["uncommon"]
      : [];
  const routePatternIds = routePatterns
    .filter(filterRule)
    .map((routePattern: EnhancedRoutePattern) => routePattern.id)
    .concat(toggleButtonIds);
  return (
    <div className="m-schedule-direction__menu" role="menu">
      {routePatterns
        .filter(filterRule)
        .map((routePattern: EnhancedRoutePattern, index: number) => (
          <RoutePatternItem
            key={routePattern.id}
            routePatternIds={routePatternIds}
            routePattern={routePattern}
            selected={selectedRoutePatternId === routePattern.id}
            focused={index === focusIndex}
            duplicated={isDuplicateHeadsign(routePattern, routePatterns)}
            dispatch={dispatch}
          />
        ))}
      {hasMoreRoutePatterns(routePatterns) && showAllRoutePatterns === false && (
        <div
          id="route-pattern_uncommon"
          role="menuitem"
          tabIndex={0}
          aria-label="click for additional routes"
          className="m-schedule-direction__menu-item"
          onClick={handleClick}
          onKeyUp={(e: ReactKeyboardEvent) =>
            handleReactEnterKeyPress(e, () => {
              handleClick();
            })
          }
          onKeyDown={(e: ReactKeyboardEvent) => {
            handleNavigation(e, routePatternIds);
          }}
        >
          <div className="m-schedule-direction__menu-item-more">
            Uncommon destinations{" "}
            {renderSvg(
              "c-svg__icon m-schedule-direction__route-pattern-arrow",
              arrowIcon
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const routePatternNameById = (
  routePatterns: EnhancedRoutePattern[],
  selectedRoutePatternId: string
): string =>
  routePatterns.find(
    (routePattern: EnhancedRoutePattern) =>
      routePattern.id === selectedRoutePatternId
  )!.headsign;

/* istanbul ignore next */
const externalCloseEvent = (dispatch: Dispatch<Action>): void => {
  document.addEventListener(
    "click",
    (event: Event): void => {
      if (!event.target) return;
      const element = event.target as HTMLElement;
      if (element.closest(".js-m-schedule-click-boundary")) return;
      dispatch({ event: "closeRoutePatternMenu", payload: {} });
    },
    true
  );

  document.addEventListener(
    "keydown",
    (event: KeyboardEvent): void => {
      handleNativeEscapeKeyPress(event, () => {
        dispatch({ event: "closeRoutePatternMenu", payload: {} });
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
  const clickableMenu = routePatternsByDirection[directionId].length > 1;

  const handleClick = clickableMenu
    ? () => {
        dispatch({ event: "toggleRoutePatternMenu", payload: {} });
      }
    : /* istanbul ignore next */
      () => {};

  const linkClass = clickableMenu
    ? " m-schedule-direction__route-pattern--clickable"
    : "";

  const routePatterns = routePatternsByDirection[directionId];

  useEffect(() => {
    externalCloseEvent(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="js-m-schedule-click-boundary">
      {route.type === 3 ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={clickableMenu ? 0 : undefined}
          role={clickableMenu ? "button" : undefined}
          className={`m-schedule-direction__route-pattern${linkClass}`}
          onClick={handleClick}
          onKeyUp={e =>
            handleReactEnterKeyPress(e, () => {
              handleClick();
            })
          }
        >
          {routePatternNameById(
            routePatternsByDirection[directionId],
            selectedRoutePatternId
          )}{" "}
          {clickableMenu &&
            renderSvg(
              "c-svg__icon m-schedule-direction__route-pattern-arrow",
              arrowIcon
            )}
        </div>
      ) : (
        <div className="m-schedule-direction__route-pattern">
          {route.direction_destinations[directionId]}
        </div>
      )}
      {menuOpen && (
        <ExpandedMenu
          routePatterns={routePatterns}
          selectedRoutePatternId={selectedRoutePatternId}
          showAllRoutePatterns={showAllRoutePatterns}
          itemFocus={itemFocus}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default ScheduleDirectionMenu;
