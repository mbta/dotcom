import { Reducer, createStore, Store } from "redux";
import { StoreAction, SelectedStopId } from "../components/__schedule";
import { DirectionId } from "../../__v3api";

export type ModalMode = "origin" | "schedule" | "destination";

export interface StoreProps {
  selectedDirection: DirectionId;
  selectedOrigin: SelectedStopId;
  selectedDestination: SelectedStopId;
  modalOpen: boolean;
  modalMode: ModalMode;
}

interface ActionData {
  selectedDirection?: DirectionId;
  selectedOrigin?: SelectedStopId;
  selectedDestination?: SelectedStopId;
  modalOpen?: boolean;
  modalMode?: ModalMode;
}

export interface Action {
  type: StoreAction;
  newStoreValues: ActionData;
}

export const scheduleStoreReducer: Reducer<StoreProps, Action> = (
  state: StoreProps | undefined,
  action: Action
): StoreProps => {
  const newState: StoreProps = Object.assign(
    {
      selectedDirection: undefined,
      selectedOrigin: undefined,
      selectedDestination: undefined,
      modalOpen: false,
      modalMode: "schedule"
    },
    state
  );

  switch (action.type) {
    case "INITIALIZE":
      return { ...newState, ...action.newStoreValues };
    case "CHANGE_DIRECTION":
      return {
        ...newState,
        selectedDirection: action.newStoreValues.selectedDirection!,
        selectedOrigin: null,
        selectedDestination: null
      };
    case "CHANGE_ORIGIN":
      return {
        ...newState,
        selectedOrigin: action.newStoreValues.selectedOrigin!,
        selectedDestination: null
      };
    case "CHANGE_DESTINATION":
      return {
        ...newState,
        selectedDestination: action.newStoreValues.selectedDestination!
      };
    case "OPEN_MODAL":
      return {
        ...newState,
        modalMode: action.newStoreValues.modalMode!,
        modalOpen: true
      };
    case "CLOSE_MODAL":
      return {
        ...newState,
        modalOpen: false
      };
    default:
      return newState;
  }
};

export const createScheduleStore = (directionId: DirectionId): Store =>
  // create store with preloadedState:
  createStore(scheduleStoreReducer, {
    selectedDirection: directionId,
    selectedOrigin: null,
    selectedDestination: null,
    modalOpen: false,
    modalMode: "schedule"
  });

// initial 'dummy' value (will be overwritten when schedule-loader loads)
export const store: Store = createScheduleStore(0);

export const getCurrentState = (): StoreProps => store.getState();

export const storeHandler = (newValues: Action): void => {
  store.dispatch(newValues);
};

export const mapStateToProps = (state: StoreProps): StoreProps => ({
  ...state
});

export default mapStateToProps;
