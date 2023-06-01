import React from "react";
import AmenityCard from "./AmenityCard";
import { faresIcon } from "../../../helpers/icon";

const FareSalesAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{faresIcon("c-svg__icon")}</span>
  );

  return <AmenityCard headerText="Fare Sales" icon={icon} />;
};

export default FareSalesAmenityCard;
