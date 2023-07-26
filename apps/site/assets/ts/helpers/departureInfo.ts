import { concat, difference, find, keyBy, keys, map, sortBy } from "lodash";
import { PredictionWithTimestamp } from "../models/perdictions";
import { ScheduleWithTimestamp } from "../models/schedules";
import { isCancelled, isDelayed } from "./prediction-helpers";
import { DepartureInfo } from "../models/departureInfo";
import {
  isABusRoute,
  isACommuterRailRoute,
  isSubwayRoute
} from "../models/route";
import { DirectionId, Route } from "../__v3api";

export const SUBWAY = "subway";
export const BUS = "bus";
export const COMMUTER_RAIL = "commuter_rail";
export const FERRY = "ferry";

const toRouteMode = (
  route: Route
): typeof SUBWAY | typeof BUS | typeof COMMUTER_RAIL | typeof FERRY => {
  if (isSubwayRoute(route)) {
    return SUBWAY;
  }
  if (isABusRoute(route)) {
    return BUS;
  }
  if (isACommuterRailRoute(route)) {
    return COMMUTER_RAIL;
  }
  return FERRY;
};

const departureInfoToTime = (departureInfo: DepartureInfo): Date => {
  // If there isn't a prediction there should be a schedule
  return departureInfo.prediction
    ? departureInfo.prediction.time
    : departureInfo.schedule!.time;
};

const getNextUnCancelledDeparture = (
  departureInfos: DepartureInfo[]
): DepartureInfo | undefined => {
  return find(departureInfos, (di: DepartureInfo) => !di.isCancelled);
};

const displayInfoContainsPrediction = (
  departureInfo: DepartureInfo
): boolean => {
  return !!departureInfo.prediction;
};

const mergeIntoDepartureInfo = (
  schedules: ScheduleWithTimestamp[],
  predictions: PredictionWithTimestamp[]
): DepartureInfo[] => {
  const schedulesByTripId = keyBy(schedules, "trip.id");
  const predictionsByTripId = keyBy(predictions, "trip.id");
  const scheduleTripIds = keys(schedulesByTripId);
  const predictionTripIds = keys(predictionsByTripId);

  // All the schedules with and without predictions
  const scheduleDirectionInfo = map(
    schedulesByTripId,
    (schedule, tripId): DepartureInfo => {
      // prediction could be undefined
      const prediction = predictionsByTripId[tripId];
      return {
        prediction,
        schedule,
        route: schedule.route,
        trip: schedule.trip,
        isCancelled: isCancelled(prediction),
        isDelayed: isDelayed(prediction, schedule),
        routeMode: toRouteMode(schedule.route)
      };
    }
  );

  const unmatchedPredictionTripIds = difference(
    predictionTripIds,
    scheduleTripIds
  );
  // All the predictions with no schedules
  const predictionDirectionInfo = map(
    unmatchedPredictionTripIds,
    (tripId: string): DepartureInfo => {
      const prediction = predictionsByTripId[tripId];
      return {
        prediction,
        route: prediction.route,
        trip: prediction.trip,
        isCancelled: isCancelled(prediction),
        routeMode: toRouteMode(prediction.route)
      } as DepartureInfo;
    }
  );

  const departureInfos = concat(scheduleDirectionInfo, predictionDirectionInfo);
  const sortedDepartureInfo = sortBy(departureInfos, di => {
    // prioritize sorting by predictions
    if (di.prediction) {
      return di.prediction.time;
    }
    return di.schedule?.time;
  });

  return sortedDepartureInfo;
};

const isAtDestination = (
  stopName: string,
  route: Route,
  directionId: DirectionId
): boolean => {
  const destination = route.direction_destinations[directionId];
  if (destination) {
    return destination.includes(stopName);
  }
  return false;
};

const isCommuterRail = (departureInfo: DepartureInfo): boolean => {
  return departureInfo?.routeMode === "commuter_rail";
};

export {
  mergeIntoDepartureInfo,
  departureInfoToTime,
  displayInfoContainsPrediction,
  getNextUnCancelledDeparture,
  isAtDestination,
  isCommuterRail
};
