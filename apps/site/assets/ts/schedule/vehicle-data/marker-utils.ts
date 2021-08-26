import { IdHash } from "./reducer";
import { MapMarker as Marker } from "../../leaflet/components/__mapdata";

const zIndex = (icon: string | null): number | undefined =>
  icon === "vehicle-bordered-expanded" ? 1000 : undefined;

export const shouldRemoveMarker = (
  id: string | null,
  idHash: IdHash
): boolean => id !== null && idHash[id] === true;

export const isVehicleMarker = (marker: Marker): boolean =>
  marker.icon ? marker.icon.includes("vehicle") : false;

export const iconOpts = (
  icon: string | null
): {
  icon_size?: [number, number];
  icon_anchor?: [number, number];
} => {
  switch (icon) {
    case null:
      return {};

    case "vehicle-bordered-expanded":
      return {
        icon_size: [18, 18], // eslint-disable-line camelcase
        icon_anchor: [6, 6] // eslint-disable-line camelcase
      };

    case "stop-circle-bordered-expanded":
      return {
        icon_size: [12, 12], // eslint-disable-line camelcase
        icon_anchor: [6, 6] // eslint-disable-line camelcase
      };

    default:
      throw new Error(`unexpected icon type: ${icon}`);
  }
};

export const updateMarker = (marker: Marker): Marker => ({
  ...marker,
  icon_opts: iconOpts(marker.icon), // eslint-disable-line camelcase
  z_index: zIndex(marker.icon) // eslint-disable-line camelcase
});
