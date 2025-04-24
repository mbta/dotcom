import { Reducer, createStore, Store } from "redux";
import { StoreAction, SelectedOrigin } from "../components/__schedule";
import { DirectionId } from "../../__v3api";
import { Mode as ModalMode } from "../components/schedule-finder/ScheduleFinderModal";
import { dispatchChangedDirection } from "../../hooks/useDirectionChangeEvent";

export interface StoreProps {
  selectedDirection: DirectionId;
  selectedOrigin: SelectedOrigin | "";
  modalOpen: boolean;
  modalMode: ModalMode;
  modalCameFromSchedulePage?: boolean;
}

interface ActionData {
  selectedDirection?: DirectionId;
  selectedOrigin?: SelectedOrigin | "";
  modalOpen?: boolean;
  modalMode?: ModalMode;
  modalCameFromSchedulePage?: boolean;
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
      modalMode: "schedule",
      modalCameFromSchedulePage: false
    },
    state
  );

  switch (action.type) {
    case "INITIALIZE":
      return { ...newState, ...action.newStoreValues };
    case "CHANGE_DIRECTION":
      // notify other components of changed direction
      dispatchChangedDirection(action.newStoreValues.selectedDirection!);

      return {
        ...newState,
        selectedDirection: action.newStoreValues.selectedDirection!,
        selectedOrigin: action.newStoreValues.selectedOrigin!
      };
    case "CHANGE_ORIGIN":
      return {
        ...newState,
        selectedOrigin: action.newStoreValues.selectedOrigin!
      };
    case "OPEN_MODAL":
      return {
        ...newState,
        modalMode: action.newStoreValues.modalMode!,
        modalOpen: true,
        modalCameFromSchedulePage: true
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
    selectedOrigin: "",
    modalOpen: false,
    modalMode: "schedule"
  });
