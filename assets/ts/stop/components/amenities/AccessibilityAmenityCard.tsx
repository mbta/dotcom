import { without } from "lodash";
import React from "react";
import { AccessibilityType } from "../../../__v3api";
import Badge from "../../../components/Badge";
import { accessibleIcon } from "../../../helpers/icon";
import AmenityCard, { AmenityLink, AmenityModal } from "./AmenityCard";

const accessibilityNames: {
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

const StationFeatures = (features: AccessibilityType[]): JSX.Element => (
  <>
    <h2 className="h3">Station Features</h2>
    {features.length > 0 ? (
      <ul>
        {features.map(
          feature =>
            accessibilityNames[feature] && (
              <li key={feature}>{accessibilityNames[feature]}</li>
            )
        )}
      </ul>
    ) : (
      <p>
        There are no additional accessibility features, but buses are always
        accessible to board.
      </p>
    )}
  </>
);

const StopFeatures = (
  <>
    <h2 className="h3">Bus Features</h2>
    <ul>
      <li>Buses that can be lowered for easier boarding and exiting</li>
      <li>Onboard ramps at the front door of each bus</li>
      <li>2 areas where wheeled mobility devices can be secured</li>
      <li>
        Digital displays and automated announcements that share key route and
        stop info
      </li>
    </ul>
  </>
);

const AccessibilityLink = (isStation: boolean): JSX.Element =>
  isStation ? (
    <AmenityLink
      text="Learn more about accessibility on the T"
      url="/accessibility"
    />
  ) : (
    <AmenityLink
      text="Learn more about bus accessibility"
      url="/accessibility/bus-guide"
    />
  );

const AccessibilityAmenityCard = ({
  accessibleFeatures,
  stopName,
  isStation
}: {
  accessibleFeatures: AccessibilityType[];
  stopName: string;
  isStation: boolean;
}): JSX.Element => {
  const stationOrStop = isStation ? "station" : "stop";
  const features = without(accessibleFeatures, "accessible");
  const hasAccessibleFeatures = accessibleFeatures.includes("accessible");

  const accessibleOverride =
    document
      .querySelector("div[data-mbta-accessible]")
      ?.getAttribute("data-mbta-accessible") === "true";

  const badge =
    !hasAccessibleFeatures ||
    (accessibleOverride && (
      <Badge text="Not accessible" bgClass="u-bg--gray-lighter" />
    ));

  const icon = accessibleIcon("c-svg__icon-accessible-default");
  return (
    <AmenityCard
      headerText="Accessibility"
      icon={icon}
      badge={badge}
      modalContent={
        hasAccessibleFeatures ||
        (accessibleOverride && (
          <AmenityModal headerText={`Accessibility at ${stopName}`}>
            {isStation ? StationFeatures(features) : StopFeatures}
            <AmenityLink
              text="Report an accessibility issue"
              url="/customer-support"
            />
            {AccessibilityLink(isStation)}
            <h2 className="h3">Accessibility Resources</h2>
            <ul>
              <li>
                <a href="/accessibility/trip-planning">
                  Plan an accessible trip
                </a>
              </li>
              <li>
                <a href="/accessibility/mbta-mobility-center">
                  Visit the Mobility Center
                </a>
              </li>
            </ul>
          </AmenityModal>
        ))
      }
    >
      {hasAccessibleFeatures || accessibleOverride
        ? `Learn more about the accessibility features at this ${stationOrStop}.`
        : `This ${stationOrStop} is not accessible.`}
    </AmenityCard>
  );
};

export default AccessibilityAmenityCard;
