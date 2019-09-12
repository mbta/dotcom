import {
  EnhancedRoute,
  Mode,
  Stop,
  Prediction,
  Schedule,
  DirectionId
} from "../../__v3api";

export interface DistanceByStopId {
  [key: string]: string;
}

export interface StopsWithDistances {
  stops: Stop[];
  distances: DistanceByStopId;
}

export interface StopWithRoutes {
  stop: Stop;
  routes: RouteGroup[];
  distance: string;
}

export interface RouteGroup {
  group_name: Mode;
  routes: EnhancedRoute[];
}

export interface PredictedSchedule {
  schedule: Schedule & { headsign: string };
  prediction: Prediction & { headsign: string };
}

export interface PredictionScheduleWithDirection {
  predicted_schedules: PredictedSchedule[];
  direction_id: DirectionId;
}

export interface PredictedScheduleByHeadsign {
  [key: string]: PredictionScheduleWithDirection;
}

export interface RealtimeScheduleData {
  stop: Stop;
  route: EnhancedRoute;
  predicted_schedules_by_route_pattern: PredictedScheduleByHeadsign;
}
