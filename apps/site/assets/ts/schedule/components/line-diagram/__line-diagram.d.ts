import { HeadsignWithCrowding } from "../../../__v3api";
import { LineDiagramVehicle, LineDiagramStop, RouteStop } from "../__schedule";

export interface CommonLineDiagramProps {
  stops: LineDiagramStop[];
  handleStopClick: (stop: RouteStop) => void;
  liveData: LiveDataByStop | undefined;
}

export interface LiveData {
  headsigns: HeadsignWithCrowding[];
  vehicles: LineDiagramVehicle[];
}

export interface LiveDataByStop {
  [stopId: string]: LiveData;
}

export type BranchDirection = "inward" | "outward";
