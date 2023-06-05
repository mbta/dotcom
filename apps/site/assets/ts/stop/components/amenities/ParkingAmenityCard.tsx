import React from "react";
import AmenityCard from "./AmenityCard";
import { parkingIcon } from "../../../helpers/icon";

const ParkingAmenityCard = (): JSX.Element => {
  const icon = <span className="m-stop-page__icon">{parkingIcon()}</span>;

  return <AmenityCard headerText="Parking" icon={icon} />;
};

export default ParkingAmenityCard;
