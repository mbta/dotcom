import React from "react";

const SVGIcon = (
  className: string,
  svgText: string,
  ariaHide: boolean = true,
  ariaLabel: string = ""
): JSX.Element => (
  <span
    className={className ? `notranslate ${className}` : "notranslate"}
    aria-hidden={ariaHide ? "true" : "false"}
    {...(ariaLabel.length ? {"aria-label":ariaLabel} : {})}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: svgText }}
  />
);

export default SVGIcon;
