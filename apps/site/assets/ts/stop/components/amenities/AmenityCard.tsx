import React from "react";
import renderFa from "../../../helpers/render-fa";

const AmenityCard = ({
  headerText,
  children,
  icon
}: {
  headerText: string;
  children?: JSX.Element[] | JSX.Element;
  icon: JSX.Element;
}): JSX.Element => {
  return (
    <div className="d-flex card justify-content-space-between">
      <div className="m-16">
        <div className="d-flex text-primary">
          {icon}
          <div className="u-bold fs-18 ps-8 font-helvetica-neue">
            {headerText}
          </div>
        </div>
        {children}
      </div>
      <div className="u-color-brand-primary-light u-highlight d-flex ps-8 pe-8 align-items-center">
        {renderFa("", "fa-angle-right")}
      </div>
    </div>
  );
};

export default AmenityCard;
