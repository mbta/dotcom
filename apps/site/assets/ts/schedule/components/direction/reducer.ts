import { updateInLocation } from "use-query-params";
import { DirectionId, Shape } from "../../../__v3api";
import {
  ShapesById,
  RoutePatternsByDirection,
  EnhancedRoutePattern
} from "../__schedule";
import { MapData } from "../../../leaflet/components/__mapdata";

export interface State {
  routePattern: EnhancedRoutePattern;
  shape: Shape;
  directionId: DirectionId;
  shapesById: ShapesById;
  routePatternsByDirection: RoutePatternsByDirection;
  routePatternMenuOpen: boolean;
  routePatternMenuAll: boolean;
  itemFocus: string | null;
}

export interface Payload {
  routePattern?: EnhancedRoutePattern;
}

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

const updateDirectionInURL = (directionId: DirectionId): void => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { direction_id: directionId.toString() };
  const newLoc = updateInLocation(query, window.location);
  // newLoc is not a true Location, so toString doesn't work
  window.history.replaceState({}, "", `${newLoc.pathname}${newLoc.search}`);
};

const toggleDirection = (state: State): State => {
  const nextDirection = state.directionId === 0 ? 1 : 0;
  updateDirectionInURL(nextDirection);
  const [defaultRoutePatternForDirection] = state.routePatternsByDirection[
    nextDirection
  ];
  return {
    ...state,
    directionId: nextDirection,
    routePattern: defaultRoutePatternForDirection,
    shape: state.shapesById[defaultRoutePatternForDirection.shape_id],
    itemFocus: "first"
  };
};

const toggleRoutePatternMenu = (state: State): State => ({
  ...state,
  routePatternMenuOpen: !state.routePatternMenuOpen,
  itemFocus: "first"
});

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
      return {
        ...state,
        routePattern: action.payload!.routePattern!,
        shape: state.shapesById[action.payload!.routePattern!.shape_id],
        routePatternMenuOpen: false,
        itemFocus: null
      };

    /* istanbul ignore next */
    default:
      return state;
  }
};
