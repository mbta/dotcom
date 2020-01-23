import { Service, ServiceWithServiceDate } from "../__v3api";
import { shortDate } from "./date";

const formattedDate = (date: Date): string => shortDate(date);

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

const startToEnd = (startDateObject: Date, endDateObject: Date): string =>
  `${formattedDate(startDateObject)} to ${formattedDate(endDateObject)}`;

export const groupServiceByDate = (
  service: ServiceWithServiceDate
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

  if (typicality === "unplanned_disruption") {
    const type =
      serviceDateTime >= startDateTime && serviceDateTime <= endDateTime
        ? "current"
        : "future";

    const stormServicePeriod =
      startDate === endDate
        ? formattedDate(startDateObject)
        : startToEnd(startDateObject, endDateObject);

    return [
      {
        type,
        servicePeriod: stormServicePeriod,
        service
      }
    ];
  }

  if (serviceDateTime >= startDateTime && serviceDateTime <= endDateTime) {
    return [
      {
        type: "current",
        servicePeriod: `ends ${formattedDate(endDateObject)}`,
        service
      }
    ];
  }

  if (serviceDateTime < startDateTime) {
    return [
      {
        type: "future",
        servicePeriod: `starts ${formattedDate(startDateObject)}`,
        service
      }
    ];
  }

  return [
    {
      type: "future",
      servicePeriod: startToEnd(startDateObject, endDateObject),
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
  return startToEnd(startDateObject, endDateObject);
};

export const hasMultipleWeekdaySchedules = (
  services: ServiceWithServiceDate[]
): boolean =>
  services.filter(
    service =>
      service.type === "weekday" && service.typicality !== "holiday_service"
  ).length > 1;
