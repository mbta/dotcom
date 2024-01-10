import React from "react";

const FontAwesomeIcon = (
  className: string,
  svgName: string,
  ariaHide: boolean = true
): JSX.Element => (
  <i
    className={
      className
        ? `fa ${svgName} notranslate ${className}`
        : `fa ${svgName} notranslate`
    }
    aria-hidden={ariaHide ? "true" : "false"}
  />
);

export default FontAwesomeIcon;
