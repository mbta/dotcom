import { Route, Trip, Stop } from "../../__v3api";

export interface Journey {
  trip: Trip;
  route: Route;
  departure: Departure;
}

export interface Departure {
  time: string;
  schedule: Schedule | null;
  prediction: Prediction | null;
}

export interface DepartureWithFare {
  schedule: ScheduleWithFare;
  prediction: Prediction | null;
}

export interface TripInfo {
  times: DepartureWithFare[];
  vehicle: Vehicle | null;
  vehicle_stop_name: string;
  stop_count: number;
  status: string;
  duration: number;
  fare: Fare;
}

export interface Prediction {
  status: string | null;
  time: string;
  track: string | null;
  "departing?": boolean;
}

export interface Schedule {
  stop: Stop;
  time: string;
  stop_sequence: number;
  pickup_type: number;
  "flag?": boolean;
  "early_departure?": boolean;
  "last_stop?": boolean;
}

export interface ScheduleWithFare extends Schedule {
  fare: Fare;
}

export interface Vehicle {
  trip_id: string;
  stop_id: string;
  status: string;
}

export interface Fare {
  price: string;
  fare_link: string;
}
