import React from "react";
import AmenityCard from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";
import { Alert, Facility } from "../../../__v3api";
import AccessAmenitiesModal from "../AccessAmenitiesModal";
import { availabilityMessage, cardBadge } from "./access-amenities-helpers";

const EscalatorsAmenityCard = ({
  stopName,
  alerts,
  escalatorFacilities
}: {
  stopName: string;
  alerts: Alert[];
  escalatorFacilities: Facility[];
}): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{elevatorIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard
      headerText="Escalators"
      badge={cardBadge(escalatorFacilities, alerts)}
      icon={icon}
      modalContent={
        escalatorFacilities.length > 0 && (
          <AccessAmenitiesModal
            stopName={stopName}
            alerts={alerts}
            facilities={escalatorFacilities}
            facilityType="Escalator"
          />
        )
      }
    >
      {availabilityMessage(
        alerts.length,
        escalatorFacilities.length,
        "escalators"
      )}
    </AmenityCard>
  );
};

export default EscalatorsAmenityCard;
