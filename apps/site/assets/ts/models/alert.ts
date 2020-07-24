import { Alert } from "../__v3api";

export const isHighSeverityOrHighPriority = ({
  priority,
  severity
}: Alert): boolean => priority === "high" || severity >= 7;

export const isDiversion = ({ effect }: Alert): boolean =>
  [
    "detour",
    "shuttle",
    "stop_closure",
    "station_closure",
    "suspension"
  ].includes(effect);
