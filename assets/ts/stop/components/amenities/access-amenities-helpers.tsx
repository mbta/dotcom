import React from "react";
import { Alert, Facility } from "../../../__v3api";
import Badge from "../../../components/Badge";
import { isCurrentLifecycle } from "../../../models/alert";

export const availabilityMessage = (
  brokenFacilities: number,
  totalFacilities: number,
  facilityType: "elevators" | "escalators"
): string => {
  if (brokenFacilities === totalFacilities && totalFacilities > 0) {
    return `All ${facilityType} are currently out of order.`;
  }
  if (totalFacilities === 0) {
    return `This station does not have ${facilityType}.`;
  }
  return `View available ${facilityType}.`;
};

export const cardBadge = (
  accessFacilities: Facility[],
  alerts: Alert[]
): React.ReactNode => {
  const currentAlerts = alerts.filter(isCurrentLifecycle);
  const workingFacilities = accessFacilities.length - currentAlerts.length;
  if (accessFacilities.length > 0) {
    let backgroundClass = "u-success-background";
    if (workingFacilities === 0) {
      backgroundClass = "u-error-background";
    }
    if (workingFacilities > 0 && workingFacilities < accessFacilities.length) {
      backgroundClass = "u-bg--gray-lightest";
    }
    return (
      <Badge
        text={`${workingFacilities} of ${accessFacilities.length} working`}
        bgClass={backgroundClass}
      />
    );
  }
  return <Badge text="Not available" bgClass="u-bg--gray-lighter" />;
};
