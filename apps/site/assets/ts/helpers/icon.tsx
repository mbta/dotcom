import React, { ReactElement } from "react";
import renderSvg from "./render-svg";
import { isASilverLineRoute } from "../models/route";
import accessibleIconSvg from "../../static/images/icon-accessible-small.svg";
import alertIconSvg from "../../static/images/icon-alerts-triangle.svg";
import blueLineIconSvg from "../../static/images/icon-blue-line-default.svg";
import busIconSvg from "../../static/images/icon-mode-bus-small.svg";
import commuterRailIconSvg from "../../static/images/icon-mode-commuter-rail-small.svg";
import ferryIconSvg from "../../static/images/icon-mode-ferry-small.svg";
import genericSubwayIconSvg from "../../static/images/icon-mode-subway-default.svg";
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
import vehicleArrowSvg from "../../static/images/icon-vehicle-bordered-expanded.svg";
import searchIconSvg from "../../static/images/icon-search-reverse-default.svg";
import crowdingIconSvg from "../../static/images/icon-crowding.svg";

export const accessibleIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, accessibleIconSvg, false);

export const alertIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, alertIconSvg, false);

export const blueLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, blueLineIconSvg, false);

export const busIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, busIconSvg, false);

export const commuterRailIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, commuterRailIconSvg, false);

export const ferryIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, ferryIconSvg, false);

export const genericSubwayIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, genericSubwayIconSvg, false);

export const greenLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenLineIconSvg, false);

export const greenBLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenBLineIconSvg, false);

export const greenCLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenCLineIconSvg, false);

export const greenDLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenDLineIconSvg, false);

export const greenELineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, greenELineIconSvg, false);

export const mattapanLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, mattapanLineIconSvg, false);

export const orangeLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, orangeLineIconSvg, false);

export const parkingIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, parkingIconSvg, false);

export const redLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, redLineIconSvg, false);

export const silverLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, silverLineIconSvg, false);

export const vehicleArrowIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, vehicleArrowSvg, false);

export const searchIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, searchIconSvg, false);

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
  if (isASilverLineRoute(routeId)) return silverLineIcon("c-svg__icon");

  return busIcon("c-svg__icon-bus-small");
};

export const caret = (
  className: string,
  expanded: boolean
): ReactElement<HTMLElement> => {
  const unicodeCharacter = expanded ? "&#xF106;" : "&#xF107;";
  return (
    <span
      className={`fa ${className}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: unicodeCharacter }}
    />
  );
};

/*
A minimal component that gives its child component
a basic tooltip containing the specified text. Has no
visual appearance itself.

Note: data-selector="true" and data-original-title are
specified here in order to preserve `title` text post-trigger
*/

// Corresponds to Bootstrap's tooltip options
interface TooltipOptions {
  animation?: boolean;
  container?: string | HTMLElement | false;
  delay?: number | object;
  html?: boolean;
  placement?: string | Function;
  selector?: string;
  template?: string;
  title?: string | HTMLElement | Function;
  trigger?: string;
  constraints?: [];
  offset?: string;
}

const defaultTooltipOptions: TooltipOptions = {
  animation: true,
  html: false,
  placement: "top",
  trigger: "hover focus"
};

export const TooltipWrapper: React.FC<{
  children: JSX.Element;
  tooltipText: string;
  tooltipOptions?: TooltipOptions;
  href?: string;
}> = ({ children, tooltipText, tooltipOptions, href }): JSX.Element => {
  const options = Object.assign({}, defaultTooltipOptions, tooltipOptions);

  const Tag = href ? "a" : "span";

  return (
    <Tag
      href={href}
      data-toggle="tooltip"
      data-trigger={options.trigger}
      data-placement={options.placement}
      data-animation={options.animation}
      data-html={options.html}
      data-selector="true"
      data-original-title={tooltipText}
    >
      {children}
    </Tag>
  );
};

export const crowdingIcon = (className: string = ""): JSX.Element =>
  renderSvg(`c-svg__icon c-icon__crowding ${className}`, crowdingIconSvg, true);
