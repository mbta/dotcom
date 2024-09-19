import React from "react";

const Badge = ({
  text,
  contextText,
  bgClass
}: {
  text: string;
  contextText?: string;
  bgClass?: string;
}): JSX.Element => {
  return (
    <div
      className={`${bgClass ||
        "u-error-background"} font-weight-bold u-ps-8 u-pe-8 fs-14`}
      style={{ borderRadius: "0.75rem" }}
    >
      {/* The purpose of this block is to have invisble text for screen readers */}
      {contextText && <span className="sr-only">{contextText}</span>}
      {text}
    </div>
  );
};

export default Badge;
