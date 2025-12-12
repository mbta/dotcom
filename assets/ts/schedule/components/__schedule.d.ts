import { TypedRoutes } from "../../stop/components/__stop";
import {
  Alert,
  Route,
  PredictedOrScheduledTime,
  EnhancedRoute,
  DirectionId,
  Service,
  RoutePattern,
  Shape,
  Stop,
  ClosedStopInfo
} from "../../__v3api";

export interface EnhancedRoutePattern extends RoutePattern {
  shape_id: string;
  headsign: string;
}

export interface ShapesById {
  [key: string]: Shape;
}

export interface RoutePatternsByDirection {
  [key: string]: EnhancedRoutePattern[];
}

export interface ServiceInSelector extends Service {
  "default_service?": boolean;
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
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  direction_id: DirectionId;
  route_patterns: RoutePatternsByDirection;
  stop_tree: StopTreeData | null;
  route_stop_lists: RouteStop[][];
  alerts: Alert[];
  today: string;
  "service_today?": boolean;
  variant: string | null;
}

interface StopTreeData {
  by_id: { string: { id: string; value: RouteStop } };
  edges: { string: { next: string[]; previous: string[] } };
  starting_nodes: string[];
}

export type StopId = string;

export interface ByStopId<T> {
  [stopId: StopId]: T;
}

export interface StopTreeNode {
  id: StopId;
  value: RouteStop;
}

export interface StopTreeEdges {
  next: StopId[];
  previous: StopId[];
}

export interface StopTree {
  byId: ByStopId<StopTreeNode>;
  edges: ByStopId<StopTreeEdges>;
  startingNodes: StopId[];
}

export type StopTreePath = StopId[];

export type StopTreeSlice = StopId[];

interface StopData {
  branch: string | null;
  type: "line" | "merge" | "stop" | "terminus" | null;
  "has_disruption?": boolean;
}

export type CrowdingType = "not_crowded" | "some_crowding" | "crowded" | null;

export interface LineDiagramVehicle {
  id: string;
  status: "in_transit" | "incoming" | "stopped";
  crowding: CrowdingType;
  tooltip: string;
}

export interface RouteStop {
  id: string;
  name: string;
  zone: string | null;
  branch: string | null;
  station_info: Stop & { parent_id: string | null; child_ids: string[] };
  route: Route | null;
  connections: Route[];
  stop_features: string[];
  "terminus?": boolean;
  "is_beginning?": boolean;
  closed_stop_info: ClosedStopInfo | null;
}

export interface IndexedRouteStop extends RouteStop {
  routeIndex: number;
}

export interface SimpleStopMap {
  [key: string]: SimpleStop[];
}

export interface ScheduleNote {
  alternate_text: string | null;
  exceptions: ServiceException[];
  offpeak_service: string | null;
  peak_service: string;
  saturday_service: string;
  sunday_service: string;
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

export type SelectedOrigin = string | null;
export interface UserInput {
  route: string;
  origin: string;
  date: string;
  direction: DirectionId;
}

export type StoreAction =
  | "INITIALIZE"
  | "CHANGE_DIRECTION"
  | "CHANGE_ORIGIN"
  | "OPEN_MODAL"
  | "CLOSE_MODAL";

export type ComponentToRender =
  | "ADDITIONAL_LINE_INFORMATION"
  | "SCHEDULE_NOTE"
  | "SCHEDULE_FINDER"
  | "SCHEDULE_DIRECTION"
  | "";
