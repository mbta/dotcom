import { isValid, parseISO, add } from "date-fns";
import { concat, isArray, mergeWith, reduce, some } from "lodash";
import { StopId } from "../schedule/components/__schedule";
import { Alert, DirectionId, TimePeriodPairs } from "../__v3api";

const activePeriodToDates = (
  activePeriod: TimePeriodPairs
): (Date | null)[] => {
  return activePeriod.map((d: string): Date | null => {
    return parseISO(d);
  });
};

export const isHighSeverityOrHighPriority = ({
  priority,
  severity
}: Alert): boolean => priority === "high" || severity >= 7;

export const isDiversion = ({ effect }: Alert): boolean =>
  [
    "shuttle",
    "suspension",
    "stop_closure",
    "station_closure",
    "detour"
  ].includes(effect);

export const isHighPriorityAlert = ({ effect }: Alert): boolean =>
  effect === "detour" || effect === "suspension" || effect === "shuttle";

export const alertsInEffect = (alerts: Alert[]): Alert[] =>
  alerts.filter(a => {
    return a.active_period?.some((period: TimePeriodPairs): boolean => {
      const [start, end] = activePeriodToDates(period);
      const now = new Date();

      return (start === null || now >= start) && (end === null || now <= end);
    });
  });

export const alertsForRoute = (alerts: Alert[], routeId: string): Alert[] => {
  return alerts.filter(
    ({ informed_entity: entities }: Alert): boolean =>
      !!(entities.route && entities.route.some((id: string) => id === routeId))
  );
};

export const alertsByStop = (alerts: Alert[], stopId: StopId): Alert[] =>
  alerts.filter(
    ({ informed_entity: entities }: Alert): boolean =>
      !!(entities.stop && entities.stop.some((id: StopId) => id === stopId))
  );

export const alertsForStopAndRoute = (
  alerts: Alert[],
  stopId: StopId,
  routeId: string
): Alert[] => {
  const stopAlerts = alertsByStop(alerts, stopId);
  return alertsForRoute(stopAlerts, routeId);
};

const hasEffect = (alerts: Alert[], effect: string): boolean =>
  some(alerts, alert => alert.effect === effect);

export const hasSuspension = (alerts: Alert[]): boolean =>
  hasEffect(alerts, "suspension");

export const hasShuttleService = (alerts: Alert[]): boolean =>
  hasEffect(alerts, "shuttle");

export const hasDetour = (alerts: Alert[]): boolean =>
  hasEffect(alerts, "detour");

export const hasStopClosure = (alerts: Alert[]): boolean =>
  hasEffect(alerts, "stop_closure");

export const hasStationClosure = (alerts: Alert[]): boolean =>
  hasEffect(alerts, "station_closure");

export const hasClosure = (alerts: Alert[]): boolean =>
  hasStopClosure(alerts) || hasStationClosure(alerts);

export const alertsWithStop = (alerts: Alert[]): Alert[] =>
  alerts.filter(
    ({ informed_entity: entites }: Alert): boolean => !!entites.stop
  );

export const routeWideAlerts = (alerts: Alert[]): Alert[] =>
  alerts.filter(({ informed_entity: { entities } }: Alert): boolean =>
    entities.some(entity => !entity.stop && !entity.trip)
  );

export const alertsByRoute = (alerts: Alert[]): { [key: string]: Alert[] } => {
  return reduce(
    alerts,
    (acc, alert) => {
      // create a map of every route id to the alert
      const explodedAlerts = reduce(
        alert.informed_entity.route,
        (innerAcc, routeId) => {
          return { ...innerAcc, [routeId]: [alert] };
        },
        {}
      );

      return mergeWith(acc, explodedAlerts, (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
        return srcValue;
      });
    },
    {}
  );
};

// This will only return alerts with direction id specified (aka affecting a single direction)
export const alertsByDirectionId = (
  alerts: Alert[]
): { [key: number]: Alert[] } => {
  return reduce(
    alerts,
    (acc, alert) => {
      const explodedAlerts = reduce(
        alert.informed_entity.direction_id,
        (innerAcc, directionId) => {
          // only include specified directions
          if (directionId !== null) {
            return { ...innerAcc, [directionId]: [alert] };
          }
          return innerAcc;
        },
        {}
      );

      return mergeWith(acc, explodedAlerts, (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
        return srcValue;
      });
    },
    {}
  );
};

