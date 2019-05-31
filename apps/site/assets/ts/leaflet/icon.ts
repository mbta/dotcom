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

const defaultIconOpts: LeafletOpts = {
  iconAnchor: [22, 55],
  iconSize: [45, 75],
  popupAnchor: [0, -37]
};

export default (
  icon: string | null,
  opts: IconOpts | null | undefined
): Icon | undefined => {
  const iconOpts =
    opts !== null && opts
      ? {
          iconAnchor: opts.icon_anchor,
          iconSize: opts.icon_size,
          popupAnchor: opts.popup_anchor,
          ...opts
        }
      : defaultIconOpts;
  return icon === null
    ? undefined
    : new Icon({
        ...iconOpts,
        iconUrl: `/images/icon-${icon}.svg`,
        iconRetinaUrl: `/images/icon-${icon}.svg`
      });
};
