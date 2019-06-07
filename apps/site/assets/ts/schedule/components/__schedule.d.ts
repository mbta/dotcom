import { TypedRoutes } from "../../stop/components/__stop";
import { DirectionInfo, RouteType } from "../../__v3api";

export interface SchedulePageData {
  connections: TypedRoutes[];
  pdfs: SchedulePDF[];
  teasers: string | null;
  hours: string;
  fares: Fare[];
  fare_link: string;
  holidays: Holiday[];
  route_type: RouteType;
  schedule_note: ScheduleNote | null;
  direction_destinations: DirectionInfo;
  direction_names: DirectionInfo;
  stops: SimpleStop[];
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
