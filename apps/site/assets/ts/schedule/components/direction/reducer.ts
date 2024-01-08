import { updateInLocation } from "use-query-params";
import { DirectionId } from "../../../__v3api";
import { RoutePatternsByDirection, EnhancedRoutePattern } from "../__schedule";
import { MapData } from "../../../leaflet/components/__mapdata";
import { dispatchChangedDirection } from "../../../hooks/useDirectionChangeEvent";

export interface State {
  routePattern: EnhancedRoutePattern;
  directionId: DirectionId;
  routePatternsByDirection: RoutePatternsByDirection;
  routePatternMenuOpen: boolean;
  routePatternMenuAll: boolean;
  itemFocus: string | null;
}

export interface Payload {
  routePattern?: EnhancedRoutePattern;
}

export const toggleDirectionAction = (): MenuAction => ({
  type: "toggleDirection"
});

export const setRoutePatternAction = (
  routePattern: EnhancedRoutePattern
): MenuAction => ({
  type: "setRoutePattern",
  payload: { routePattern }
});

export const toggleRoutePatternMenuAction = (): MenuAction => ({
  type: "toggleRoutePatternMenu"
});

export const closeRoutePatternMenuAction = (): MenuAction => ({
  type: "closeRoutePatternMenu"
});

export const showAllRoutePatternsAction = (): MenuAction => ({
  type: "showAllRoutePatterns"
});

export interface MenuAction {
  type:
    | "toggleDirection"
    | "setRoutePattern"
    | "toggleRoutePatternMenu"
    | "closeRoutePatternMenu"
    | "showAllRoutePatterns";
  payload?: Payload;
}

export type FetchAction =
  | { type: "FETCH_COMPLETE"; payload: MapData[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

const updateDirectionAndVariantInURL = (
  directionId: DirectionId,
  routePatternId: string
): void => {
  const query = {
    // eslint-disable-next-line camelcase
    "schedule_direction[direction_id]": directionId.toString(),
    "schedule_direction[variant]": routePatternId
  };
  const newLoc = updateInLocation(query, window.location);
  // Turbolinks and react router do not get along.  Setting the state to the existing turbo links state
  // allows navigation between the stop page and the schedule page.  Though an error is breifly seen
  // before the full resolution
  // newLoc is not a true Location, so toString doesn't work
  window.history.replaceState(
    window.history.state,
    "",
    `${newLoc.pathname}${newLoc.search}`
  );
};

const toggleDirection = (state: State): State => {
  const nextDirection = state.directionId === 0 ? 1 : 0;

  // attempt to find the same route pattern for the opposite direction
  const possibleNextRoutePattern = `${state.routePattern.id.slice(
    0,
    -1
  )}${nextDirection}`;

  const nextRoutePattern = state.routePatternsByDirection[nextDirection].find(
    element => element.id === possibleNextRoutePattern
  );

  const defaultRoutePatternForDirection =
    nextRoutePattern || state.routePatternsByDirection[nextDirection][0];

  updateDirectionAndVariantInURL(
    nextDirection,
    defaultRoutePatternForDirection.id
  );

  // notify other components of change
  dispatchChangedDirection(nextDirection);

  return {
    ...state,
    directionId: nextDirection,
    routePattern: defaultRoutePatternForDirection,
    itemFocus: "first"
  };
};

const toggleRoutePatternMenu = (state: State): State => ({
  ...state,
  routePatternMenuOpen: !state.routePatternMenuOpen,
  itemFocus: "first"
});

const setRoutePattern = (state: State, data: Payload): State => {
  const newRoutePattern = data!.routePattern!;
  updateDirectionAndVariantInURL(state.directionId, newRoutePattern.id);
  return {
    ...state,
    routePattern: newRoutePattern,
    routePatternMenuOpen: false,
    itemFocus: null
  };
};

const showAllRoutePatterns = (state: State): State => ({
  ...state,
  routePatternMenuAll: true,
  itemFocus: "first-uncommon"
});

export const menuReducer = (state: State, action: MenuAction): State => {
  switch (action.type) {
    case "toggleDirection":
      return toggleDirection(state);

    case "toggleRoutePatternMenu":
      return toggleRoutePatternMenu(state);

    case "showAllRoutePatterns":
      return showAllRoutePatterns(state);

    case "closeRoutePatternMenu":
      return {
        ...state,
        routePatternMenuOpen: false,
        itemFocus: null
      };

    case "setRoutePattern":
      return setRoutePattern(state, action.payload!);

    /* istanbul ignore next */
    default:
      return state;
  }
};
