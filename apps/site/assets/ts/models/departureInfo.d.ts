import { PredictionWithTimestamp } from "./perdictions";
import { ScheduleWithTimestamp } from "./schedules";

// Represents a schedule with its linked prediction
// Has some helper state variables to avoid recalculation
export interface DepartureInfo {
  prediction?: PredictionWithTimestamp;
  schedule?: ScheduleWithTimestamp;
  isCancelled?: boolean;
  isDelayed?: boolean;
  routeMode?: "subway" | "bus" | "commuter_rail" | "ferry";
}
