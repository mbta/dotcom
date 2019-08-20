import React from "react";

export default (className: string, svgText: string): JSX.Element => (
  <span
    className={className ? `notranslate ${className}` : "notranslate"}
    aria-hidden="true"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: svgText }}
  />
);
