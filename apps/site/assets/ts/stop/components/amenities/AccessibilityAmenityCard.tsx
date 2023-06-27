import React from "react";
import AmenityCard, { AmenityLink, AmenityModal } from "./AmenityCard";
import { accessibleIcon } from "../../../helpers/icon";
import { AccessibilityType } from "../../../__v3api";
import Badge from "../../../components/Badge";
import { accessibilityNames } from "../sidebar/Accessibility";

const AccessibilityAmenityCard = ({
  accessibleFeatures,
  stopName
}: {
  accessibleFeatures: AccessibilityType[];
  stopName: string;
}): JSX.Element => {
  const hasAccessibleFeatures = accessibleFeatures.includes("accessible");
  const badge = !hasAccessibleFeatures && (
    <Badge text="Not accessible" bgClass="u-bg--gray-lighter" />
  );
  return (
    <AmenityCard
      headerText="Accessibility"
      icon={accessibleIcon("c-svg__icon-accessible-default")}
      badge={badge}
      modalContent={
        hasAccessibleFeatures && (
          <AmenityModal headerText={`Accessibility at ${stopName}`}>
            <h2 className="h3">Station Features</h2>
            <ul>
              {accessibleFeatures.map(
                feature =>
                  accessibilityNames[feature] && (
                    <li key={feature}>{accessibilityNames[feature]}</li>
                  )
              )}
            </ul>
            <AmenityLink
              text="Report an accessibility issue"
              url="/customer-support"
            />
            <AmenityLink
              text="Learn more about accessibility on the T"
              url="/accessibility"
            />
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
      {hasAccessibleFeatures
        ? "Learn more about the accessibility features at this station."
        : "This station is not accessible."}
    </AmenityCard>
  );
};

export default AccessibilityAmenityCard;
