import { HeadsignWithTimeData } from "../../../__v3api";
import { LineDiagramVehicle, LineDiagramStop, RouteStop } from "../__schedule";

export interface CommonLineDiagramProps {
  stops: LineDiagramStop[];
  handleStopClick: (stop: RouteStop) => void;
  liveData: LiveDataByStop;
}

export interface LiveData {
  headsigns: HeadsignWithTimeData[];
  vehicles: LineDiagramVehicle[];
}

export interface LiveDataByStop {
  [stopId: string]: LiveData;
}

export type BranchDirection = "inward" | "outward";
