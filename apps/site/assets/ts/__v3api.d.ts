export interface Direction {
  direction_id: DirectionId;
  headsigns: Headsign[];
}

type DirectionId = 0 | 1;

interface DirectionInfo {
  0: string;
  1: string;
}

export interface Headsign {
  name: string;
  times: PredictedOrScheduledTime[];
  train_number: string | null;
}

export type Mode = "commuter_rail" | "subway" | "bus" | "ferry";

export interface ParkingLot {
  name: string;
  address: string | null;
  capacity: ParkingLotCapacity | null;
  payment: ParkingLotPayment | null;
  manager: ParkingLotManager | null;
  utilization?: ParkingLotUtilization | null;
  note?: string | null;
  latitude?: number;
  longitude?: number;
}

export interface ParkingLotCapacity {
  total?: number;
  accessible?: number;
  type?: string;
}

export interface ParkingLotManager {
  name?: string;
  contact?: string;
  phone: string | null;
  url: string | null;
}

export interface ParkingLotMobileApp {
  name?: string;
  id?: string;
  url: string | null;
}

export interface ParkingLotPayment {
  methods: string[];
  mobile_app?: ParkingLotMobileApp | null;
  daily_rate?: string;
  monthly_rate?: string;
}

export interface ParkingLotUtilization {
  arrive_before?: string;
  typical?: number;
}

export interface PredictedOrScheduledTime {
  delay: number;
  scheduled_time: string[] | null;
  prediction: Prediction | null;
}

export interface Prediction {
  time: string[];
  status: string | null;
  track: string | null;
}

export interface Route {
  description: string;
  direction_destinations: DirectionInfo;
  direction_names: DirectionInfo;
  id: string;
  long_name: string;
  name: string;
  type: RouteType;
}

export interface EnhancedRoute extends Route {
  header: string;
  alert_count: number;
  href?: string;
}

export interface RouteWithStopsWithDirections {
  route: EnhancedRoute;
  stops_with_directions: StopWithDirections[];
}

export type RouteType = 0 | 1 | 2 | 3 | 4;

export type BikeStorageType =
  | "bike_storage_rack"
  | "bike_storage_rack_covered"
  | "bike_storage_cage";

export type FareFacilityType =
  | "fare_vending_retailer"
  | "fare_vending_machine"
  | "fare_media_assistant"
  | "fare_media_assistance_facility"
  | "ticket_window";

export type AccessibilityType =
  | "tty_phone"
  | "escalator_both"
  | "escalator_up"
  | "escalator_down"
  | "ramp"
  | "fully_elevated_platform"
  | "elevated_subplatform"
  | "unknown"
  | "accessibile"
  | "elevator"
  | "portable_boarding_lift"
  | string;

export type StopType = "station" | "stop" | "entrance";

export interface Stop {
  accessibility: AccessibilityType[];
  address: string | null;
  bike_storage: BikeStorageType[];
  closed_stop_info: string | null;
  "has_charlie_card_vendor?": boolean;
  "has_fare_machine?": boolean;
  fare_facilities: FareFacilityType[];
  id: string;
  "is_child?": boolean;
  latitude: number;
  longitude: number;
  name: string;
  note: string | null;
  parking_lots: ParkingLot[];
  "station?": boolean;
  type: StopType;
  distance?: string;
  href?: string;
  platform_name?: string;
  platform_code?: string;
  description?: string;
}

export interface StopWithDirections {
  stop: Stop;
  directions: Direction[];
  distance: string;
}

export type Activity =
  | "board"
  | "exit"
  | "ride"
  | "park_car"
  | "bringing_bike"
  | "store_bike"
  | "using_wheelchair"
  | "using_escalator";

export type Lifecycle =
  | "ongoing"
  | "upcoming"
  | "ongoing_upcoming"
  | "new"
  | "unknown";

export type Priority = "high" | "low" | "system";

export interface InformedEntity {
  route: string | null;
  route_type: string | null;
  stop: string | null;
  trip: string | null;
  direction_id: DirectionId | null;
  activities: Activity[];
}

export type TimePeriodPairs = [string, string];

export interface Alert {
  id: string;
  active_period: TimePeriodPairs[];
  header: string;
  informed_entity: InformedEntity[];
  effect: string;
  severity: number;
  lifecycle: Lifecycle;
  updated_at: string;
  description: string;
  priority: Priority;
}
