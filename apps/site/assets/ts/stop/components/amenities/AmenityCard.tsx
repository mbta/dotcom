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
    <div className="c-descriptive-link card justify-content-space-between">
      <div className="m-16">
        <div className="d-flex text-primary">
          {icon}
          <div className="c-descriptive-link__title ps-8">{headerText}</div>
        </div>
        <div className="c-descriptive-link__text">{children}</div>
      </div>
      <div className="c-descriptive-link__caret-wrapper">
        {renderFa("c-descriptive-link__caret", "fa-angle-right")}
      </div>
    </div>
  );
};

export default AmenityCard;
