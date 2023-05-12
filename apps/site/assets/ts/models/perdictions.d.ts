import { DirectionId, Prediction, Route, Stop, Trip } from "../__v3api";

export interface PredictionWithTimestamp extends Omit<Prediction, "time"> {
  id: string;
  time: Date;
  route: Route;
  stop: Stop;
  trip: Trip;
  direction_id: DirectionId;
  vehicle_id: string | null;
}
