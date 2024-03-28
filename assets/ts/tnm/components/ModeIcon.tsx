import React, { ReactElement } from "react";
import GreenLineIconSmall from "../../../../priv/static/icon-svg/icon-green-line-small.svg";
import RedLineIconSmall from "../../../../priv/static/icon-svg/icon-red-line-small.svg";
import OrangeLineIconSmall from "../../../../priv/static/icon-svg/icon-orange-line-small.svg";
import BlueLineIconSmall from "../../../../priv/static/icon-svg/icon-blue-line-small.svg";
import MattapanSmall from "../../../../priv/static/icon-svg/icon-mattapan-line-small.svg";
import CommuterRailIconSmall from "../../../../priv/static/icon-svg/icon-mode-commuter-rail-small.svg";
import BusIconSmall from "../../../../priv/static/icon-svg/icon-mode-bus-small.svg";
import FerryIconSmall from "../../../../priv/static/icon-svg/icon-mode-ferry-small.svg";
import StationSmall from "../../../../priv/static/icon-svg/icon-circle-t-small.svg";
import SubwaySmall from "../../../../priv/static/icon-svg/icon-mode-subway-small.svg";

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
