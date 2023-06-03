import React from "react";
import { formatRelativeTime, formatToBostonTime } from "../../helpers/date";

export interface BasicTimeProps {
  displayType: "relative" | "absolute";
  strikethrough?: boolean;
  time: Date | undefined;
  targetDate?: Date;
}
const BasicTime = ({
  displayType,
  strikethrough,
  time,
  targetDate
}: BasicTimeProps): JSX.Element | null => {
  if (!time) return null;

  const formattedTime =
    displayType === "relative"
      ? formatRelativeTime(time, targetDate)
      : formatToBostonTime(time, "h:mm aa");

  return (
    <time
      dateTime={time.toISOString()}
      className={strikethrough ? "strikethrough" : ""}
    >
      {formattedTime}
    </time>
  );
};

export default BasicTime;