export const alertsAffectingBothDirections = (alerts: Alert[]): Alert[] => {
  return alerts.filter(alert => {
    return (
      alert.informed_entity.direction_id === null ||
      alert.informed_entity.direction_id.length === 0 ||
      alert.informed_entity.direction_id[0] === null
    );
  });
};

export const allAlertsForDirection = (
  alerts: Alert[],
  direction_id: number
): Alert[] => {
  const alertsByDirectionObj = alertsByDirectionId(alerts);
  const alertsAffectingBothDirectionsArray = alertsAffectingBothDirections(
    alerts
  );
  const alertsDirectionArray = alertsByDirectionObj[direction_id]
    ? alertsByDirectionObj[direction_id]
    : [];

  return concat(alertsAffectingBothDirectionsArray, alertsDirectionArray);
};

export const uniqueByEffect = (
  alert: Alert,
  index: number,
  alerts: Alert[]
): boolean => alerts.findIndex(a => a.effect === alert.effect) === index;

export const isCurrentLifecycle = ({ lifecycle }: Alert): boolean =>
  lifecycle === "new" ||
  lifecycle === "ongoing" ||
  lifecycle === "ongoing_upcoming";

export const isUpcomingOrCurrentLifecycle = (alert: Alert): boolean =>
  alert.lifecycle === "upcoming" || isCurrentLifecycle(alert);

export const isInNextXDays = (
  alert: Alert,
  days: number,
  selectedDate: Date = new Date()
): boolean => {
  const xDays = add(selectedDate, { days });
  xDays.setHours(23, 59, 59); // set to end of X day
  if (!alert.active_period) return false;
  const dateRanges = alert.active_period.map(ap => activePeriodToDates(ap));
  const isInARange = dateRanges.some((range): boolean => {
    const [start, end] = range;
    if (!start || !isValid(start)) return false; // end might be null for ongoing alerts
    if (!end || !isValid(end)) return true;

    if (days === 0) {
      return start <= selectedDate && end >= selectedDate;
    }
    return start <= xDays && end >= selectedDate;
  });
  return days === 0 ? isCurrentLifecycle(alert) && isInARange : isInARange;
};

export const isTripSpecific = ({ informed_entity }: Alert): boolean => {
  const nonNullEntities = informed_entity.trip?.filter(item => item !== null);

  if (nonNullEntities === undefined) {
    return false;
  }

  return nonNullEntities.length > 0;
};

export const isActiveDiversion = (alert: Alert): boolean =>
  isDiversion(alert) && isInNextXDays(alert, 0);

export const hasAnActiveDiversion = (
  stopId: StopId,
  alerts: Alert[]
): boolean => alertsByStop(alerts, stopId).some(isActiveDiversion);

export const hasCurrentFacilityAlert = (
  facilityId: string,
  alerts: Alert[]
): boolean => {
  return alerts.filter(isCurrentLifecycle).some(alert => {
    if (alert.informed_entity?.facility) {
      return alert.informed_entity.facility.includes(facilityId);
    }
    return false;
  });
};

/**
 * Sometimes we want to use the alerts to affect the display of departures. This
 * is mainly when:
 * - A shuttle is in service
 * - A suspension is underway – accounting for the fact that, when a suspension
 *   applies to a range of stops, the first/last stops in that range might only
 *   experience the suspension in a single direction. We might not have
 *   sufficient data in the alert itself to conclusively determine that, but we
 *   can approximate this by observing whether arrival/departure data is
 *   present.
 */
export const isSuppressiveAlert = (
  alert: Alert,
  numPredictions: number
): boolean => {
  const { effect } = alert;
  // if predictions are present, suspension or shuttle likely doesn't apply here
  const isValidSuppressiveAlert =
    ((effect === "suspension" || effect === "shuttle") &&
      numPredictions === 0) ||
    effect === "station_closure" ||
    effect === "stop_closure";
  return isCurrentLifecycle(alert) && isValidSuppressiveAlert;
};

export const matchesDirection = (
  { informed_entity }: Alert,
  directionId: DirectionId
): boolean => {
  const nonNullDirections = informed_entity.direction_id?.filter(
    item => item !== null
  );

  if (nonNullDirections === undefined || nonNullDirections.length === 0) {
    return true;
  }

  return nonNullDirections.includes(directionId);
};
