import React from "react";

const FontAwesomeIcon = (
  className: string,
  svgName: string,
  ariaHide: boolean = true,
  ariaLabel: string = ""
): JSX.Element => (
  <i
    className={
      className
        ? `fa ${svgName} notranslate ${className}`
        : `fa ${svgName} notranslate`
    }
    aria-hidden={ariaHide ? "true" : "false"}
    {...(ariaLabel.length ? { "aria-label": ariaLabel } : {})}
  />
);

export default FontAwesomeIcon;
