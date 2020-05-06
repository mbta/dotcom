import {
  Action,
  scheduleStoreReducer,
  StoreProps
} from "../store/ScheduleStore";

const mockState: StoreProps = {
  selectedDirection: 0,
  selectedOrigin: null,
  selectedDestination: null,
  modalMode: "schedule",
  modalOpen: true
};

describe("Schedule store reducer", () => {
  it("Handles INITIALIZE", () => {
    const action: Action = {
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection: 0,
        selectedOrigin: null,
        selectedDestination: null,
        modalMode: "schedule",
        modalOpen: true
      }
    };
    expect(
      scheduleStoreReducer(
        {
          selectedDirection: 0,
          selectedOrigin: null,
          selectedDestination: null,
          modalMode: "schedule",
          modalOpen: true
        },
        action
      )
    ).toEqual(mockState);
  });

  it("Handles CHANGE_DIRECTION", () => {
    const initialState = {
      ...mockState,
      selectedOrigin: "8279",
      selectedDestination: "place-ogmnl"
    };
    const action: Action = {
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: null
      }
    };
    expect(scheduleStoreReducer(initialState, action)).toEqual({
      ...initialState,
      selectedDirection: 1,
      selectedOrigin: null,
      selectedDestination: null
    });
  });

  it("Handles CHANGE_ORIGIN", () => {
    const initialState = {
      ...mockState,
      selectedDestination: "place-ogmnl"
    };
    const action: Action = {
      type: "CHANGE_ORIGIN",
      newStoreValues: {
        selectedOrigin: "8279"
      }
    };
    expect(scheduleStoreReducer(initialState, action)).toEqual({
      ...initialState,
      selectedOrigin: "8279",
      selectedDestination: null
    });
  });

  it("Handles CHANGE_DESTINATION", () => {
    const initialState = {
      ...mockState,
      selectedOrigin: "8279"
    };
    const action: Action = {
      type: "CHANGE_DESTINATION",
      newStoreValues: {
        selectedDestination: "place-ogmnl"
      }
    };
    const results = scheduleStoreReducer(initialState, action);
    expect(results).toEqual({
      ...initialState,
      selectedDestination: "place-ogmnl",
      selectedOrigin: "8279"
    });
  });

  it("Handles OPEN_MODAL", () => {
    const action: Action = {
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin",
        modalOpen: true
      }
    };
    expect(scheduleStoreReducer(mockState, action)).toEqual({
      ...mockState,
      modalMode: "origin",
      modalOpen: true
    });
  });

  it("Handles CLOSE_MODAL", () => {
    const action: Action = {
      type: "CLOSE_MODAL",
      newStoreValues: {
        modalOpen: false
      }
    };
    expect(scheduleStoreReducer(mockState, action)).toEqual({
      ...mockState,
      modalOpen: false
    });
  });
});
