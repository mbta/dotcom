import { Service, DayInteger, ServiceWithServiceDate } from "../__v3api";

const formattedDate = (date: Date): string =>
  `${monthIntegerToString(date.getUTCMonth())} ${date.getUTCDate()}`;

const holidayDate = (service: Service): string => {
  const note = service.added_dates_notes[service.start_date];
  return note || `on ${formattedDate(new Date(service.start_date))}`;
};

export type ServiceOptGroup = "current" | "holiday" | "other";

export interface ServiceByOptGroup {
  type: ServiceOptGroup;
  servicePeriod: string;
  service: ServiceWithServiceDate;
}

export const getTodaysSchedule = (services: ServicesKeyedByGroup) => {
  const serviceDate = "2019-06-30";
  //const serviceDate = services["current"][0].service.service_date;
  let holidayMatch: ServiceByOptGroup[] = [];
  let currentMatch: ServiceByOptGroup[] = [];
  if (services["holiday"].length > 0) {
    holidayMatch = services["holiday"].filter(
      service => service.service.start_date === serviceDate
    );
  }
  if (services["current"].length > 0) {
    currentMatch = services["current"].filter(service =>
      serviceDayMatch(service.service, serviceDate)
    );
  }
  if (holidayMatch.length > 0) return holidayMatch[0];
  if (currentMatch.length > 0) return currentMatch[0];
  return null;
};

const UTCDayToDayInteger = (day: number): DayInteger => {
  // Sunday is 0 for getUTCDay, but 7 for our valid_days
  if (day === 0) {
    return 7;
  }
  return day as DayInteger;
};

const serviceDayMatch = (
  service: ServiceWithServiceDate,
  serviceDate: string
) => {
  const serviceDateObject = new Date(serviceDate);
  let serviceDayOfWeek = UTCDayToDayInteger(serviceDateObject.getUTCDay());
  return (
    service.valid_days.includes(serviceDayOfWeek) &&
    !service.removed_dates.includes(serviceDate)
  );
};

export type ServicesKeyedByGroup = {
  [key in ServiceOptGroup]: ServiceByOptGroup[]
};

export const groupByType = (
  acc: ServicesKeyedByGroup,
  currService: ServiceByOptGroup
) => {
  const currentServiceType: ServiceOptGroup = currService.type;
  const updatedGroup = [...acc[currentServiceType], currService];
  return { ...acc, [currentServiceType]: updatedGroup };
};

export const groupServiceByDate = (
  service: ServiceWithServiceDate
): ServiceByOptGroup => {
  const {
    service_date: serviceDate,
    start_date: startDate,
    end_date: endDate
  } = service;

  // Get unix timestamps
  if (startDate === endDate) {
    return {
      type: "holiday",
      servicePeriod: holidayDate(service),
      service: service
    };
  }

  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  const serviceDateTime = new Date(serviceDate).getTime();
  const startDateTime = startDateObject.getTime();
  const endDateTime = endDateObject.getTime();

  if (serviceDateTime >= startDateTime && serviceDateTime <= endDateTime) {
    return {
      type: "current",
      servicePeriod: `ends ${formattedDate(endDateObject)}`,
      service: service
    };
  }

  if (serviceDateTime < startDateTime) {
    return {
      type: "other",
      servicePeriod: `starts ${formattedDate(startDateObject)}`,
      service: service
    };
  }

  return {
    type: "other",
    servicePeriod: `${formattedDate(startDateObject)} to ${formattedDate(
      endDateObject
    )}`,
    service: service
  };
};

export const serviceDate = (
  service: Service | ServiceWithServiceDate
): string => {
  const { start_date: startDate, end_date: endDate } = service;
  if (service.start_date === service.end_date) {
    return holidayDate(service);
  }

  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  if ("service_date" in service) {
    const serviceDate = service.service_date;
    // Get unix timestamps
    const serviceDateTime = new Date(serviceDate).getTime();
    const startDateTime = startDateObject.getTime();
    const endDateTime = endDateObject.getTime();

    if (serviceDateTime >= startDateTime && serviceDateTime <= endDateTime) {
      return `ends ${formattedDate(endDateObject)}`;
    }

    if (serviceDateTime < startDateTime) {
      return `starts ${formattedDate(startDateObject)}`;
    }
  }
  return `${formattedDate(startDateObject)} to ${formattedDate(endDateObject)}`;
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

const monthIntegerToString = (month: MonthInteger): string =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ][month];

type MonthInteger = number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const serviceDays = ({
  type,
  valid_days: validDays
}: Service): string => {
  if (type === "saturday" || type === "sunday") return "";

  if (validDays.length === 1) return `(${dayIntegerToString(validDays[0])})`;

  if (daysAreConsecutive(validDays, true)) {
    return ` (${dayIntegerToString(validDays[0])} - ${dayIntegerToString(
      validDays[validDays.length - 1]
    )})`;
  }

  return ` (${validDays.map(dayIntegerToString).join(", ")})`;
};
