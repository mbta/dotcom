import React from "react";
import renderFa from "../../../helpers/render-fa";

const AmenityCard = ({
  headerText,
  icon,
  content
}: {
  headerText: string;
  icon: JSX.Element;
  content?: JSX.Element[] | JSX.Element;
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
        {content && (
          <div className="c-descriptive-link__text pt-8 hidden-sm-down">
            {content}
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
