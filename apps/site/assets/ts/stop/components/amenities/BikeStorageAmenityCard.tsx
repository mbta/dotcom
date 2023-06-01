import React from "react";
import AmenityCard from "./AmenityCard";
import renderFa from "../../../helpers/render-fa";

const BikeStorageAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{renderFa("", "fa-bicycle")}</span>
  );

  return <AmenityCard headerText="Bike Storage" icon={icon} />;
};

export default BikeStorageAmenityCard;
