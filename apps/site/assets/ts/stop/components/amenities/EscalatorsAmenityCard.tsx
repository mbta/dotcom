import React from "react";
import AmenityCard from "./AmenityCard";
import renderFa from "../../../helpers/render-fa";

const EscalatorsAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">{renderFa("", "fa-stairs")}</span>
  );

  return <AmenityCard headerText="Escalators" icon={icon} />;
};

export default EscalatorsAmenityCard;
