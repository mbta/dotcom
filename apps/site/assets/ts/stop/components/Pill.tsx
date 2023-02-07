import React, { ReactElement } from "react";

export const bgClass = (color: string | undefined): string =>
  color ? `u-bg--${color}` : "";

const Pill = ({
  onClick,
  selected = false,
  backgroundColor,
  optionalCSS = "",
  children
}: {
  onClick?: () => void;
  selected?: boolean;
  backgroundColor?: string | undefined;
  optionalCSS?: string | undefined;
  children: ReactElement<HTMLElement> | string;
}): ReactElement<HTMLElement> => {
  return (
    <div
      onClick={onClick}
      className={`
      u-pill
      u-small-caps
      pe-5 ps-5 me-5
      ${selected ? "u-bg--gray" : ""}
      ${bgClass(backgroundColor)}
      ${optionalCSS}
    `}
    >
      {children}
    </div>
  );
};

export default Pill;
