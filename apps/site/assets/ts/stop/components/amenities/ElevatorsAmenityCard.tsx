import React from "react";
import AmenityCard from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";

const ElevatorsAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{elevatorIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard headerText="Elevators" icon={icon}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
        faucibus erat.
      </div>
    </AmenityCard>
  );
};

export default ElevatorsAmenityCard;
