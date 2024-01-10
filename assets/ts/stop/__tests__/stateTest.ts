import {
  reducer,
  clickMarkerAction,
  StopAction,
  clickModeAction,
  State,
  clickRoutePillAction,
  clickFeaturePillAction,
  updateRoutesAction
} from "../state";
import { ClickExpandableBlockAction } from "../../components/ExpandableBlock";
import { TypedRoutes } from "../components/__stop";

describe("reducer", () => {
  it("handles clickMarkerAction by selecting a stop", () => {
    const initialState: State = {
      expandedBlocks: { parking: false, accessibility: false },
      routes: [],
      selectedStopId: null,
      selectedModes: [],
      shouldFilterStopCards: false,
      selectedTab: "info"
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: "1",
      shouldFilterStopCards: true,
      selectedTab: "info"
    };

    const newState = reducer(initialState, clickMarkerAction("1"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickMarkerAction by deselecting a stop", () => {
    const initialState: State = {
      expandedBlocks: { parking: false, accessibility: false },
      routes: [],
      selectedStopId: "1",
      selectedModes: [],
      shouldFilterStopCards: true,
      selectedTab: "info"
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: null,
      shouldFilterStopCards: false,
      selectedTab: "info"
    };

    const newState = reducer(initialState, clickMarkerAction("1"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickModeAction by adding a mode to filter by", () => {
    const initialState: State = {
      expandedBlocks: { parking: false, accessibility: false },
      routes: [],
      selectedStopId: null,
      selectedModes: ["subway"],
      shouldFilterStopCards: false,
      selectedTab: "alerts"
    };
    const expectedState: State = {
      ...initialState,
      selectedModes: ["subway", "bus"],
      shouldFilterStopCards: true,
      selectedTab: "info"
    };

    const newState = reducer(initialState, clickModeAction("bus"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickModeAction by removing a mode to filter by", () => {
    const initialState: State = {
      expandedBlocks: { parking: false, accessibility: false },
      routes: [],
      selectedStopId: null,
      selectedModes: ["subway", "bus"],
      shouldFilterStopCards: false,
      selectedTab: "info"
    };
    const expectedState: State = {
      ...initialState,
      selectedModes: ["subway"],
      shouldFilterStopCards: true,
      selectedTab: "info"
    };

    const newState = reducer(initialState, clickModeAction("bus"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickRoutePillAction by replacing mode to filter by", () => {
    const initialState: State = {
      expandedBlocks: { parking: false, accessibility: false },
      routes: [],
      selectedStopId: null,
      selectedModes: ["subway"],
      shouldFilterStopCards: true,
      selectedTab: "alerts"
    };
    const expectedState: State = {
      ...initialState,
      selectedModes: ["bus"],
      selectedTab: "info"
    };

    const newState = reducer(initialState, clickRoutePillAction("bus"));
    expect(newState).toEqual(expectedState);
  });

  it("handles clickFeaturePillAction by updating expandedBlock state", () => {
    const expandedBlocks = { parking: false, accessibility: false };

    const initialState: State = {
      expandedBlocks,
      routes: [],
      selectedStopId: "1",
      selectedModes: [],
      selectedTab: "info",
      shouldFilterStopCards: false
    };

    const expectedState: State = {
      ...initialState,
      focusedBlock: "parking",
      expandedBlocks: { ...expandedBlocks, parking: true }
    };

    const newState = reducer(initialState, clickFeaturePillAction("parking"));
    expect(newState).toEqual(expectedState);
  });

  it("handles clickExpandableBlockAction by updating expandedBlock state", () => {
    const expandedBlocks = { parking: false, accessibility: false };

    const initialState: State = {
      expandedBlocks,
      routes: [],
      selectedStopId: "1",
      selectedModes: [],
      selectedTab: "info",
      shouldFilterStopCards: false
    };

    const action: ClickExpandableBlockAction = {
      type: "CLICK_EXPANDABLE_BLOCK",
      payload: {
        id: "parking",
        expanded: false,
        focused: false
      }
    };

    const expectedState: State = {
      ...initialState,
      expandedBlocks: { ...expandedBlocks, parking: true }
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("does not update state if clickExpandableBlockAction is not parking or accessibility", () => {
    const expandedBlocks = { parking: false, accessibility: false };

    const initialState: State = {
      expandedBlocks,
      routes: [],
      selectedStopId: "1",
      selectedModes: [],
      selectedTab: "info",
      shouldFilterStopCards: false
    };

    const action: ClickExpandableBlockAction = {
      type: "CLICK_EXPANDABLE_BLOCK",
      payload: {
        id: "bicycles",
        expanded: false,
        focused: false
      }
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("handles routeSidebarDataAction by updating the route list", () => {
    const initialState: State = {
      expandedBlocks: { parking: false, accessibility: false },
      routes: [],
      selectedStopId: null,
      selectedModes: [],
      selectedTab: "info",
      shouldFilterStopCards: false
    };

    /* eslint-disable camelcase */
    const routes: TypedRoutes[] = [
      {
        group_name: "subway",
        routes: []
      }
    ];
    /* eslint-disable camelcase */
    const expectedState: State = {
      ...initialState,
      routes
    };

    const newState = reducer(initialState, updateRoutesAction(routes));
    expect(newState).toEqual(expectedState);
  });

  const initialState: State = {
    expandedBlocks: { parking: false, accessibility: false },
    routes: [],
    selectedStopId: "1",
    selectedModes: [],
    shouldFilterStopCards: false,
    selectedTab: "info"
  };

  const action: StopAction = {
    // @ts-ignore
    type: "unknown",
    payload: { stopId: "null" }
  };
  const newState = reducer(initialState, action);

  expect(newState).toEqual(initialState);
});
