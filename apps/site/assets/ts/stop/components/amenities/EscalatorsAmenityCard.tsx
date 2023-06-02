import React from "react";
import AmenityCard from "./AmenityCard";
import { escalatorIcon } from "../../../helpers/icon";

const EscalatorsAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{escalatorIcon("c-svg__icon")}</span>
  );

  return (
    <AmenityCard headerText="Escalators" icon={icon}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
        faucibus erat.
      </div>
    </AmenityCard>
  );
};

export default EscalatorsAmenityCard;
