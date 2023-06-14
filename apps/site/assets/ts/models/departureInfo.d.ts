import { PredictionWithTimestamp } from "./perdictions";
import { ScheduleWithTimestamp } from "./schedules";

// Represents a schedule with its linked prediction
// Has some helper state variables to avoid recalculation
export interface DepartureInfo {
  prediction?: PredictionWithTimestamp;
  schedule?: ScheduleWithTimestamp;
  isCancelled?: boolean;
  isDelayed?: boolean;
  // Ferry, CR, and Bus all share requirements for display
  // subway is the only exception, so check if it is subway
  isSubway?: boolean;
}
