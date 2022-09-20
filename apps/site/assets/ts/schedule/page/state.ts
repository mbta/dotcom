import React from "react";
import { updateInLocation } from "use-query-params";
import { DirectionId } from "../../__v3api";
import {
  EnhancedRoutePattern,
  RoutePatternsByDirection,
  SchedulePageData
} from "../components/__schedule";

export interface State {
  directionId: DirectionId;
  pattern: EnhancedRoutePattern;
}

export const initializeState = (
  directionId: DirectionId,
  routePatterns: RoutePatternsByDirection
): State => {
  const params = new URLSearchParams(window.location.search);

  const getDirectionId = (): DirectionId => {
    const directionIdParam = params.get("directionId");
    if (!directionIdParam) {
      return directionId;
    }

    return +directionIdParam as DirectionId;
  };

  const newDirectionId = getDirectionId();

  const getPattern = (): EnhancedRoutePattern => {
    const patternIdParam = params.get("patternId");
    if (!patternIdParam) {
      return routePatterns[newDirectionId][0];
    }

    return (
      routePatterns[newDirectionId].find(p => p.id === patternIdParam) ??
      routePatterns[newDirectionId][0]
    );
  };

  return {
    directionId: newDirectionId,
    pattern: getPattern()
  };
};

export const Actions = {
  toggleDirection: () => "toggleDirection" as const,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setDirection: (directionId: DirectionId) => ({ directionId }),
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setRoutePattern: (pattern: EnhancedRoutePattern) => ({ pattern })
};
type Action = ReturnType<typeof Actions[keyof typeof Actions]>;

const changeDirection = (
  routePatterns: RoutePatternsByDirection,
  newDirection: DirectionId,
  { pattern }: State
): State => {
  const possibleNextRoutePatternId = `${pattern.id.slice(
    0,
    -1
  )}${newDirection}`;

  const maybeNextRoutePattern = routePatterns[newDirection].find(
    p => p.id === possibleNextRoutePatternId
  );

  return {
    directionId: newDirection,
    pattern: maybeNextRoutePattern ?? routePatterns[newDirection][0]
  };
};

export const createReducer = ({
  route_patterns: routePatterns
}: SchedulePageData) => (state: State, action: Action): State => {
  const go = (): State => {
    if (action === "toggleDirection") {
      return changeDirection(
        routePatterns,
        +!state.directionId as DirectionId,
        state
      );
    }

    if ("pattern" in action) {
      return {
        ...state,
        pattern: action.pattern
      };
    }

    if ("directionId" in action) {
      return changeDirection(routePatterns, action.directionId, state);
    }

    return state;
  };

  const newState = go();
  const newQuery = {
    directionId: `${newState.directionId}`,
    patternId: `${newState.pattern.id}`
  };
  const newLoc = updateInLocation(newQuery, window.location);
  window.history.replaceState({}, "", `${newLoc.pathname}${newLoc.search}`);

  return newState;
};

export interface StateContext {
  state: State;
  dispatch: (action: Action) => void;
}

export const StateContext = React.createContext(
  (new Error(
    "StateContext used outside of Provider"
  ) as unknown) as StateContext
);
