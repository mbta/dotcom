import { ReactElement } from "react";

export type TileServerUrl =
  | "https://cdn.mbta.com"
  | "https://mbta-map-tiles-dev.s3.amazonaws.com"
  | "";

export interface IconOpts {
  iconSize?: [number, number];
  iconAnchor?: [number, number];
  popupAnchor?: [number, number];
}

export interface MapMarker {
  icon: string | null;
  iconOpts?: IconOpts;
  id: string | null;
  longitude: number;
  latitude: number;
  size?: number[];
  rotation_angle: number;
  tooltip: ReactElement<HTMLElement> | null;
  tooltip_text?: string | null;
  zIndex?: number;
}

export interface Polyline {
  color: string;
  "dotted?": boolean;
  id: string;
  positions: [number, number][];
  weight: number;
}

export interface MapData {
  default_center: {
    longitude: number;
    latitude: number;
  };
  height: number;
  markers: MapMarker[];
  polylines: Polyline[];
  tile_server_url: TileServerUrl;
  width: number;
  zoom: number;
}
