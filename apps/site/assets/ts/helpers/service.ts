import { Service, DayInteger, ServiceWithServiceDate } from "../__v3api";

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

const formattedDate = (date: Date): string =>
  `${monthIntegerToString(date.getUTCMonth())} ${date.getUTCDate()}`;

const holidayDate = (service: Service): string => {
  const note = service.added_dates_notes[service.start_date];
  return note || `on ${formattedDate(new Date(service.start_date))}`;
};

export type ServiceOptGroupName = "current" | "holiday" | "future";

export interface ServiceByOptGroup {
  type: ServiceOptGroupName;
  servicePeriod: string;
  service: ServiceWithServiceDate;
}

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
): boolean => {
  const serviceDayOfWeek = UTCDayToDayInteger(
    new Date(serviceDate).getUTCDay()
  );
  return (
    service.valid_days.includes(serviceDayOfWeek) &&
    !service.removed_dates.includes(serviceDate)
  );
};

export const getTodaysSchedule = (
  services: ServicesKeyedByGroup
): ServiceByOptGroup | null => {
  let holidayMatch: ServiceByOptGroup[] = [];
  let currentMatch: ServiceByOptGroup[] = [];
  if (services.holiday.length > 0) {
    holidayMatch = services.holiday.filter(
      service => service.service.start_date === service.service.service_date
    );
  }
  if (services.current.length > 0) {
    currentMatch = services.current.filter(service =>
      serviceDayMatch(service.service, service.service.service_date)
    );
  }
  if (holidayMatch.length > 0) return holidayMatch[0];
  if (currentMatch.length > 0) return currentMatch[0];
  return null;
};

export type ServicesKeyedByGroup = {
  [key in ServiceOptGroupName]: ServiceByOptGroup[]
};

export const groupByType = (
  acc: ServicesKeyedByGroup,
  currService: ServiceByOptGroup
): ServicesKeyedByGroup => {
  const currentServiceType: ServiceOptGroupName = currService.type;
  const updatedGroup = [...acc[currentServiceType], currService];
  return { ...acc, [currentServiceType]: updatedGroup };
};

export const groupServiceByDate = (
  service: ServiceWithServiceDate,
  ratingEndDate: string
): ServiceByOptGroup[] => {
  const {
    start_date: startDate,
    end_date: endDate,
    added_dates: addedDates,
    added_dates_notes: addedDatesNotes,
    service_date: serviceDate,
    typicality
  } = service;

  if (typicality === "holiday_service") {
    return addedDates.map(addedDate => ({
      type: "holiday" as ServiceOptGroupName,
      servicePeriod: `${addedDatesNotes[addedDate]}, ${formattedDate(
        new Date(addedDate)
      )}`,
      service
    }));
  }

  const serviceDateTime = new Date(serviceDate).getTime();
  const startDateObject = new Date(startDate);
  const startDateTime = startDateObject.getTime();
  const endDateObject = new Date(endDate);
  const endDateTime = endDateObject.getTime();
  const ratingEndDateTime = new Date(ratingEndDate).getTime();

  if (typicality === "unplanned_disruption") {
    const type =
      serviceDateTime >= startDateTime && serviceDateTime <= endDateTime
        ? "current"
        : "future";

    return [
      {
        type,
        servicePeriod: formattedDate(new Date(startDateObject)),
        service
      }
    ];
  }

  if (endDateObject.getTime() <= ratingEndDateTime) {
    return [
      {
        type: "current",
        servicePeriod: `ends ${formattedDate(endDateObject)}`,
        service
      }
    ];
  }

  return [
    {
      type: "future",
      servicePeriod: `starts ${formattedDate(startDateObject)}`,
      service
    }
  ];
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
    // Get unix timestamps
    const serviceDateTime = new Date(service.service_date).getTime();
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

type MonthInteger = number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const hasMultipleWeekdaySchedules = (
  services: ServiceWithServiceDate[]
): boolean =>
  services.filter(
    service =>
      service.type === "weekday" && service.typicality !== "holiday_service"
  ).length > 1;
