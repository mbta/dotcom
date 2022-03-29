import React, {
  ReactElement,
  Dispatch,
  useReducer,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent
} from "react";
import { reducer } from "../../../../../assets/ts/helpers/fetch";
import { DirectionId, EnhancedRoute, Route } from "../../../__v3api";
import { MenuAction, toggleRoutePatternMenuAction } from "./reducer";
import renderSvg from "../../../helpers/render-svg";
import handleNavigation from "./menu-helpers";
import arrowIcon from "../../../../static/images/icon-down-arrow.svg";
import checkIcon from "../../../../static/images/icon-checkmark.svg";
import iconGreenB from "../../../../static/images/icon-green-line-b-small.svg";
import iconGreenC from "../../../../static/images/icon-green-line-c-small.svg";
import iconGreenD from "../../../../static/images/icon-green-line-d-small.svg";
import iconGreenE from "../../../../static/images/icon-green-line-e-small.svg";
import iconGreen from "../../../../static/images/icon-green-line-small.svg";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events";
import { getIsGlxOpen } from "../../../components/GlxOpen";


let destinations:Map<string, any> = new Map();
destinations.set("Green", ["All branches", "All branches"]);
Promise.resolve(
window.fetch &&
window
  .fetch(`/schedules/green_termini_api`)
  .then(response => {
    if (response.ok)
      return response.json();
    throw new Error(response.statusText);
  })
  .then(
    result => {
      for (let key in result)
        destinations.set(key, result[key]);
    }
  )
);

interface GreenLineSelectProps {
  routeId: string;
  dispatch: Dispatch<MenuAction>;
  directionId: DirectionId;
}

interface ExpandedGreenMenuProps {
  route: EnhancedRoute;
  directionId: DirectionId;
}

interface GreenRoute {
  id: string;
  name: string;
  direction_destinations: any;
  icon: string;
}

interface GreenLineItem {
  routeIds: string[];
  route: GreenRoute;
  selected: boolean;
  focused: boolean;
  directionId: DirectionId;
}

/* eslint-disable camelcase */
const greenRoutes: GreenRoute[] = [
  {
    id: "Green",
    name: "Green Line",
    direction_destinations: ["All branches", "All branches"],
    icon: iconGreen
  },
  {
    id: "Green-B",
    name: "Green Line B",
    direction_destinations:  ["Boston College", "Government Center"],
    icon: iconGreenB
  },
  {
    id: "Green-C",
    name: "Green Line C",
    direction_destinations: ["Cleveland Circle", "Government Center"],
    icon: iconGreenC
  },
  {
    id: "Green-D",
    name: "Green Line D",
    direction_destinations: ["Riverside", "North Station"],
    icon: iconGreenD
  },
  {
    id: "Green-E",
    name: "Green Line E",
    direction_destinations: getIsGlxOpen("place-unsqu")
      ? ["Heath Street", "Union Square"]
      : ["Heath Street", "Lechmere"],
    icon: iconGreenE
  }
];

export const GreenLineItem = ({
  directionId,
  routeIds,
  route,
  selected,
  focused
}: GreenLineItem): ReactElement<HTMLElement> => {
  const selectedClass = selected ? " m-schedule-direction__menu--selected" : "";
  const icon = selected ? (
    <div className="m-schedule-direction__checkmark">
      {renderSvg("c-svg__icon", checkIcon)}
    </div>
  ) : null;
  const handleClick = (): void => {
    window.location.assign(
      `/schedules/${route.id}?direction_id=${directionId}`
    );
  };

  return (
    <div
      aria-current={selected ? "page" : undefined}
      id={`route-pattern_${route.id}`}
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
        handleNavigation(e, routeIds);
      }}
      ref={item => item && focused && item.focus()}
    >
      <div className="m-schedule-direction__menu-item-headsign">
        {icon}
        {renderSvg(
          "c-svg__icon m-schedule-direction__menu-item-icon",
          route.icon
        )}
        <span className="sr-only">{route.name}</span>
        {route.direction_destinations[directionId]}
      </div>
    </div>
  );
};

export const ExpandedGreenMenu = ({
  route,
  directionId
}: ExpandedGreenMenuProps): ReactElement<HTMLElement> => {
  const routeIds = greenRoutes.map(greenRoute => greenRoute.id);
  return (
    <div className="m-schedule-direction__menu" role="menu">
      {greenRoutes.map((greenRoute: GreenRoute, index: number) => (
        <GreenLineItem
          directionId={directionId}
          key={greenRoute.id}
          routeIds={routeIds}
          route={greenRoute}
          selected={route.id === greenRoute.id}
          focused={index === 0}
        />
      ))}
    </div>
  );
};

export const GreenLineSelect = ({
  routeId,
  dispatch,
  directionId
}: GreenLineSelectProps): ReactElement<HTMLElement> => {
  const handleClick = (): void => {
    dispatch(toggleRoutePatternMenuAction());
  };

  const route = greenRoutes.find(greenRoute => greenRoute.id === routeId)!;
  
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="button"
      className="m-schedule-direction__route-pattern m-schedule-direction__route-pattern--clickable"
      onClick={handleClick}
      onKeyUp={e =>
        handleReactEnterKeyPress(e, () => {
          handleClick();
        })
      }
    >
      {destinations.size > 1 ? destinations.get(routeId)[directionId] : []}{" "}
      {renderSvg(
        "c-svg__icon m-schedule-direction__route-pattern-arrow",
        arrowIcon
      )}
    </div>
  );
};
