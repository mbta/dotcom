import { parseISO } from "date-fns";
import { StopId } from "../schedule/components/__schedule";
import { Alert, TimePeriodPairs } from "../__v3api";

export const isHighSeverityOrHighPriority = ({
  priority,
  severity
}: Alert): boolean => priority === "high" || severity >= 7;

export const isDiversion = ({ effect }: Alert): boolean =>
  effect === "shuttle" ||
  effect === "stop_closure" ||
  effect === "station_closure" ||
  effect === "detour";

export const alertsByStop = (alerts: Alert[], stopId: StopId): Alert[] =>
  alerts.filter(
    ({ informed_entity: entities }: Alert): boolean =>
      !!entities.stop && entities.stop!.some((id: StopId) => id === stopId)
  );

export const uniqueByEffect = (
  alert: Alert,
  index: number,
  alerts: Alert[]
): boolean => alerts.findIndex(a => a.effect === alert.effect) === index;

const withLeadingZero = (n: string): string => `0${n}`.slice(-2);

const activePeriodToDates = (
  activePeriod: TimePeriodPairs
): (Date | null)[] => {
  return activePeriod.map((d: string): Date | null => {
    return parseISO(d);
  });
};

const isCurrentLifecycle = ({ lifecycle }: Alert): boolean =>
  lifecycle === "new" ||
  lifecycle === "ongoing" ||
  lifecycle === "ongoing_upcoming";

export const isCurrentAlert = (
  alert: Alert,
  currentDate: Date = new Date()
): boolean => {
  if (!alert.active_period) return false;
  const dateRanges = alert.active_period.map(ap => activePeriodToDates(ap));
  const isInARange = dateRanges.some((range): boolean => {
    const [start, end] = range;
    if (!start) return false; // end might be null for ongoing alerts
    return currentDate >= start && (end ? currentDate <= end : true);
  });
  return isCurrentLifecycle(alert) && isInARange;
};

export const isActiveDiversion = (alert: Alert): boolean =>
  isDiversion(alert) && isCurrentAlert(alert);

export const hasAnActiveDiversion = (
  stopId: StopId,
  alerts: Alert[]
): boolean => alertsByStop(alerts, stopId).some(isActiveDiversion);
