import { Action, scheduleStoreReducer, StoreProps } from "../ScheduleStore";

const mockState: StoreProps = {
  selectedDirection: 0,
  selectedOrigin: ""
};

describe("Schedule store reducer", () => {
  it("Handles INITIALIZE", () => {
    const action: Action = {
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection: 0,
        selectedOrigin: ""
      }
    };
    expect(
      scheduleStoreReducer(
        {
          selectedDirection: 0,
          selectedOrigin: ""
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
});
