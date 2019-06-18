import { Service, DayInteger } from "../__v3api";

const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

const holidayDate = (service: Service): string => {
  const note = service.added_dates_notes[service.start_date];
  return note || formattedDate(service.start_date);
};

export const serviceDate = (service: Service): string => {
  const { start_date: startDate, end_date: endDate } = service;
  return service.start_date === service.end_date
    ? holidayDate(service)
    : `${formattedDate(startDate)} to ${formattedDate(endDate)}`;
};

const daysAreConsecutive = (
  days: DayInteger[],
  areConsecutive: boolean
): boolean => {
  if (!areConsecutive) return areConsecutive;
  const [day, nextDay, ...rest] = days;
  if (rest.length === 0) return day + 1 === nextDay;
  return daysAreConsecutive([nextDay, ...rest], day + 1 === nextDay);
};

const dayIntegerToString = (day: DayInteger): string =>
  [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ][day - 1];

export const serviceDays = ({
  type,
  valid_days: validDays
}: Service): string => {
  if (type === "saturday" || type === "sunday") return "";

  if (validDays.length === 1) return `(${dayIntegerToString(validDays[0])})`;

  if (daysAreConsecutive(validDays, true)) {
    return `(${dayIntegerToString(validDays[0])} - ${dayIntegerToString(
      validDays[validDays.length - 1]
    )})`;
  }

  return `(${validDays.map(dayIntegerToString).join(", ")})`;
};
