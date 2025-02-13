import _, { Dictionary } from "lodash";
import {
  Service,
  DayInteger,
  ServiceType,
  ServiceTypicality
} from "../__v3api";
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

const isInRemovedDates = (service: Service, currentDate: Date): boolean =>
  service.removed_dates.includes(dateObjectToString(currentDate));

export const isInAddedDates = (service: Service, currentDate: Date): boolean =>
  service.added_dates.includes(dateObjectToString(currentDate));

const isOnValidDay = (service: Service, currentDate: Date): boolean => {
  let currentDay = currentDate.getDay();
  // different numbering from valid_days for sunday
  currentDay = currentDay === 0 ? 7 : currentDay;
  return service.valid_days.includes(currentDay as DayInteger);
};

export const isInCurrentService = (
  service: Service,
  currentDate: Date
): boolean => {
  const serviceStartDate = stringToDateObject(service.start_date);
  const serviceEndDate = stringToDateObject(service.end_date);
  return currentDate >= serviceStartDate && currentDate <= serviceEndDate;
};

export const isInCurrentRating = (
  service: Service,
  currentDate: Date
): boolean => {
  if (!service.rating_start_date) {
    return false;
  }
  const ratingStartDate = stringToDateObject(service.rating_start_date!);
  if (!service.rating_end_date) {
    // this might be a commuter rail or ferry. treat null rating end as infinite?
    return currentDate >= ratingStartDate;
  }
  const ratingEndDate = stringToDateObject(service.rating_end_date!);
  return currentDate >= ratingStartDate && currentDate <= ratingEndDate;
};

export const isCurrentValidService = (
  service: Service,
  currentDate: Date
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

  // check within rating dates
  return isInCurrentRating(service, currentDate);
};

export const startToEnd = (
  startDateObject: Date,
  endDateObject: Date
): string => `${shortDate(startDateObject)} to ${shortDate(endDateObject)}`;

export const isInFutureService = (
  service: Service,
  currentDate: Date
): boolean => {
  const serviceStartDate = stringToDateObject(service.start_date);
  const serviceEndDate = stringToDateObject(service.end_date);
  return currentDate < serviceStartDate && currentDate < serviceEndDate;
};

export const isInFutureRating = (
  service: Service,
  currentDate: Date
): boolean => {
  if (!service.rating_end_date) {
    if (service.rating_start_date) {
      return currentDate < stringToDateObject(service.rating_start_date!);
    }
    return false;
  }

  const ratingStartDate = stringToDateObject(service.rating_start_date!);
  const ratingEndDate = stringToDateObject(service.rating_end_date!);
  return currentDate < ratingStartDate && currentDate < ratingEndDate;
};

const areSimilarServices = (service1: Service, service2: Service): boolean => {
  const properties = [
    "valid_days",
    "typicality",
    "type",
    "rating_start_date",
    "rating_end_date",
    "name",
    "description",
    "start_date"
  ];
  return _.every(properties, (p: keyof Service) =>
    _.isEqual(service2[p], service1[p])
  );
};

// If two similar services are present, show only one. Choose the first
// sequentially (this depends on the input list already being sorted by
// start_date).
export const dedupeServices = (services: Service[]): Service[] =>
  _.uniqWith(services, areSimilarServices);

export const groupServicesByDateRating = (
  services: Service[],
  currentDate: Date
): Dictionary<Service[]> =>
  _.groupBy(services, (service: Service) => {
    if (service.typicality === "holiday_service") {
      return ServiceGroupNames.HOLIDAY;
    }

    if (service.type === "other") {
      return ServiceGroupNames.OTHER;
    }

    // if there's no rating end date, this is probably a CR or Ferry
    // don't use the rating dates in the returned text in that case.
    // additionally, prioritize current service/rating in grouping
    if (!service.rating_end_date) {
      if (
        isInAddedDates(service, currentDate) ||
        isInCurrentService(service, currentDate) ||
        isInCurrentRating(service, currentDate)
      ) {
        return ServiceGroupNames.CURRENT;
      }
      if (isInFutureRating(service, currentDate)) {
        return ServiceGroupNames.FUTURE;
      }
    }

    const ratingStartDate = stringToDateObject(service.rating_start_date!);
    const ratingEndDate = stringToDateObject(service.rating_end_date!);

    if (isInCurrentRating(service, currentDate)) {
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

// sort the service types
const serviceTypeOrder: { [key in ServiceType]: number } = {
  weekday: 5,
  weekend: 4,
  saturday: 3,
  sunday: 2,
  other: 1
};

/* eslint-disable camelcase */
// sort the service typicalities
const serviceTypicalityOrder: { [key in ServiceTypicality]: number } = {
  canonical: 6,
  unplanned_disruption: 4,
  planned_disruption: 3,
  holiday_service: 2,
  extra_service: 1,
  typical_service: 0,
  unknown: 0
};
/* eslint-enable camelcase */

// enable sorting of services by service type, service typicality, and start
export const serviceComparator = [
  (service: Service) => -serviceTypeOrder[service.type],
  (service: Service) => -serviceTypicalityOrder[service.typicality],
  "start_date"
];

// group names may have extra verbiage
export const optGroupComparator = (groupA: string, groupB: string): number => {
  const optGroupNames = Object.values(ServiceGroupNames);
  const a = optGroupNames.find(name => groupA.includes(name));
  const b = optGroupNames.find(name => groupB.includes(name));
  return optGroupOrder[b!] - optGroupOrder[a!];
};
