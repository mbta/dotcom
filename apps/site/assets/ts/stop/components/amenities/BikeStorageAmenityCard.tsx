import React from "react";
import AmenityCard, { AmenityModal } from "./AmenityCard";
import { bikeIcon } from "../../../helpers/icon";

const BikeStorageAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{bikeIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard
      headerText="Bike Storage"
      icon={icon}
      modalContent={
        <AmenityModal headerText="Bike Storage at Braintree">
          <h2 className="h3">Facility Information</h2>
          <ul>
            <li>Covered bike racks</li>
            <li>Outdoor bike racks</li>
          </ul>
          <a href="/bikes/bike-parking" className="c-call-to-action">
            Learn more about bike parking at the T
          </a>
        </AmenityModal>
      }
    >
      <span>Covered bike racks are available.</span>
    </AmenityCard>
  );
};

export default BikeStorageAmenityCard;
