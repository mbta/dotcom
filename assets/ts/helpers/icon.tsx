import React, { ReactElement } from "react";
import renderSvg from "./render-svg";
import { isASilverLineRoute } from "../models/route";
import accessibleIconSvg from "../../../priv/static/icon-svg/icon-accessible-small.svg";
import alertIconSvg from "../../../priv/static/icon-svg/icon-alerts-triangle.svg";
import blueLineIconSvg from "../../../priv/static/icon-svg/icon-blue-line-default.svg";
import busIconSvg from "../../../priv/static/icon-svg/icon-mode-bus-small.svg";
import commuterRailIconSvg from "../../../priv/static/icon-svg/icon-mode-commuter-rail-small.svg";
import ferryIconSvg from "../../../priv/static/icon-svg/icon-mode-ferry-small.svg";
import genericSubwayIconSvg from "../../../priv/static/icon-svg/icon-mode-subway-default.svg";
import greenLineIconSvg from "../../../priv/static/icon-svg/icon-green-line-small.svg";
import greenBLineIconSvg from "../../../priv/static/icon-svg/icon-green-line-b-small.svg";
import greenCLineIconSvg from "../../../priv/static/icon-svg/icon-green-line-c-small.svg";
import greenDLineIconSvg from "../../../priv/static/icon-svg/icon-green-line-d-small.svg";
import greenELineIconSvg from "../../../priv/static/icon-svg/icon-green-line-e-small.svg";
import mattapanLineIconSvg from "../../../priv/static/icon-svg/icon-mattapan-line-small.svg";
import orangeLineIconSvg from "../../../priv/static/icon-svg/icon-orange-line-small.svg";
import redLineIconSvg from "../../../priv/static/icon-svg/icon-red-line-small.svg";
import silverLineIconSvg from "../../../priv/static/icon-svg/icon-silver-line-small.svg";
import vehicleArrowSvg from "../../../priv/static/icon-svg/icon-vehicle-bordered-expanded.svg";
import searchIconSvg from "../../../priv/static/icon-svg/icon-search-reverse-default.svg";
import crowdingIconSvg from "../../../priv/static/icon-svg/icon-crowding.svg";
import bikeIconSvg from "../../../priv/static/icon-svg/icon-bike.svg";
import escalatorIconSvg from "../../../priv/static/icon-svg/icon-escalator.svg";
import elevatorIconSvg from "../../../priv/static/icon-svg/icon-elevator.svg";
import faresIconSvg from "../../../priv/static/icon-svg/icon-fares.svg";

import renderFa from "./render-fa";

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
  renderFa(className, "fa-square-parking", false);

export const redLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, redLineIconSvg, false);

export const silverLineIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, silverLineIconSvg, false);

export const vehicleArrowIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, vehicleArrowSvg, false);

export const searchIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, searchIconSvg, false);

export const bikeIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, bikeIconSvg, false);
export const escalatorIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, escalatorIconSvg, false);
export const elevatorIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, elevatorIconSvg, false);
export const faresIcon = (className: string = ""): JSX.Element =>
  renderSvg(className, faresIconSvg, false);

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
