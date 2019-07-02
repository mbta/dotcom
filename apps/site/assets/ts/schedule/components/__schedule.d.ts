import { TypedRoutes } from "../../stop/components/__stop";
import {
  Route,
  PredictedOrScheduledTime,
  EnhancedRoute,
  DirectionId,
  ServiceWithServiceDate,
  Schedule
} from "../../__v3api";

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
}

export interface ServiceSchedule {
  [key: string]: ServiceScheduleItem;
}

export interface ServiceScheduleByTrip {
  [key: string]: Schedule[];
}

export interface ServiceScheduleItem {
  service_id: string;
  "0": { "by_trip": ServiceScheduleByTrip; trip_order: string[] };
  "1": { "by_trip": ServiceScheduleByTrip; trip_order: string[] };
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
