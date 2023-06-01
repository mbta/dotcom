import React from "react";
import AmenityCard from "./AmenityCard";
import renderFa from "../../../helpers/render-fa";

const FareSalesAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{renderFa("", "fa-credit-card")}</span>
  );

  return <AmenityCard headerText="Fare Sales" icon={icon} />;
};

export default FareSalesAmenityCard;
