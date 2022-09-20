import { Reducer, createStore, Store } from "redux";
import { StoreAction, SelectedOrigin } from "../components/__schedule";
import { DirectionId } from "../../__v3api";
import { Mode as ModalMode } from "../components/schedule-finder/ScheduleFinderModal";

export interface StoreProps {
  selectedOrigin: SelectedOrigin | "";
  modalOpen: boolean;
  modalMode: ModalMode;
}

interface ActionData {
  selectedDirection?: DirectionId;
  selectedOrigin?: SelectedOrigin | "";
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
      modalOpen: false,
      modalMode: "schedule"
    },
    state
  );

  switch (action.type) {
    case "INITIALIZE":
      return { ...newState, ...action.newStoreValues };
    case "CHANGE_ORIGIN":
      return {
        ...newState,
        selectedOrigin: action.newStoreValues.selectedOrigin!
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

export const createScheduleStore = (): Store =>
  // create store with preloadedState:
  createStore(scheduleStoreReducer, {
    selectedOrigin: "",
    modalOpen: false,
    modalMode: "schedule"
  });

// initial 'dummy' value (will be overwritten when schedule-loader loads)
export const store: Store = createScheduleStore();

export const getCurrentState = (): StoreProps => store.getState();

export const storeHandler = (newValues: Action): void => {
  store.dispatch(newValues);
};

export const mapStateToProps = (state: StoreProps): StoreProps => ({
  ...state
});

export default mapStateToProps;
