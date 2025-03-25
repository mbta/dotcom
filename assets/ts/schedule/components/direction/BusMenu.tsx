import React, {
  ReactElement,
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent
} from "react";
import {
  MenuAction,
  setRoutePatternAction,
  toggleRoutePatternMenuAction
} from "./reducer";
import { EnhancedRoutePattern } from "../__schedule";
import handleNavigation from "./menu-helpers";
import renderSvg from "../../../helpers/render-svg";
import arrowIcon from "../../../../../priv/static/icon-svg/icon-down-arrow.svg";
import checkIcon from "../../../../../priv/static/icon-svg/icon-checkmark.svg";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events-react";

interface ExpandedBusMenuProps {
  routePatterns: EnhancedRoutePattern[];
  selectedRoutePatternId: string;
  dispatch: Dispatch<MenuAction>;
}

interface RoutePatternItem {
  routePatternIds: string[];
  routePattern: EnhancedRoutePattern;
  selected: boolean;
  duplicated: boolean;
  dispatch: Dispatch<MenuAction>;
}

interface BusMenuSelectProps {
  routePatterns: EnhancedRoutePattern[];
  selectedRoutePatternId: string;
  dispatch: Dispatch<MenuAction>;
}

const typicalityDefaultText = (typicality: number): string => {
  if (typicality === 1) return "typical route";
  if (typicality === 2) return "less common route";
  return "";
};

const RoutePatternItem = ({
  routePatternIds,
  routePattern,
  selected,
  duplicated,
  dispatch
}: RoutePatternItem): ReactElement<HTMLElement> => {
  const selectedClass = selected ? " m-schedule-direction__menu--selected" : "";

  const icon = selected ? (
    <div className="m-schedule-direction__checkmark">
      {renderSvg("c-svg__icon", checkIcon)}
    </div>
  ) : null;

  const handleClick = (): void => dispatch(setRoutePatternAction(routePattern));

  return (
    <div
      aria-current={selected ? "page" : undefined}
      id={`route-pattern_${routePattern.id}`}
      tabIndex={0}
      role="menuitem"
      className={`m-schedule-direction__menu-item${selectedClass}`}
      onClick={handleClick}
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

const isDuplicateHeadsign = (
  compareRoutePattern: EnhancedRoutePattern,
  routePatterns: EnhancedRoutePattern[]
): boolean =>
  routePatterns.filter(
    (routePattern: EnhancedRoutePattern) =>
      routePattern.id !== compareRoutePattern.id &&
      routePattern.headsign === compareRoutePattern.headsign
  ).length > 0;

export const ExpandedBusMenu = ({
  routePatterns,
  selectedRoutePatternId,
  dispatch
}: ExpandedBusMenuProps): ReactElement<HTMLElement> => {
  const regularRoutePatterns = routePatterns.filter(
    (routePattern: EnhancedRoutePattern) => routePattern.typicality < 3
  );
  const uncommonRoutePatterns = routePatterns.filter(
    (routePattern: EnhancedRoutePattern) => routePattern.typicality >= 3
  );

  const routePatternIds = routePatterns.map(
    (routePattern: EnhancedRoutePattern) => routePattern.id
  );

  return (
    <div className="m-schedule-direction__menu" role="menu">
      {regularRoutePatterns.map((routePattern: EnhancedRoutePattern) => (
        <RoutePatternItem
          key={routePattern.id}
          routePatternIds={routePatternIds}
          routePattern={routePattern}
          selected={selectedRoutePatternId === routePattern.id}
          duplicated={isDuplicateHeadsign(routePattern, routePatterns)}
          dispatch={dispatch}
        />
      ))}
      {hasMoreRoutePatterns(routePatterns) && (
        <>
          <div className="m-schedule-direction__menu-item-spacer">
            Uncommon destinations
          </div>
          {uncommonRoutePatterns.map((routePattern: EnhancedRoutePattern) => (
            <RoutePatternItem
              key={routePattern.id}
              routePatternIds={routePatternIds}
              routePattern={routePattern}
              selected={selectedRoutePatternId === routePattern.id}
              duplicated={isDuplicateHeadsign(routePattern, routePatterns)}
              dispatch={dispatch}
            />
          ))}
        </>
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

export const BusMenuSelect = ({
  routePatterns,
  selectedRoutePatternId,
  dispatch
}: BusMenuSelectProps): ReactElement<HTMLElement> => {
  const isMenuClickable = routePatterns.length > 1;

  const handleClick = isMenuClickable
    ? () => {
        dispatch(toggleRoutePatternMenuAction());
      }
    : /* istanbul ignore next */
      () => {};

  const linkClass = isMenuClickable
    ? " m-schedule-direction__route-pattern--clickable"
    : "";

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={isMenuClickable ? 0 : undefined}
      role={isMenuClickable ? "button" : undefined}
      className={`m-schedule-direction__route-pattern${linkClass} notranslate`}
      onClick={handleClick}
      onKeyUp={e =>
        handleReactEnterKeyPress(e, () => {
          handleClick();
        })
      }
    >
      {routePatternNameById(routePatterns, selectedRoutePatternId)}{" "}
      {isMenuClickable &&
        renderSvg(
          "c-svg__icon m-schedule-direction__route-pattern-arrow",
          arrowIcon
        )}
    </div>
  );
};
