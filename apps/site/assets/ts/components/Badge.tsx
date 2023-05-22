import React from "react";

const Badge = ({
  text,
  contextText
}: {
  text: string;
  contextText?: string;
}): JSX.Element => {
  return (
    <div
      className="u-error-background font-weight-bold ps-8 pe-8 fs-14"
      style={{ borderRadius: "0.75rem" }}
    >
      {/* The purpose of this block is to have invisble text for screen readers*/}
      {contextText && <span className="u-display-none">{contextText}</span>}
      {text}
    </div>
  );
};

export default Badge;
