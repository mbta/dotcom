import React from "react";
import AmenityCard, { AmenityModal } from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";
import { Alert, Facility } from "../../../__v3api";
import Alerts from "../../../components/Alerts";

const ElevatorsAmenityCard = ({
  alerts,
  facilities
}: {
  alerts: Alert[];
  facilities: Facility[] | undefined;
}): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{elevatorIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard headerText="Elevators" icon={icon}>
      modalContent=
      {
        <AmenityModal headerText="Elevators at">
          <Alerts alerts={alerts} />
          <h2 className="h3">Eleavator Status</h2>
          {/* loop over facilities and render circle and icon on status based on if facility has alert */}

          <a href="/accessibility/trip-planning">Plan an accessible trip</a>
          <a href="/customer-support">Report an elevator issue</a>
        </AmenityModal>
      }
    </AmenityCard>
  );
};

export default ElevatorsAmenityCard;
