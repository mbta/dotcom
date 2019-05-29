import {
  reducer,
  clickMarkerAction,
  clickCurrentLocationAction,
  clickStopCardAction,
  clickStopPillAction,
  clickViewChangeAction,
  clickModeAction,
  StopAction,
  State,
  routeSidebarDataAction
} from "../state";
import { RouteWithStopsWithDirections } from "../../__v3api";

describe("reducer", () => {
  it("handles clickMarkerAction by selecting a stop", () => {
    const initialState: State = {
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: true,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: false
    };

    const newState = reducer(initialState, clickMarkerAction("1"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickMarkerAction by deselecting a stop", () => {
    const initialState: State = {
      selectedStopId: "1",
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: true,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: null,
      shouldCenterMapOnSelectedStop: false
    };

    const newState = reducer(initialState, clickMarkerAction("1"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickCurrentLocationAction", () => {
    const initialState: State = {
      selectedStopId: null,
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: true,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: "1",
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: false
    };

    const newState = reducer(initialState, clickCurrentLocationAction("1"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickStopCardAction", () => {
    const initialState: State = {
      selectedStopId: null,
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: false,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: "1",
      shouldCenterMapOnSelectedStop: true
    };

    const newState = reducer(initialState, clickStopCardAction("1"));

    expect(newState).toEqual(expectedState);
  });

  it("handles clickStopPillAction", () => {
    const initialState: State = {
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: true,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: false
    };

    const newState = reducer(initialState, clickStopPillAction());

    expect(newState).toEqual(expectedState);
  });

  it("handles clickViewChangeAction", () => {
    const initialState: State = {
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: true,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };
    const expectedState: State = {
      ...initialState,
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: false,
      routesView: false
    };

    const newState = reducer(initialState, clickViewChangeAction());

    expect(newState).toEqual(expectedState);
  });

  it("would return default state if provided unknown type (but type is enforced by TS)", () => {
    const initialState: State = {
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: false,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };

    const action: StopAction = {
      // @ts-ignore
      type: "unknown",
      payload: { stopId: "null" }
    };
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it("handles clickModeAction", () => {
    const initialState: State = {
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: true,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };

    const expectedState: State = {
      ...initialState,
      shouldFilterStopCards: true,
      selectedModes: ["subway", "bus"]
    };

    const newState = reducer(initialState, clickModeAction(["subway", "bus"]));

    expect(newState).toEqual(expectedState);
  });

  it("handles routeSidebarDataAction by updating route sidebar data", () => {
    const initialState: State = {
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: false,
      routeSidebarData: [],
      routesView: true,
      selectedModes: []
    };

    /* eslint-disable @typescript-eslint/camelcase */
    const routeSidebarData: RouteWithStopsWithDirections[] = [
      {
        route: {
          id: "id",
          alert_count: 0,
          description: "",
          direction_destinations: { 0: "", 1: "" },
          direction_names: { 0: "", 1: "" },
          header: "",
          long_name: "",
          name: "",
          type: 1
        },
        stops_with_directions: []
      }
    ];
    /* eslint-enable typescript/camelcase */

    const expectedState = {
      ...initialState,
      routeSidebarData
    };

    const newState = reducer(
      initialState,
      routeSidebarDataAction(routeSidebarData)
    );
    expect(newState).toEqual(expectedState);
  });
});
