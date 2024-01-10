import React, { ReactElement } from "react";
import GreenLineIconSmall from "../../../static/images/icon-green-line-small.svg";
import RedLineIconSmall from "../../../static/images/icon-red-line-small.svg";
import OrangeLineIconSmall from "../../../static/images/icon-orange-line-small.svg";
import BlueLineIconSmall from "../../../static/images/icon-blue-line-small.svg";
import MattapanSmall from "../../../static/images/icon-mattapan-line-small.svg";
import CommuterRailIconSmall from "../../../static/images/icon-mode-commuter-rail-small.svg";
import BusIconSmall from "../../../static/images/icon-mode-bus-small.svg";
import FerryIconSmall from "../../../static/images/icon-mode-ferry-small.svg";
import StationSmall from "../../../static/images/icon-circle-t-small.svg";
import SubwaySmall from "../../../static/images/icon-mode-subway-small.svg";

interface Props {
  type: string;
}

const icons = {
  "green_line-small": GreenLineIconSmall,
  "red_line-small": RedLineIconSmall,
  "orange_line-small": OrangeLineIconSmall,
  "blue_line-small": BlueLineIconSmall,
  "mattapan_line-small": MattapanSmall,
  "commuter_rail-small": CommuterRailIconSmall,
  "bus-small": BusIconSmall,
  "ferry-small": FerryIconSmall,
  "subway-small": SubwaySmall
};

const ModeIcon = ({ type }: Props): ReactElement<HTMLElement> => {
  // @ts-ignore
  const icon = icons[`${type}-small`] || StationSmall;

  return (
    <span
      className="m-tnm-sidebar__mode-icon"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};

export default ModeIcon;
