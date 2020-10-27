import { ReactElement } from "react";
import { CrowdingType } from "../../schedule/components/__schedule";

export type TileServerUrl =
  | "https://cdn.mbta.com"
  | "https://mbta-map-tiles-dev.s3.amazonaws.com"
  | "";

export interface IconOpts {
  icon_size?: [number, number];
  icon_anchor?: [number, number];
  popup_anchor?: [number, number];
}

export interface MapMarker {
  icon: string | null;
  icon_opts?: IconOpts;
  id: string | null;
  longitude: number;
  latitude: number;
  size?: number[];
  rotation_angle: number;
  tooltip: ReactElement<HTMLElement> | null;
  tooltip_text?: string | null;
  z_index?: number;
  shape_id?: string;
  vehicle_crowding?: CrowdingType;
  onClick?: () => void;
}

export interface Polyline {
  color: string;
  "dotted?": boolean;
  id: string;
  positions: [number, number][];
  weight: number;
}

export interface MapData {
  id?: string;
  default_center: {
    longitude: number;
    latitude: number;
  };
  height: number;
  markers: MapMarker[];
  stop_markers?: MapMarker[];
  polylines: Polyline[];
  tile_server_url: TileServerUrl;
  width: number;
  zoom: number | null;
}

export interface StaticMapData {
  img_src: string;
  pdf_url: string;
}
