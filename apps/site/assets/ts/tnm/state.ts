import * as googleMaps from "../leaflet/state";

import { Mode, RouteWithStopsWithDirections } from "../__v3api";

export type SelectedStopType = string | null;

export const { clickMarkerAction } = googleMaps;

export const { clickCurrentLocationAction } = googleMaps;

export interface State {
  selectedStopId: SelectedStopType;
  selectedModes: Mode[];
  shouldFilterStopCards: boolean;
  shouldCenterMapOnSelectedStop: boolean;
  routeSidebarData: RouteWithStopsWithDirections[];
  routesView: boolean;
}

export type Dispatch = (action: Action) => void;

type StopActionType =
  | googleMaps.MapActionType
  | "CLICK_STOP_CARD"
  | "CLICK_STOP_PILL"
  | "CLICK_VIEW_CHANGE";

type ModeActionType = "CLICK_MODE_FILTER";

type RouteSidebarDataActionType = "UPDATE_ROUTE_SIDEBAR_DATA";

export interface ModeAction {
  type: ModeActionType;
  payload: {
    modes: Mode[];
  };
}

export interface StopAction {
  type: StopActionType;
  payload: {
    stopId: SelectedStopType;
  };
}

export interface RouteSidebarDataAction {
  type: RouteSidebarDataActionType;
  payload: {
    data: RouteWithStopsWithDirections[];
  };
}

type ResetActionType = "RESET_SHOULD_CENTER_MAP";

export interface ResetAction {
  type: ResetActionType;
  payload: {
    data: SelectedStopType;
  };
}

type Action = StopAction | ModeAction | RouteSidebarDataAction | ResetAction;

export const clickStopCardAction = (stopId: SelectedStopType): StopAction => ({
  type: "CLICK_STOP_CARD",
  payload: { stopId }
});

export const clickStopPillAction = (): StopAction => ({
  type: "CLICK_STOP_PILL",
  payload: { stopId: null }
});

export const clickViewChangeAction = (): StopAction => ({
  type: "CLICK_VIEW_CHANGE",
  payload: { stopId: null }
});

export const clickModeAction = (modes: Mode[]): ModeAction => ({
  type: "CLICK_MODE_FILTER",
  payload: { modes }
});

export const resetCenterMapOnSelectedStop = (
  stopId: SelectedStopType
): ResetAction => ({
  type: "RESET_SHOULD_CENTER_MAP",
  payload: { data: stopId }
});

export const routeSidebarDataAction = (
  data: RouteWithStopsWithDirections[]
): RouteSidebarDataAction => ({
  type: "UPDATE_ROUTE_SIDEBAR_DATA",
  payload: { data }
});

const stopReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLICK_CURRENT_LOCATION_MARKER":
    case "CLICK_MARKER": {
      const target =
        state.selectedStopId === action.payload.stopId
          ? null
          : action.payload.stopId;

      // selecting a stop pin can turn on filtering,
      // but unselecting a stop pin should not turn off mode filtering
      const shouldFilterStopCards = target
        ? action.type === "CLICK_MARKER"
        : state.shouldFilterStopCards;

      return {
        ...state,
        shouldFilterStopCards,
        selectedStopId: target,
        shouldCenterMapOnSelectedStop: false
      };
    }
    case "CLICK_STOP_CARD":
      return {
        ...state,
        selectedStopId: action.payload.stopId,
        shouldFilterStopCards: state.shouldFilterStopCards,
        shouldCenterMapOnSelectedStop: true
      };
    case "RESET_SHOULD_CENTER_MAP":
      return {
        ...state,
        shouldCenterMapOnSelectedStop: false
      };
    case "CLICK_STOP_PILL":
      return {
        ...state,
        selectedStopId: null,
        shouldFilterStopCards: false,
        shouldCenterMapOnSelectedStop: false
      };
    case "CLICK_VIEW_CHANGE":
      return {
        ...state,
        selectedStopId: null,
        shouldFilterStopCards: false,
        shouldCenterMapOnSelectedStop: false,
        selectedModes: [],
        routesView: !state.routesView
      };
    default:
      return state;
  }
};

const modeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLICK_MODE_FILTER":
      return {
        ...state,
        selectedModes: action.payload.modes,
        shouldFilterStopCards: true
      };
    default:
      return state;
  }
};

const routeSidebarDataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_ROUTE_SIDEBAR_DATA":
      return {
        ...state,
        routeSidebarData: action.payload.data
      };

    default:
      return state;
  }
};

export const reducer = (state: State, action: Action): State =>
  [stopReducer, modeReducer, routeSidebarDataReducer].reduce(
    (accumulator, fn) => fn(accumulator, action),
    state
  );

export const initialState: State = {
  selectedStopId: null,
  shouldFilterStopCards: false,
  shouldCenterMapOnSelectedStop: false,
  routeSidebarData: [],
  routesView: true,
  selectedModes: []
};
