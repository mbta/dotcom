import React, { ReactElement } from "react";

export const bgClass = (color: string | undefined): string =>
  color ? `u-bg--${color}` : "";

const PillLink = ({
  displayText,
  linkText,
  backgroundColor,
  optionalCSS = "",
  externalLink
}: {
  displayText: string;
  linkText: string;
  backgroundColor?: string | undefined;
  optionalCSS?: string | undefined;
  externalLink?: boolean;
}): ReactElement<HTMLElement> => {
  return (
    <a
      target={externalLink ? "_blank" : "_self"}
      rel="noreferrer"
      href={linkText}
      className={`
      m-stop-page__header-feature
      m-stop-page__header-description
      u-small-caps
      ${bgClass(backgroundColor)}
      ${optionalCSS}
    `}
    >
      {displayText}
    </a>
  );
};

export default PillLink;
