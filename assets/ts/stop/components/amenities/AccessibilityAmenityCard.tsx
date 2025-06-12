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

const FerryFeatures = (
  <>
    <p>
      Most, but not all, MBTA docks are accessible to riders with disabilities.
      Based on the tide level and the type of vessel used for travel, you may
      encounter significant slopes and narrow walkways, even at accessible
      docks. At all docks, wait until a crew member tells you it is safe to
      proceed.
    </p>
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

const Content = (
  isStation: boolean,
  isFerry: boolean,
  features: AccessibilityType[]
): JSX.Element => {
  if (isFerry) {
    return FerryFeatures;
  }

  if (isStation) {
    return StationFeatures(features);
  }

  return StopFeatures;
};

const AccessibilityLink = (
  isStation: boolean,
  isFerry: boolean
): JSX.Element => {
  if (isFerry) {
    return (
      <AmenityLink
        text="Learn more about ferry accessibility"
        url="/accessibility/ferry-guide"
      />
    );
  }

  if (isStation) {
    return (
      <AmenityLink
        text="Learn more about accessibility on the T"
        url="/accessibility"
      />
    );
  }

  return (
    <AmenityLink
      text="Learn more about bus accessibility"
      url="/accessibility/bus-guide"
    />
  );
};

const AccessibilityAmenityCard = ({
  accessibleFeatures,
  stopName,
  isStation,
  isFerry
}: {
  accessibleFeatures: AccessibilityType[];
  stopName: string;
  isStation: boolean;
  isFerry: boolean;
}): JSX.Element => {
  const stationOrStop = isStation ? "station" : "stop";
  const features = without(accessibleFeatures, "accessible");
  const hasAccessibleFeatures = accessibleFeatures.includes("accessible");

  const accessibleElement = document.querySelector("div[data-mbta-accessible]");
  const accessibleOverride =
    accessibleElement != null &&
    accessibleElement.getAttribute("data-mbta-accessible") === "true";

  const badge = !hasAccessibleFeatures && !accessibleOverride && (
    <Badge text="Not accessible" bgClass="u-bg--gray-lighter" />
  );

  const icon = accessibleIcon("c-svg__icon-accessible-default");

  const content = Content(isStation, isFerry, features);

  return (
    <AmenityCard
      headerText="Accessibility"
      icon={icon}
      badge={badge}
      modalContent={
        (hasAccessibleFeatures || accessibleOverride) && (
          <AmenityModal headerText={`Accessibility at ${stopName}`}>
            {content}
            <AmenityLink
              text="Report an accessibility issue"
              url="/customer-support"
            />
            {AccessibilityLink(isStation, isFerry)}
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
        )
      }
    >
      {hasAccessibleFeatures || accessibleOverride
        ? `Learn more about the accessibility features at this ${stationOrStop}.`
        : `This ${stationOrStop} is not accessible.`}
    </AmenityCard>
  );
};

export default AccessibilityAmenityCard;
