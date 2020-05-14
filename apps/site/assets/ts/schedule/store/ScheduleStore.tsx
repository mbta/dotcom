import { Reducer, createStore, Store } from "redux";
import { SelectedStopId } from "../components/__schedule";
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

type StoreAction =
  | "INITIALIZE"
  | "CHANGE_DIRECTION"
  | "CHANGE_ORIGIN"
  | "CHANGE_DESTINATION"
  | "OPEN_MODAL"
  | "CLOSE_MODAL";

export interface Action {
  type: StoreAction;
  newStoreValues: ActionData;
}

export const initialize = (newStoreValues: ActionData): Action => ({
  type: "INITIALIZE",
  newStoreValues
});

export const changeDirection = (direction: DirectionId): Action => ({
  type: "CHANGE_DIRECTION",
  newStoreValues: {
    selectedDirection: direction
  }
});

export const changeOrigin = (origin: SelectedStopId): Action => ({
  type: "CHANGE_ORIGIN",
  newStoreValues: {
    selectedOrigin: origin
  }
});

export const changeDestination = (destination: SelectedStopId): Action => ({
  type: "CHANGE_DESTINATION",
  newStoreValues: { selectedDestination: destination }
});

export const openModal = (mode: ModalMode): Action => ({
  type: "OPEN_MODAL",
  newStoreValues: {
    modalMode: mode
  }
});

export const closeModal = (): Action => ({
  type: "CLOSE_MODAL",
  newStoreValues: {
    modalOpen: false
  }
});

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
