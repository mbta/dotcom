import React from "react";
import AmenityCard from "./AmenityCard";
import { elevatorIcon } from "../../../helpers/icon";

const ElevatorsAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{elevatorIcon("c-svg__icon")}</span>
  );

  return <AmenityCard headerText="Elevators" icon={icon} />;
};

export default ElevatorsAmenityCard;
