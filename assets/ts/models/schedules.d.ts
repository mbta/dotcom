import { Schedule } from "../__v3api";

export interface ScheduleWithTimestamp extends Omit<Schedule, "time"> {
  time: Date;
}
