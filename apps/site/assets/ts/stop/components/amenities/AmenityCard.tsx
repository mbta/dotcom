import React from "react";
import renderFa from "../../../helpers/render-fa";

const AmenityCard = ({
  headerText,
  icon
}: {
  headerText: string;
  icon: JSX.Element;
}): JSX.Element => {
  return (
    <div className="d-flex card justify-content-space-between">
      <div className="m-16">
        <div className="d-flex text-primary">
          <div className="">{icon}</div>
          <div className="u-bold fs-18 ps-8">{headerText}</div>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
          faucibus erat.
        </div>
      </div>
      <div className="u-color-brand-primary-light u-highlight d-flex ps-8 pe-8 align-items-center">
        {renderFa("", "fa-angle-right")}
      </div>
    </div>
  );
};

export default AmenityCard;
