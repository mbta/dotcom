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
    <div
      className="c-descriptive-link justify-content-space-between"
      style={{ height: "fit-content" }}
    >
      <div className="p-16">
        <div className="d-flex text-primary">
          {icon}
          <div className="c-descriptive-link__title ps-8 mb-0">
            {headerText}
          </div>
        </div>
        {children && (
          <div className="c-descriptive-link__text hidden-sm-down">
            {children}
          </div>
        )}
      </div>
      <button type="button" className="c-descriptive-link__caret-wrapper">
        {renderFa("c-descriptive-link__caret", "fa-angle-right")}
      </button>
    </div>
  );
};

export default AmenityCard;
