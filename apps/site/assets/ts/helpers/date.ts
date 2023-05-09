import { getMinutes, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

// this returns a Date() in the browser time zone, unlike new Date(unformatted)
export const stringToDateObject = (unformatted: string): Date => {
  const [year, month, day] = unformatted
    .split(/-/)
    .map(part => Number.parseInt(part, 10));

  // Remember that months in JS are 0-indexed for some reason, hence "month - 1".
  const parsedDate = new Date(year, month - 1, day);
  return parsedDate;
};

// Returns a date in the form of "2019-08-07"
export const dateObjectToString = (date: Date): string =>
  [
    date.getFullYear(),
    `0${date.getMonth() + 1}`.slice(-2),
    `0${date.getDate()}`.slice(-2)
  ].join("-");

// Returns a date in the form of "August 7, 2019"
export const formattedDate = (unformatted: string): string => {
  const parsedDate = stringToDateObject(unformatted);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
};

// Returns a date in the form of "Aug 7"
export const shortDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });

export const compareStringTimes = (
  timeStr1: string[],
  timeStr2: string[]
): string => {
  const today = new Date();
  const dateFormatted = new Intl.DateTimeFormat("en-US").format(today);

  const fullDate1 = `${dateFormatted} ${timeStr1.join("")}`; // "11/24/2013 2:10 PM"
  const fullDate2 = `${dateFormatted} ${timeStr2.join("")}`;

  const timeInMs1 = new Date(fullDate1).getTime();
  const timeInMs2 = new Date(fullDate2).getTime();

  let comparison = "eq";
  if (timeInMs1 < timeInMs2) {
    comparison = "lt";
  } else if (timeInMs1 > timeInMs2) {
    comparison = "gt";
  }
  return comparison;
};

export const formatToBostonTime = (
  dateTimeString: string | Date,
  overrideFormat?: string
): string => {
  const dateTime =
    typeof dateTimeString === "string"
      ? parseISO(dateTimeString)
      : dateTimeString;
  let formatString = "h:mm aa"; // 5:00 AM
  if (getMinutes(dateTime) === 0) {
    formatString = "h aa"; // 5 AM
  }
  formatString = overrideFormat !== undefined ? overrideFormat : formatString;
  return formatInTimeZone(dateTime, "America/New_York", formatString);
};

export default formattedDate;
