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

export default formattedDate;
