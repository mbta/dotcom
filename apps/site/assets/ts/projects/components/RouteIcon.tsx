import React, { ReactElement } from "react"

import {
  blueLineIcon,
  busIcon,
  commuterRailIcon,
  ferryIcon,
  greenLineIcon,
  greenBLineIcon,
  greenCLineIcon,
  greenDLineIcon,
  greenELineIcon,
  mattapanLineIcon,
  orangeLineIcon,
  redLineIcon,
  silverLineIcon
} from "../../helpers/icon"

interface TagDispatchTable {
  [key: string]: ((className: string) => JSX.Element)
}

interface Props {
  tag: string
}

const tagsToIcons: TagDispatchTable = {
  "blue": blueLineIcon,
  "bus": busIcon,
  "commuter_rail": commuterRailIcon,
  "ferry": ferryIcon,
  "green": greenLineIcon,
  "green-b": greenBLineIcon,
  "green-c": greenCLineIcon,
  "green-d": greenDLineIcon,
  "green-e": greenELineIcon,
  "mattapan": mattapanLineIcon,
  "orange": orangeLineIcon,
  "red": redLineIcon,
  "silver": silverLineIcon,
  "subway": silverLineIcon
}

export const RouteIcon = ({tag}: Props): ReactElement<HTMLElement> => {
  const iconFunction = tagsToIcons[tag]
  return iconFunction('c-svg__icon')
}
