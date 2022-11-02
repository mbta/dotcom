import { HeadsignWithCrowding } from "../../../__v3api";
import { LineDiagramVehicle } from "../__schedule";

export interface LiveData {
  headsigns: HeadsignWithCrowding[];
  vehicles: LineDiagramVehicle[];
}

export interface LiveDataByStop {
  [stopId: string]: LiveData;
}
