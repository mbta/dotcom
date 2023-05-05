import { PredictionWithTimestamp } from "./perdictions";
import { ScheduleWithTimestamp } from "./schedules";

export interface DepartureInfo {
  prediction?: PredictionWithTimestamp;
  schedule?: ScheduleWithTimestamp;
  isCancelled?: boolean;
  isDelayed?: boolean;
}
