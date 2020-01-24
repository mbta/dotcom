// Returns a date in the form of "August 7, 2019"
export const formattedDate = (unformatted: string): string => {
  const [year, month, day] = unformatted
    .split(/-/)
    .map(part => Number.parseInt(part, 10));

  // Remember that months in JS are 0-indexed for some reason, hence "month - 1".
  const parsedDate = new Date(year, month - 1, day);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
};

// Returns a time in the form of "05:16 AM"
export const shortTime = (date: string): string =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

export default formattedDate;
