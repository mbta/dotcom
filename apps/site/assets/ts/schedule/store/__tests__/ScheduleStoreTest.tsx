import { Action, scheduleStoreReducer, StoreProps } from "../ScheduleStore";

const mockState: StoreProps = {
  selectedDirection: 0,
  selectedOrigin: "",
  modalMode: "schedule",
  modalOpen: true
};

describe("Schedule store reducer", () => {
  it("Handles INITIALIZE", () => {
    const action: Action = {
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection: 0,
        selectedOrigin: "",
        modalMode: "schedule",
        modalOpen: true
      }
    };
    expect(
      scheduleStoreReducer(
        {
          selectedDirection: 0,
          selectedOrigin: "",
          modalMode: "schedule",
          modalOpen: true
        },
        action
      )
    ).toEqual(mockState);
  });

  it("Handles CHANGE_DIRECTION", () => {
    const action: Action = {
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: null
      }
    };
    expect(scheduleStoreReducer(mockState, action)).toEqual({
      ...mockState,
      selectedDirection: 1,
      selectedOrigin: null
    });
  });

  it("Handles CHANGE_ORIGIN", () => {
    const action: Action = {
      type: "CHANGE_ORIGIN",
      newStoreValues: {
        selectedOrigin: "8279"
      }
    };
    expect(scheduleStoreReducer(mockState, action)).toEqual({
      ...mockState,
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
