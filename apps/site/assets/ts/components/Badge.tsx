import React from "react";

const Badge = ({ text }: { text: string }): JSX.Element => {
  return (
    <div
      className="u-error-background font-weight-bold ps-8 pe-8 fs-14"
      style={{ borderRadius: "0.75rem" }}
    >
      {text}
    </div>
  );
};

export default Badge;
