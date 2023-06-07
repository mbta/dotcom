import React from "react";
import AmenityCard from "./AmenityCard";
import { accessibleIcon } from "../../../helpers/icon";

const AccessibilityAmenityCard = (): JSX.Element => {
  const icon = (
    <span className="m-stop-page__icon">
      {accessibleIcon("c-svg__icon-accessible-default")}
    </span>
  );

  return <AmenityCard headerText="Accessibility" icon={icon} />;
};

export default AccessibilityAmenityCard;
