import { RoutePatternsByDirection, EnhancedRoutePattern } from "../__schedule";
import { MapData } from "../../../leaflet/components/__mapdata";

export interface State {
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

    /* istanbul ignore next */
    default:
      return state;
  }
};
