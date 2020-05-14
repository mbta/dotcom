import {
  Action,
  changeDestination,
  changeDirection,
  changeOrigin,
  closeModal,
  openModal,
  scheduleStoreReducer,
  StoreProps,
  initialize
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
    expect(
      scheduleStoreReducer(
        {
          selectedDirection: 0,
          selectedOrigin: null,
          selectedDestination: null,
          modalMode: "schedule",
          modalOpen: true
        },
        initialize({
          selectedDirection: 0,
          selectedOrigin: null,
          selectedDestination: null,
          modalMode: "schedule",
          modalOpen: true
        })
      )
    ).toEqual(mockState);
  });

  it("Handles CHANGE_DIRECTION", () => {
    const initialState = {
      ...mockState,
      selectedOrigin: "8279",
      selectedDestination: "place-ogmnl"
    };
    expect(scheduleStoreReducer(initialState, changeDirection(1))).toEqual({
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
    expect(scheduleStoreReducer(initialState, changeOrigin("8279"))).toEqual({
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
    const results = scheduleStoreReducer(
      initialState,
      changeDestination("place-ogmnl")
    );
    expect(results).toEqual({
      ...initialState,
      selectedDestination: "place-ogmnl",
      selectedOrigin: "8279"
    });
  });

  it("Handles OPEN_MODAL", () => {
    expect(scheduleStoreReducer(mockState, openModal("origin"))).toEqual({
      ...mockState,
      modalMode: "origin",
      modalOpen: true
    });
  });

  it("Handles CLOSE_MODAL", () => {
    expect(scheduleStoreReducer(mockState, closeModal())).toEqual({
      ...mockState,
      modalOpen: false
    });
  });
});
