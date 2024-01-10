import React from "react";
import AmenityCard from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";
import { Alert, Facility } from "../../../__v3api";
import AccessAmenitiesModal from "../AccessAmenitiesModal";
import { availabilityMessage, cardBadge } from "./access-amenities-helpers";

const ElevatorsAmenityCard = ({
  stopName,
  alerts,
  elevatorFacilities
}: {
  stopName: string;
  alerts: Alert[];
  elevatorFacilities: Facility[];
}): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{elevatorIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard
      headerText="Elevators"
      badge={cardBadge(elevatorFacilities, alerts)}
      icon={icon}
      modalContent={
        elevatorFacilities.length > 0 && (
          <AccessAmenitiesModal
            stopName={stopName}
            alerts={alerts}
            facilities={elevatorFacilities}
            facilityType="Elevator"
          />
        )
      }
    >
      {availabilityMessage(
        alerts.length,
        elevatorFacilities.length,
        "elevators"
      )}
    </AmenityCard>
  );
};

export default ElevatorsAmenityCard;
