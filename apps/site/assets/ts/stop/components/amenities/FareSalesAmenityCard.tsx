import React from "react";
import AmenityCard from "./AmenityCard";
import { faresIcon } from "../../../helpers/icon";

const FareSalesAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{faresIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard headerText="Fare Sales" icon={icon}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
        faucibus erat.
      </div>
    </AmenityCard>
  );
};

export default FareSalesAmenityCard;
