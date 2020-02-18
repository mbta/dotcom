import _, { Dictionary } from "lodash";
import { Service, DayInteger } from "../__v3api";
import { shortDate, stringToDateObject, dateObjectToString } from "./date";

export enum ServiceGroupNames {
  HOLIDAY = "Holiday Schedules",
  CURRENT = "Current Schedules",
  FUTURE = "Future Schedules",
  OTHER = "Other Schedules"
}

export const serviceStartDateComparator = (
  service1: Service,
  service2: Service
): number =>
  stringToDateObject(service1.start_date).getTime() -
  stringToDateObject(service2.start_date).getTime();

const isInRemovedDates = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  const date = dateObjectToString(currentDate);
  // the date must be in the removed_dates list and have a non-null note
  return (
    service.removed_dates.includes(date) && !!service.removed_dates_notes[date]
  );
};

const isInAddedDates = (
  service: Service,
  currentDate: Date = new Date()
): boolean => service.added_dates.includes(dateObjectToString(currentDate));

const isOnValidDay = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  let currentDay = currentDate.getDay();
  // different numbering from valid_days for sunday
  currentDay = currentDay === 0 ? 7 : currentDay;
  return service.valid_days.includes(currentDay as DayInteger);
};

const isInCurrentService = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  const serviceStartDate = stringToDateObject(service.start_date);
  const serviceEndDate = stringToDateObject(service.end_date);
  return currentDate >= serviceStartDate && currentDate <= serviceEndDate;
};

export const isCurrentValidService = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  // check against added dates
  if (isInAddedDates(service, currentDate)) {
    return true;
  }

  // check against removed dates
  if (isInRemovedDates(service, currentDate)) {
    return false;
  }

  // check on valid_days
  if (!isOnValidDay(service, currentDate)) {
    return false;
  }

  // check within service dates
  return isInCurrentService(service, currentDate);
};

export const hasIncompleteRating = (service: Service): boolean =>
  !service.rating_start_date || !service.rating_end_date;

export const isInCurrentRating = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  if (hasIncompleteRating(service)) {
    return false;
  }
  const ratingStartDate = stringToDateObject(service.rating_start_date!);
  const ratingEndDate = stringToDateObject(service.rating_end_date!);
  return currentDate >= ratingStartDate && currentDate <= ratingEndDate;
};

export const startToEnd = (
  startDateObject: Date,
  endDateObject: Date
): string => `${shortDate(startDateObject)} to ${shortDate(endDateObject)}`;

export const isInFutureService = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  const serviceStartDate = stringToDateObject(service.start_date);
  const serviceEndDate = stringToDateObject(service.end_date);
  return currentDate <= serviceStartDate && currentDate <= serviceEndDate;
};

export const isInFutureRating = (
  service: Service,
  currentDate: Date = new Date()
): boolean => {
  if (hasIncompleteRating(service)) {
    // check for rating start date
    return service.rating_start_date
      ? currentDate <= stringToDateObject(service.rating_start_date!)
      : false;
  }

  const ratingStartDate = stringToDateObject(service.rating_start_date!);
  const ratingEndDate = stringToDateObject(service.rating_end_date!);

  return currentDate <= ratingStartDate && currentDate <= ratingEndDate;
};

export const groupServicesByDateRating = (
  services: Service[],
  currentDate: Date = new Date()
): Dictionary<Service[]> =>
  _.groupBy(services, (service: Service) => {
    if (service.typicality === "holiday_service") {
      return ServiceGroupNames.HOLIDAY;
    }

    if (service.type === "other") {
      return ServiceGroupNames.OTHER;
    }

    // if there's no rating end date, this is probably a CR or Ferry.
    // don't use the rating in that case.
    if (
      hasIncompleteRating(service) &&
      isInCurrentService(service, currentDate)
    ) {
      return ServiceGroupNames.CURRENT;
    }
    if (
      (hasIncompleteRating(service) ||
        !isInFutureRating(service, currentDate)) &&
      isInFutureService(service, currentDate)
    ) {
      return ServiceGroupNames.FUTURE;
    }

    const ratingStartDate = stringToDateObject(service.rating_start_date!);
    const ratingEndDate = stringToDateObject(service.rating_end_date!);

    if (
      isInCurrentRating(service, currentDate) &&
      service.typicality === "typical_service"
    ) {
      return `${ServiceGroupNames.CURRENT} (${
        service.rating_description
      }, ends ${shortDate(ratingEndDate)})`;
    }

    if (isInFutureRating(service, currentDate)) {
      return `${ServiceGroupNames.FUTURE} (${
        service.rating_description
      }, starts ${shortDate(ratingStartDate)})`;
    }

    return ServiceGroupNames.OTHER;
  });

// sort the option groups
const optGroupOrder: { [key: string]: number } = {
  [ServiceGroupNames.CURRENT]: 4,
  [ServiceGroupNames.HOLIDAY]: 3,
  [ServiceGroupNames.FUTURE]: 2,
  [ServiceGroupNames.OTHER]: 1
};

// group names may have extra verbiage
export const optGroupComparator = (groupA: string, groupB: string): number => {
  const optGroupNames = Object.values(ServiceGroupNames);
  const a = optGroupNames.find(name => groupA.includes(name));
  const b = optGroupNames.find(name => groupB.includes(name));
  return optGroupOrder[b!] - optGroupOrder[a!];
};

export const hasMultipleWeekdaySchedules = (services: Service[]): boolean =>
  services.filter(
    service =>
      service.type === "weekday" && service.typicality !== "holiday_service"
  ).length > 1;

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

const daysAreConsecutive = (days: DayInteger[]): boolean => {
  const [day, nextDay, ...rest] = days;
  if (rest.length === 0) return day + 1 === nextDay;
  if (day + 1 !== nextDay) return false;
  return daysAreConsecutive([nextDay, ...rest]);
};

export const serviceDays = ({
  type,
  valid_days: validDays
}: Service): string => {
  if (type === "saturday" || type === "sunday") return "";

  if (validDays.length === 1) return `${dayIntegerToString(validDays[0])}`;

  if (daysAreConsecutive(validDays)) {
    return validDays[0] === 1 && validDays[validDays.length - 1] === 5
      ? "Weekday"
      : `${dayIntegerToString(validDays[0])} - ${dayIntegerToString(
          validDays[validDays.length - 1]
        )}`;
  }

  return `${validDays.map(dayIntegerToString).join(", ")}`;
};
