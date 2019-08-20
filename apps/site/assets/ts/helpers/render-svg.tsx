import React from "react";

export default (className: string, svgText: string, iconName: string = ""): JSX.Element => (
  <span
    className={className ? `notranslate ${className}` : "notranslate"}
    aria-hidden="false"
    data-toggle="tooltip"
    data-original-title={iconName}
    title=""
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: svgText }}
  />
);
