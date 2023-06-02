import React from "react";
import AmenityCard from "./AmenityCard";
import { bikeIcon } from "../../../helpers/icon";

const BikeStorageAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{bikeIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard headerText="Bike Storage" icon={icon}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
        faucibus erat.
      </div>
    </AmenityCard>
  );
};

export default BikeStorageAmenityCard;
