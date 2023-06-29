import React from "react";
import { Alert, Facility } from "../../__v3api";
import Alerts from "../../components/Alerts";
import { hasFacilityAlert } from "../../models/alert";
import { AmenityModal, AmenityLink } from "./amenities/AmenityCard";

const AccessAmenitiesModal = ({
  stopName,
  alerts,
  facilities,
  facilityType
}: {
  stopName: string;
  alerts: Alert[];
  facilities: Facility[];
  facilityType: "Elevators" | "Escalators";
}): JSX.Element => {
  const hasFacilities = facilities ? facilities.length > 0 : false;
  const linkText =
    facilityType === "Elevators"
      ? "Report an elevator issue"
      : "Report an escalator issue";
  return (
    <>
      {hasFacilities && (
        <AmenityModal headerText={`${facilityType} at ${stopName}`}>
          <Alerts alerts={alerts} />
          <h2>Eleavator Status</h2>
          <div className="access-amenities-row facilities-list-header">
            <h3>Elevator</h3>
            <h3>Status</h3>
          </div>
          <div className="access-amenities-container">
            {facilities?.map(facility => {
              return (
                <div
                  key={facility.id}
                  className="access-amenities-row access-amenities-text"
                >
                  <div className="access-amenities-name">
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
          <AmenityLink url="/customer-support" text={linkText} />
        </AmenityModal>
      )}
    </>
  );
};
export default AccessAmenitiesModal;
