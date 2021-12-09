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

// Returns a time in the form of "7:14 PM"
export const dateObjectToTimeString = (date: Date): string => {
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const AM_or_PM = hours > 11 ? "PM" : "AM";
  return `${hours > 12 ? hours - 12 : hours}:${minutes} ${AM_or_PM}`;
};

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

// Guard for use while refactoring - to be obsoleted
export const isTimeStringArray = (time: string[] | string): time is string[] =>
  Array.isArray(time);

export const compareStringTimes = (
  timeStr1: string[] | string,
  timeStr2: string[] | string
): "eq" | "lt" | "gt" => {
  let comparison: "eq" | "lt" | "gt" = "eq";
  let timeInMs1: number;
  let timeInMs2: number;
  if (isTimeStringArray(timeStr1) && isTimeStringArray(timeStr2)) {
    const today = new Date();
    const dateFormatted = new Intl.DateTimeFormat("en-US").format(today);

    const fullDate1 = `${dateFormatted} ${timeStr1.join("")}`; // "11/24/2013 2:10 PM"
    const fullDate2 = `${dateFormatted} ${timeStr2.join("")}`;
    timeInMs1 = new Date(fullDate1).getTime();
    timeInMs2 = new Date(fullDate2).getTime();
  } else if (!isTimeStringArray(timeStr1) && !isTimeStringArray(timeStr2)) {
    timeInMs1 = new Date(timeStr1).getTime();
    timeInMs2 = new Date(timeStr2).getTime();
  } else {
    // if the two times are different formats this is truly hopeless
    throw Error("having a bad time?");
  }

  if (timeInMs1 < timeInMs2) {
    comparison = "lt";
  } else if (timeInMs1 > timeInMs2) {
    comparison = "gt";
  }
  return comparison;
};

export default formattedDate;
