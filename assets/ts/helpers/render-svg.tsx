import React from "react";

const SVGIcon = (
  className: string,
  svgText: string,
  ariaHide: boolean = true
): JSX.Element => (
  <span
    className={className ? `notranslate ${className}` : "notranslate"}
    aria-hidden={ariaHide ? "true" : "false"}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: svgText }}
  />
);

export default SVGIcon;
