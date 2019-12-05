import React, { ReactElement } from "react";
import { ServiceOptGroup } from "../../../helpers/service";
import { Service, DayInteger, ServiceWithServiceDate } from "../../../__v3api";

interface Props {
  service: ServiceWithServiceDate;
  group: ServiceOptGroup;
  servicePeriod: string;
  multipleWeekdays: boolean;
}

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

const daysAreConsecutive = (
  days: DayInteger[],
  areConsecutive: boolean
): boolean => {
  if (!areConsecutive) return areConsecutive;
  const [day, nextDay, ...rest] = days;
  if (rest.length === 0) return day + 1 === nextDay;
  return daysAreConsecutive([nextDay, ...rest], day + 1 === nextDay);
};

export const serviceDays = ({
  type,
  valid_days: validDays
}: Service): string => {
  if (type === "saturday" || type === "sunday") return "";

  if (validDays.length === 1) return `${dayIntegerToString(validDays[0])}`;

  if (daysAreConsecutive(validDays, true)) {
    return `${dayIntegerToString(validDays[0])} - ${dayIntegerToString(
      validDays[validDays.length - 1]
    )}`;
  }

  return `${validDays.map(dayIntegerToString).join(", ")}`;
};

const ServiceOption = ({
  service,
  group,
  servicePeriod,
  multipleWeekdays
}: Props): ReactElement<HTMLElement> => {
  const isMultipleWeekday =
    multipleWeekdays &&
    service.type === "weekday" &&
    service.typicality !== "holiday_service";
  return (
    <option value={service.id}>
      {isMultipleWeekday
        ? `${serviceDays(service)} schedule`
        : service.description}
      {group !== "holiday" ? ", " : " "}
      {servicePeriod}
    </option>
  );
};

export default ServiceOption;
