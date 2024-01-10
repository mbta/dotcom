import { DirectionId } from "../../../__v3api";
import { SelectedOrigin } from "../__schedule";
import { Mode as ModalMode } from "../schedule-finder/ScheduleFinderModal";

export interface LineDiagramState {
  direction: DirectionId;
  origin: SelectedOrigin;
  modalMode: ModalMode;
  modalOpen: boolean;
}

export type LineDiagramStateAction =
  | { type: "initialize"; direction: DirectionId; origin: SelectedOrigin }
  | { type: "toggle_modal"; modalOpen: boolean }
  | { type: "set_direction"; direction: DirectionId }
  | { type: "set_origin"; origin: SelectedOrigin };

export const lineDiagramReducer = (
  state: LineDiagramState,
  action: LineDiagramStateAction
): LineDiagramState => {
  switch (action.type) {
    case "initialize":
      return {
        ...state,
        direction: action.direction,
        origin: action.origin,
        modalMode: "schedule",
        modalOpen: true
      };
    case "set_direction":
      return {
        ...state,
        direction: action.direction
      };
    case "set_origin":
      if (action.origin) {
        // back to schedule modal
        return {
          ...state,
          origin: action.origin,
          modalMode: "schedule"
        };
      }
      // origin modal (but don't overwrite current origin)
      return {
        ...state,
        modalMode: "origin"
      };
    case "toggle_modal":
      return {
        ...state,
        modalOpen: action.modalOpen
      };
    default:
      return state;
  }
};
