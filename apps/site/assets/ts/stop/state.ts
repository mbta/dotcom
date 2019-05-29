import { Mode } from "../__v3api";
import { ClickExpandableBlockAction } from "../components/ExpandableBlock";
import { TypedRoutes } from "./components/__stop";

export type SelectedStopType = string | null;
export type SelectedTabType = string;
export type Dispatch = (action: Action) => void;
export type ExpandableBlockName = "parking" | "accessibility";
export interface ExpandableBlockState {
  parking: boolean;
  accessibility: boolean;
}

export interface State {
  expandedBlocks: ExpandableBlockState;
  focusedBlock?: ExpandableBlockName;
  routes: TypedRoutes[];
  selectedStopId: SelectedStopType;
  selectedModes: Mode[];
  shouldFilterStopCards: boolean;
  selectedTab: string;
}

type StopActionType = "CLICK_MARKER";
type ModeActionType = "CLICK_MODE_FILTER";
type RoutePillActionType = "CLICK_ROUTE_PILL";
type TabActionType = "SWITCH_TAB";
type FeaturePillActionType = "CLICK_FEATURE_PILL";
type UpdateRoutesType = "UPDATE_ROUTES";

export interface StopAction {
  type: StopActionType;
  payload: {
    stopId: SelectedStopType;
  };
}

export interface ModeAction {
  type: ModeActionType;
  payload: {
    mode: Mode;
  };
}

export interface RoutePillAction {
  type: RoutePillActionType;
  payload: {
    mode: Mode;
  };
}

export interface TabAction {
  type: TabActionType;
  payload: {
    tab: SelectedTabType;
  };
}

export interface FeaturePillAction {
  type: FeaturePillActionType;
  payload: {
    name: ExpandableBlockName;
  };
}
export interface UpdateRoutesAction {
  type: UpdateRoutesType;
  payload: {
    routes: TypedRoutes[];
  };
}

type Action =
  | StopAction
  | ModeAction
  | RoutePillAction
  | FeaturePillAction
  | ClickExpandableBlockAction
  | UpdateRoutesAction
  | TabAction;

export const clickMarkerAction = (stopId: SelectedStopType): StopAction => ({
  type: "CLICK_MARKER",
  payload: { stopId }
});

export const clickModeAction = (mode: Mode): ModeAction => ({
  type: "CLICK_MODE_FILTER",
  payload: { mode }
});

export const clickRoutePillAction = (mode: Mode): RoutePillAction => ({
  type: "CLICK_ROUTE_PILL",
  payload: { mode }
});

export const clickTabAction = (tab: string): TabAction => ({
  type: "SWITCH_TAB",
  payload: { tab }
});

export const clickFeaturePillAction = (
  name: ExpandableBlockName
): FeaturePillAction => ({
  type: "CLICK_FEATURE_PILL",
  payload: { name }
});

export const updateRoutesAction = (
  routes: TypedRoutes[]
): UpdateRoutesAction => ({
  type: "UPDATE_ROUTES",
  payload: { routes }
});

const stopReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLICK_MARKER": {
      const target =
        state.selectedStopId === action.payload.stopId
          ? null
          : action.payload.stopId;

      return {
        ...state,
        focusedBlock: undefined,
        selectedStopId: target,
        shouldFilterStopCards: !!target
      };
    }
    default:
      return state;
  }
};

const updateModes = (selectedModes: Mode[], mode: Mode): Mode[] =>
  selectedModes.includes(mode)
    ? selectedModes.filter(existingMode => !(existingMode === mode))
    : [...selectedModes, mode];

const modeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLICK_MODE_FILTER":
      return {
        ...state,
        focusedBlock: undefined,
        selectedTab: "info",
        selectedModes: updateModes(state.selectedModes, action.payload.mode),
        shouldFilterStopCards: true
      };

    case "CLICK_ROUTE_PILL":
      return {
        ...state,
        focusedBlock: undefined,
        selectedTab: "info",
        selectedModes: [action.payload.mode],
        shouldFilterStopCards: true
      };

    default:
      return state;
  }
};

const tabReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SWITCH_TAB":
      return {
        ...state,
        focusedBlock: undefined,
        selectedTab: action.payload.tab
      };

    default:
      return state;
  }
};
const sidebarReducer = (state: State, action: Action): State => {
  const { expandedBlocks } = state;

  switch (action.type) {
    case "CLICK_FEATURE_PILL":
      expandedBlocks[action.payload.name] = true;
      return {
        ...state,
        expandedBlocks,
        focusedBlock: action.payload.name,
        selectedTab: "info"
      };

    case "CLICK_EXPANDABLE_BLOCK":
      if (
        action.payload.id === "parking" ||
        action.payload.id === "accessibility"
      ) {
        expandedBlocks[action.payload.id] = !action.payload.expanded;
        return {
          ...state,
          expandedBlocks,
          selectedTab: "info"
        };
      }

      return state;

    default:
      return state;
  }
};

const routesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_ROUTES":
      return {
        ...state,
        routes: action.payload.routes
      };

    default:
      return state;
  }
};

export const reducer = (state: State, action: Action): State =>
  [tabReducer, stopReducer, modeReducer, routesReducer, sidebarReducer].reduce(
    (acc, fn) => fn(acc, action),
    state
  );

export const initialState = (tab: string, routes: TypedRoutes[]): State => ({
  expandedBlocks: {
    accessibility: true,
    parking: false
  },
  routes,
  selectedStopId: null,
  selectedModes: [],
  shouldFilterStopCards: false,
  selectedTab: tab
});
