import React from "react";
import AmenityCard from "./AmenityCard";
import renderFa from "../../../helpers/render-fa";

const ElevatorsAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{renderFa("", "fa-elevator")}</span>
  );

  return <AmenityCard headerText="Elevators" icon={icon} />;
};

export default ElevatorsAmenityCard;
