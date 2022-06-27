import React from "react";

export default (
  className: string,
  svgName: string,
  ariaHide: boolean = true
): JSX.Element => (
  <i
    className={
      className
        ? `fa fa-${svgName} notranslate ${className}`
        : `fa fa-${svgName} notranslate`
    }
    aria-hidden={ariaHide ? "true" : "false"}
  />
);
