import React, { ReactElement } from "react";
import renderSvg from "./render-svg";
import accessibleIconSvg from "../../static/images/icon-accessible-small.svg";
import alertIconSvg from "../../static/images/icon-alerts-triangle.svg";
import blueLineIconSvg from "../../static/images/icon-blue-line-default.svg";
import busIconSvg from "../../static/images/icon-mode-bus-small.svg";
import commuterRailIconSvg from "../../static/images/icon-mode-commuter-rail-small.svg";
import ferryIconSvg from "../../static/images/icon-mode-ferry-small.svg";
import greenLineIconSvg from "../../static/images/icon-green-line-small.svg";
import greenBLineIconSvg from "../../static/images/icon-green-line-b-small.svg";
import greenCLineIconSvg from "../../static/images/icon-green-line-c-small.svg";
import greenDLineIconSvg from "../../static/images/icon-green-line-d-small.svg";
import greenELineIconSvg from "../../static/images/icon-green-line-e-small.svg";
import mattapanLineIconSvg from "../../static/images/icon-mattapan-line-small.svg";
import orangeLineIconSvg from "../../static/images/icon-orange-line-small.svg";
import parkingIconSvg from "../../static/images/icon-parking-small.svg";
import redLineIconSvg from "../../static/images/icon-red-line-small.svg";
import silverLineIconSvg from "../../static/images/icon-silver-line-small.svg";

export const accessibleIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, accessibleIconSvg);

export const alertIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, alertIconSvg);

export const blueLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, blueLineIconSvg);

export const busIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, busIconSvg);

export const commuterRailIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, commuterRailIconSvg);

export const ferryIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, ferryIconSvg);

export const greenLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenLineIconSvg);

export const greenBLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenBLineIconSvg);

export const greenCLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenCLineIconSvg);

export const greenDLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenDLineIconSvg);

export const greenELineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenELineIconSvg);

export const mattapanLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, mattapanLineIconSvg);

export const orangeLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, orangeLineIconSvg);

export const parkingIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, parkingIconSvg);

export const redLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, redLineIconSvg);

export const silverLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, silverLineIconSvg);

const isSilverRoute = (routeId: string): boolean =>
  routeId === "741" ||
  routeId === "742" ||
  routeId === "743" ||
  routeId === "746" ||
  routeId === "749" ||
  routeId === "751";

export const modeIcon = (routeId: string): JSX.Element | undefined => {
  if (routeId.startsWith("CR-")) return commuterRailIcon("c-svg__icon");
  if (routeId.startsWith("Boat-")) return ferryIcon("c-svg__icon");
  if (routeId === "Blue") return blueLineIcon("c-svg__icon");
  if (routeId === "Green") return greenLineIcon("c-svg__icon");
  if (routeId === "Green-B") return greenBLineIcon("c-svg__icon");
  if (routeId === "Green-C") return greenCLineIcon("c-svg__icon");
  if (routeId === "Green-D") return greenDLineIcon("c-svg__icon");
  if (routeId === "Green-E") return greenELineIcon("c-svg__icon");
  if (routeId === "Mattapan") return mattapanLineIcon("c-svg__icon");
  if (routeId === "Orange") return orangeLineIcon("c-svg__icon");
  if (routeId === "Red") return redLineIcon("c-svg__icon");
  if (isSilverRoute(routeId)) return silverLineIcon("c-svg__icon");

  return busIcon("c-svg__icon-bus-small");
};

export const caret = (
  className: string,
  expanded: boolean
): ReactElement<HTMLElement> => {
  const unicodeCharacter = expanded ? "&#xF106;" : "&#xF107;";
  return (
    <span
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: unicodeCharacter }}
    />
  );
};
