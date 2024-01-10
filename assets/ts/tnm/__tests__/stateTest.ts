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
  realtimeScheduleDataAction,
  firstDataLoadedAction
} from "../state";
import {
  importRealtimeResponse,
  importData,
  importState
} from "./helpers/testUtils";

describe("reducer", () => {
  it("handles clickMarkerAction by selecting a stop", () => {
    const initialState: State = {
      pendingFirstData: true,
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: true,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: "1",
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: true,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: null,
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: true,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: null,
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: false,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: true,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: true,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: "1",
      shouldFilterStopCards: true,
      shouldCenterMapOnSelectedStop: false,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
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
      pendingFirstData: true,
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: true,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: { stops: [], distances: {} },
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
    };

    const expectedState: State = {
      ...initialState,
      shouldFilterStopCards: true,
      selectedModes: ["subway", "bus"]
    };

    const newState = reducer(initialState, clickModeAction(["subway", "bus"]));

    expect(newState).toEqual(expectedState);
  });

  it("handles realtimeScheduleDataAction by updating routesWithRealtimeSchedules and stopsWithRoutes", () => {
    const realtimeData = importRealtimeResponse();
    const stopsWithDistances = importData();
    const expectedState = importState();

    const initialState: State = {
      pendingFirstData: false,
      selectedStopId: null,
      shouldFilterStopCards: false,
      shouldCenterMapOnSelectedStop: false,
      routesView: true,
      selectedModes: [],
      stopsWithDistances: stopsWithDistances,
      routesWithRealtimeSchedules: [],
      stopsWithRoutes: []
    };

    const newState = reducer(
      initialState,
      realtimeScheduleDataAction(realtimeData)
    );

    expect(newState).toEqual(expectedState);
  });

  it("handles firstDataLoadedAction by toggling pendingFirstData", () => {
    const initialState: State = {
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

    const newState = reducer(initialState, firstDataLoadedAction());

    expect(newState.pendingFirstData).toEqual(false);
  });
});
