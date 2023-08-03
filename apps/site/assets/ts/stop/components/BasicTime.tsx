import React from "react";
import parse from "date-fns/parse";
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

  // displayType === "relative" might produce an absolute-formatted time if it's
  // more than an hour away. parse the result to find the truth.
  const parsedTime = parse(formattedTime, "h:mm aa", new Date()).getTime();
  const isAbsolute = Number.isNaN(parsedTime) ? "relative" : "absolute";
  // add data attribute to be used for later manipulation and filtering
  const dataType: "relative" | "absolute" | "imminent" =
    formattedTime === "<1 minute away" ? "imminent" : isAbsolute;
  return (
    <time
      data-type={dataType}
      dateTime={time.toISOString()}
      className={strikethrough ? "strikethrough" : ""}
    >
      {formattedTime}
    </time>
  );
};

export default BasicTime;
