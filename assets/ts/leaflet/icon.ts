import { Icon } from "leaflet";
import { IconOpts } from "../leaflet/components/__mapdata";

export type IconType = (
  icon: string | null,
  opts: IconOpts | undefined
) => Icon | undefined;

interface LeafletOpts {
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
}

export const defaultIconOpts: LeafletOpts = {
  iconAnchor: [22, 55],
  iconSize: [45, 75],
  popupAnchor: [0, -37]
};

export default (
  icon: string | null,
  opts?: IconOpts | null
): Icon | undefined => {
  const iconOpts =
    opts !== null && opts
      ? {
          iconAnchor: opts.icon_anchor || defaultIconOpts.iconAnchor,
          iconSize: opts.icon_size || defaultIconOpts.iconSize,
          popupAnchor: opts.popup_anchor || defaultIconOpts.popupAnchor
        }
      : defaultIconOpts;
  return icon === null
    ? undefined
    : new Icon({
        ...iconOpts,
        iconUrl: `/icon-svg/icon-${icon}.svg`,
        iconRetinaUrl: `/icon-svg/icon-${icon}.svg`
      });
};
