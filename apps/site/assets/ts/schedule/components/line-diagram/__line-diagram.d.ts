import { DirectionId, HeadsignWithCrowding } from "../../../__v3api";
import {
  SelectedOrigin,
  LineDiagramVehicle,
  LineDiagramStop,
  RouteStop
} from "../__schedule";
import { Mode as ModalMode } from "../schedule-finder/ScheduleFinderModal";

export interface CommonLineDiagramProps {
  stops: LineDiagramStop[];
  handleStopClick: (stop: RouteStop) => void;
  liveData: LiveDataByStop;
}

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

export interface LiveData {
  headsigns: HeadsignWithCrowding[];
  vehicles: LineDiagramVehicle[];
}

export interface LiveDataByStop {
  [stopId: string]: LiveData;
}

export type BranchDirection = "inward" | "outward";
