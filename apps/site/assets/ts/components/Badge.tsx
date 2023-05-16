import React from "react";

const Badge = ({ text }: { text: string }): JSX.Element => {
  return (
    <div
      className="u-error-background font-weight-bold ps-5 pe-5"
      style={{ borderRadius: "0.75rem" }}
    >
      {text}
    </div>
  );
};

export default Badge;
