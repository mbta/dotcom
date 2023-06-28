import React from "react";
import AmenityCard, { AmenityLink, AmenityModal } from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";
import { Alert, Facility } from "../../../__v3api";
import Alerts from "../../../components/Alerts";
import { hasFacilityAlert } from "../../../models/alert";

const ElevatorsAmenityCard = ({
  stopName,
  alerts,
  facilities
}: {
  stopName: string;
  alerts: Alert[];
  facilities: Facility[] | undefined;
}): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{elevatorIcon("c-svg__icon")}</span>
  );

  const hasElevators = facilities ? facilities.length > 0 : false;

  return (
    <AmenityCard
      headerText="Elevators"
      icon={icon}
      modalContent={
        hasElevators && (
          <AmenityModal headerText={`Elevators at ${stopName}`}>
            <Alerts alerts={alerts} />
            <h2 className="h3">Eleavator Status</h2>
            {/* loop over facilities and render circle and icon on status based on if facility has alert */}

            <div className="elevator-row facilities-list-header">
              <h3>Elevator</h3>
              <h3>Status</h3>
            </div>

            <div className="facilities-list">
              {facilities?.map(facility => {
                return (
                  <div key={facility.id} className="elevator-row elevator-text">
                    <div className="elevator-name">
                      {facility.attributes.short_name}
                    </div>
                    {hasFacilityAlert(facility.id, alerts) ? (
                      <div>
                        <i className="fa-solid fa-circle amenity-status amenity-out" />
                        Out of Order
                      </div>
                    ) : (
                      <div>
                        <i className="fa-solid fa-circle amenity-status amenity-working" />
                        Working
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <AmenityLink
              url="/accessibility/trip-planning"
              text="Plan an accessible trip"
            />
            <AmenityLink
              url="/customer-support"
              text="Report an elevator issue"
            />
          </AmenityModal>
        )
      }
    />
  );
};

export default ElevatorsAmenityCard;
