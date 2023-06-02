import React from "react";
import AmenityCard from "./AmenityCard";
import { parkingIcon } from "../../../helpers/icon";

const ParkingAmenityCard = (): JSX.Element => {
  const icon = <span className="m-stop-page__icon">{parkingIcon()}</span>;

  return (
    <AmenityCard headerText="Parking" icon={icon}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
        faucibus erat.
      </div>
    </AmenityCard>
  );
};

export default ParkingAmenityCard;
