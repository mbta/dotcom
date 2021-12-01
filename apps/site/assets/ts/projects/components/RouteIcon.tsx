import { ReactElement } from "react";

import {
  blueLineIcon,
  busIcon,
  commuterRailIcon,
  ferryIcon,
  genericSubwayIcon,
  greenLineIcon,
  greenBLineIcon,
  greenCLineIcon,
  greenDLineIcon,
  greenELineIcon,
  mattapanLineIcon,
  orangeLineIcon,
  redLineIcon,
  silverLineIcon
} from "../../helpers/icon";

interface TagDispatchTable {
  [key: string]: (className: string) => JSX.Element;
}

interface Props {
  tag: string;
  extraClasses: string;
}

const tagsToIcons: TagDispatchTable = {
  blue: blueLineIcon,
  bus: busIcon,
  commuterRail: commuterRailIcon,
  ferry: ferryIcon,
  green: greenLineIcon,
  "green-b": greenBLineIcon,
  "green-c": greenCLineIcon,
  "green-d": greenDLineIcon,
  "green-e": greenELineIcon,
  mattapan: mattapanLineIcon,
  orange: orangeLineIcon,
  red: redLineIcon,
  silver: silverLineIcon,
  subway: genericSubwayIcon
};

const RouteIcon = ({ tag, extraClasses }: Props): ReactElement<HTMLElement> => {
  const iconFunction = tagsToIcons[tag];
  return iconFunction(`c-svg__icon ${extraClasses}`);
};

export default RouteIcon;
