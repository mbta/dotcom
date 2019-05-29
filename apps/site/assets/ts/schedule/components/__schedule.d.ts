import { TypedRoutes } from "../../stop/components/__stop";
import { RouteType } from "../../__v3api";

export interface SchedulePageData {
  connections: TypedRoutes[];
  pdfs: SchedulePDF[];
  teasers: string | null;
  hours: string;
  fares: Fare[];
  fare_link: string;
  holidays: Holiday[];
  route_type: RouteType;
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
