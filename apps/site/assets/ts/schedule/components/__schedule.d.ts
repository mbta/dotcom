import { TypedRoutes } from "../../stop/components/__stop";
import {
  Route,
  PredictedOrScheduledTime,
  EnhancedRoute,
  DirectionId,
  ServiceWithServiceDate,
  Schedule,
  RoutePattern,
  Shape
} from "../../__v3api";

export interface RoutePatternWithShape extends RoutePattern {
  shape_id: string;
}

export interface ShapesById {
  [key: string]: Shape;
}

export interface RoutePatternsByDirection {
  [key: string]: RoutePatternWithShape[];
}

export interface SchedulePageData {
  connections: TypedRoutes[];
  pdfs: SchedulePDF[];
  teasers: string | null;
  hours: string;
  fares: Fare[];
  fare_link: string;
  holidays: Holiday[];
  route: EnhancedRoute;
  schedule_note: ScheduleNote | null;
  services: ServiceWithServiceDate[];
  service_schedules: ServiceSchedule;
  stops: SimpleStop[];
  direction_id: DirectionId;
  shape_map: ShapesById;
  route_patterns: RoutePatternsByDirection;
}

export interface ServiceSchedule {
  [key: string]: ServiceScheduleInfo;
}

export interface ScheduleInfo {
  schedules: ScheduleWithFare[];
  duration: string;
}

export interface ScheduleWithFare extends Schedule {
  price: string;
  fare_link: string;
}

export interface ServiceScheduleByTrip {
  [key: string]: ScheduleInfo;
}

export interface ServiceScheduleInfo {
  by_trip: ServiceScheduleByTrip;
  trip_order: string[];
}

export interface ScheduleNote {
  peak_service: string;
  offpeak_service: string;
  exceptions: ServiceException[];
}

export interface ServiceException {
  type: string;
  service: string;
}

export interface SimpleStop {
  id: string;
  name: string;
  is_closed: boolean;
  zone: string | null;
}

export interface SchedulePDF {
  title: string;
  url: string;
}

export interface Fare {
  title: string;
  price: string;
}

export interface Holiday {
  name: string;
  date: string;
}

export interface StopPrediction {
  headsign: string;
  route: Route;
  prediction: PredictedOrScheduledTime;
  train_number: string;
}
