import React from "react";
import AmenityCard from "./AmenityCard";
import { elevatorIcon, escalatorIcon } from "../../../helpers/icon";
import { Alert, Facility } from "../../../__v3api";
import AccessAmenitiesModal from "../AccessAmenitiesModal";
import { availabilityMessage, cardBadge } from "./access-amenities-helpers";
import { isCurrentLifecycle } from "../../../models/alert";

const StationAmenityCard = ({
  stopName,
  alerts,
  facilities,
  facilityType
}: {
  stopName: string;
  alerts: Alert[];
  facilities: Facility[];
  facilityType: "Elevator" | "Escalator";
}): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">
      {facilityType === "Escalator"
        ? escalatorIcon("c-svg__icon")
        : elevatorIcon("c-svg__icon")}
    </span>
  );

  return (
    <AmenityCard
      headerText={`${facilityType}s`}
      badge={cardBadge(facilities, alerts)}
      icon={icon}
      modalContent={
        facilities.length > 0 && (
          <AccessAmenitiesModal
            stopName={stopName}
            alerts={alerts}
            facilities={facilities}
            facilityType={facilityType}
          />
        )
      }
    >
      {availabilityMessage(
        alerts.filter(isCurrentLifecycle).length,
        facilities.length,
        facilityType
      )}
    </AmenityCard>
  );
};

export default StationAmenityCard;
