import {
  Route,
  Trip,
  Stop,
  PredictedOrScheduledTime,
  ScheduleRelationship,
  RouteType
} from "../../__v3api";
import { CrowdingType } from "./__schedule";

export interface Journey {
  trip: Trip;
  route: Route;
  departure: Departure;
  realtime: PredictedOrScheduledTime;
}

export interface EnhancedJourney extends Journey {
  tripInfo: TripInfo | null;
}

export interface Departure {
  time: string;
  schedule: Schedule | null;
  prediction: TripPrediction | null;
}

export interface TripDeparture {
  schedule: TripSchedule;
  prediction: TripPrediction | null;
  delay: number | null;
}

export interface TripDepartureWithPrediction extends TripDeparture {
  prediction: TripPrediction;
}

export interface TripInfo {
  times: TripDeparture[];
  vehicle: Vehicle | null;
  vehicle_stop_name: string;
  status: string;
  duration: number;
  fare: Fare;
  route_type: RouteType;
}

export interface TripPrediction {
  schedule_relationship: ScheduleRelationship;
  delay: number;
  status: string | null;
  stop: Stop | null;
  track: string | null;
  time: string | null;
}

export interface Schedule {
  time: string;
  stop_sequence: number;
  stop_headsign: string;
  pickup_type: number;
  "flag?": boolean;
  "early_departure?": boolean;
  "last_stop?": boolean;
}

export interface TripSchedule extends Schedule {
  stop: Stop;
  fare: Fare;
}

export interface Vehicle {
  trip_id: string;
  stop_id: string;
  status: string;
  crowding: CrowdingType | null;
}

export interface Fare {
  price: string;
  fare_link: string;
}
