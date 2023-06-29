import React from "react";
import AmenityCard from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";
import { Alert, Facility } from "../../../__v3api";
import AccessAmenitiesModal from "../AccessAmenitiesModal";

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
      icon={icon}
      modalContent={
        <AccessAmenitiesModal
          stopName={stopName}
          alerts={alerts}
          facilities={elevatorFacilities}
          facilityType="Elevators"
        />
      }
    />
  );
};

export default ElevatorsAmenityCard;
