import React, { ReactElement } from "react";
import ExpandableBlock from "../../../components/ExpandableBlock";
import accessibleIcon from "../../../../static/images/icon-accessible-default.svg";
import { Stop, AccessibilityType } from "../../../__v3api";
import { TypedRoutes } from "../__stop";
import { Dispatch } from "../../state";

interface Props {
  dispatch: Dispatch;
  isExpanded: boolean;
  isFocused: boolean;
  stop: Stop;
  routes: TypedRoutes[];
}

/* eslint-disable camelcase */
export const accessibilityNames: {
  [accessibilityName in AccessibilityType]: string;
} = {
  tty_phone: "TTY Phone",
  escalator_both: "Escalator (up and down)",
  escalator_up: "Escalator (up only)",
  escalator_down: "Escalator (down only)",
  ramp: "Long ramp",
  fully_elevated_platform:
    "Full high level platform to provide level boarding to every car in a train set",
  elevated_subplatform:
    "Mini high level platform to provide level boarding to certain cars in a train set",
  elevator: "Elevator",
  portable_boarding_lift: "Portable boarding lift"
};

const hasBus = (routes: TypedRoutes[]): boolean =>
  routes.some(routeGroup => routeGroup.group_name === "bus");

/* eslint-enable camelcase */
const isAccessible = (stop: Stop): boolean =>
  stop.accessibility.includes("accessible");
const accessibilityKnown = (stop: Stop): boolean =>
  !stop.accessibility.includes("unknown");

const isSpecialCase = (stop: Stop): boolean => stop.id === "place-asmnl";

const maybeRenderBusAccess = (bus: boolean, accessKnown: boolean): string => {
  if (!bus) return "";
  if (accessKnown) {
    return " Customers using wheeled mobility devices may need to board at street level. Bus operator will need to relocate bus for safe boarding and exiting.";
  }
  return " Bus operator may need to relocate bus for safe boarding and exiting.";
};

const renderSpecialCase = (stop: Stop): string => {
  const specialCase = stop.id === "place-asmnl" ? "Mattapan Trolley" : "train";
  return `Significant accessibility barriers exist at ${stop.name} but customers can board or exit the ${specialCase} using a mobile lift. `;
};

const renderAccessibilityLevel = (stop: Stop, bus: boolean): string => {
  if (isSpecialCase(stop)) return renderSpecialCase(stop);
  if (isAccessible(stop)) return `${stop.name} is accessible. `;
  if (accessibilityKnown(stop)) {
    return `Significant accessibility barriers exist at ${
      stop.name
    }.${maybeRenderBusAccess(bus, true)}`;
  }
  return `Minor to moderate accessibility barriers exist at ${
    stop.name
  }.${maybeRenderBusAccess(bus, false)}`;
};

const formatAccess = (access: string): string => access.split("_").join(" ");

const Access = ({
  access
}: {
  access: AccessibilityType;
}): ReactElement<HTMLElement> | null => {
  if (access === "unknown" || access === "accessible") return null;
  const accessName = accessibilityNames[access] || formatAccess(access);

  return <li className="c-unordered-list-item">{accessName}</li>;
};

const hasAccessibilityFeatures = (stop: Stop): boolean =>
  stop.accessibility.filter(
    access => access !== "unknown" && access !== "accessible"
  ).length > 0;

const renderFeaturesList = (stop: Stop): ReactElement<HTMLElement> | null =>
  hasAccessibilityFeatures(stop) ? (
    <div id="accessibility-features">
      {isSpecialCase(stop) ? `${stop.name} ` : "It "}
      has the following features:
      <ul className="m-stop-page__sidebar-list">
        {stop.accessibility.map(access => (
          <Access access={access} key={access} />
        ))}
      </ul>
    </div>
  ) : null;

const renderReportLink = (title: string): ReactElement<HTMLElement> => {
  const href =
    typeof document !== "undefined"
      ? `/customer-support?comments=${document.title} | Accessibility issue `
      : "/customer-support";
  return (
    <p>
      <a href={href} className="c-call-to-action">
        {title}
      </a>
    </p>
  );
};

const renderAccessibilityContact = (): ReactElement<HTMLElement> =>
  renderReportLink(
    "Report an elevator, escalator, or other accessibility issue"
  );

const renderLearnMore = (): ReactElement<HTMLElement> => (
  <p>
    <a href="/accessibility" className="c-call-to-action">
      Learn more about accessibility
    </a>
  </p>
);

const Accessibility = ({
  dispatch,
  isExpanded,
  isFocused,
  stop,
  routes
}: Props): ReactElement<HTMLElement> => (
  <ExpandableBlock
    dispatch={dispatch}
    initiallyExpanded={isExpanded}
    initiallyFocused={isFocused}
    id="accessibility"
    header={{
      text: "Accessibility",
      iconSvgText: accessibleIcon
    }}
  >
    <>
      <p id="accessibility-level">
        {renderAccessibilityLevel(stop, hasBus(routes))}
      </p>
      {renderFeaturesList(stop)}
      {renderAccessibilityContact()}
      {renderLearnMore()}
    </>
  </ExpandableBlock>
);

export default Accessibility;
