import { DirectionId } from "../../__v3api";

export type MaybeDirectionId = DirectionId | null;

export interface Stop {
  id: string;
  direction_id: MaybeDirectionId;
  longitude: number;
  latitude: number;
  name: string;
  type: "rail_affected" | "rail_unaffected" | "shuttle";
}

export interface Shape {
  direction_id: MaybeDirectionId;
  id: string;
  is_shuttle_route: boolean;
  polyline: number[][];
}

export interface Diversion {
  shapes: Shape[];
  stops: Stop[];
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}
