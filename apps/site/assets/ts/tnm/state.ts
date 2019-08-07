import * as googleMaps from "../leaflet/state";
import { Mode, RouteWithStopsWithDirections } from "../__v3api";
import {
  StopsWithDistances,
  RealtimeScheduleData,
  StopWithRoutes
} from "./components/__tnm";
import {
  transformRoutes,
  transformStops
} from "./helpers/process-realtime-data";

export type SelectedStopType = string | null;

export const { clickMarkerAction } = googleMaps;

export const { clickCurrentLocationAction } = googleMaps;

export interface State {
  pendingFirstData: boolean;
  selectedStopId: SelectedStopType;
  selectedModes: Mode[];
  shouldFilterStopCards: boolean;
  shouldCenterMapOnSelectedStop: boolean;
  routesView: boolean;
  stopsWithDistances: StopsWithDistances;
  routesWithRealtimeSchedules: RouteWithStopsWithDirections[];
  stopsWithRoutes: StopWithRoutes[];
}

export type Dispatch = (action: Action) => void;

type StopActionType =
  | googleMaps.MapActionType
  | "CLICK_STOP_CARD"
  | "CLICK_STOP_PILL"
  | "CLICK_VIEW_CHANGE";

type ModeActionType = "CLICK_MODE_FILTER";

type RealtimeScheduleDataActionType = "UPDATE_REALTIME_SCHEDULE_DATA";

type FirstDataLoadedType = "FIRST_DATA_LOADED";

export interface RealtimeScheduleDataAction {
  type: RealtimeScheduleDataActionType;
  payload: {
    data: RealtimeScheduleData[];
  };
}

export const realtimeScheduleDataAction = (
  realtimeScheduleData: RealtimeScheduleData[]
): RealtimeScheduleDataAction => ({
  type: "UPDATE_REALTIME_SCHEDULE_DATA",
  payload: {
    data: realtimeScheduleData
  }
});

export interface FirstDataLoadedAction {
  type: FirstDataLoadedType;
  payload: object;
}

export const firstDataLoadedAction = (): FirstDataLoadedAction => ({
  type: "FIRST_DATA_LOADED",
  payload: {}
});

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

type ResetActionType = "RESET_SHOULD_CENTER_MAP";

export interface ResetAction {
  type: ResetActionType;
  payload: {
    data: SelectedStopType;
  };
}

type Action =
  | StopAction
  | ModeAction
  | ResetAction
  | RealtimeScheduleDataAction
  | FirstDataLoadedAction;

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

const realtimeDataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_REALTIME_SCHEDULE_DATA":
      return {
        ...state,
        routesWithRealtimeSchedules: transformRoutes(
          state.stopsWithDistances.distances,
          state.routesWithRealtimeSchedules,
          action.payload.data
        ),
        stopsWithRoutes: transformStops(
          state.stopsWithDistances.distances,
          state.stopsWithRoutes,
          action.payload.data
        )
      };

    case "FIRST_DATA_LOADED":
      return {
        ...state,
        pendingFirstData: false
      };

    default:
      return state;
  }
};

export const reducer = (state: State, action: Action): State =>
  [stopReducer, modeReducer, realtimeDataReducer].reduce(
    (accumulator, fn) => fn(accumulator, action),
    state
  );

export const initialState: State = {
  pendingFirstData: true,
  selectedStopId: null,
  shouldFilterStopCards: false,
  shouldCenterMapOnSelectedStop: false,
  routesView: true,
  selectedModes: [],
  stopsWithDistances: { stops: [], distances: {} },
  routesWithRealtimeSchedules: [],
  stopsWithRoutes: []
};
