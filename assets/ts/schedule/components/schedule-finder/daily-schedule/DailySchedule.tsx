import React, { ReactElement, useEffect, useState } from "react";
import { Dictionary, each, join, sortBy, split } from "lodash";
import { DirectionId, Service } from "../../../../__v3api";
import Loading from "../../../../components/Loading";
import { stringToDateObject } from "../../../../helpers/date";
import {
  groupServicesByDateRating,
  isCurrentValidService,
  serviceStartDateComparator,
  optGroupComparator,
  serviceComparator
} from "../../../../helpers/service";
import useFetch, {
  isLoading,
  isNotStarted
} from "../../../../helpers/use-fetch";
import { EnhancedRoutePattern, ServiceInSelector } from "../../__schedule";
import { Journey } from "../../__trips";
import SelectContainer from "../SelectContainer";
import ScheduleTable from "./ScheduleTable";
import ServiceOptGroup from "./ServiceOptGroup";

// until we come up with a good integration test for async with loading
// some lines in this file have been ignored from codecov

interface Props {
  selectedOrigin: string;
  services: ServiceInSelector[];
  routeId: string;
  directionId: DirectionId;
  routePatterns: EnhancedRoutePattern[];
  today: string;
}

// Exported solely for testing
export const fetchJourneys = (
  routeId: string,
  selectedOrigin: string,
  selectedService: Service,
  selectedDirection: DirectionId,
  isCurrent: boolean
): (() => Promise<Response>) => () =>
  window.fetch &&
  window.fetch(
    `/schedules/finder_api/journeys?id=${
      routeId === "627" ? "627,76,62" : routeId
    }&date=${getRepresentativeDate(
      selectedService
    )}&direction=${selectedDirection}&stop=${selectedOrigin}&is_current=${isCurrent}`
  );

export const getRepresentativeDate = (service: Service) => {
  if (service.id === "FallWeekday") {
    /*
     * This is a quick-fix hack in order to ensure that the
     * "representative date" that we use to query the API for the
     * FallWeekday service/schedule is not a Friday. Some routes have
     * different schedules on Fridays versus other days, but since the
     * previous behaviour was to use the service's end-date as its
     * representative date, that resulted in a bug where when a rider
     * tried to view a M-Th weekday schedule, it would show Friday
     * trips instead.
     *
     * The root cause is that we're using services to represent
     * schedules, despite those being slightly different things. This
     * hack is in place only until we address the root problem.
     */
    return "2025-12-11";
  } else {
    return service.end_date;
  }
};

// Takes grouped holiday records with the same schedule and flattens them into their own
// Service entry
export const expandHolidayServices = (
  services: ServiceInSelector[]
): ServiceInSelector[] => {
  const expandedServices: ServiceInSelector[] = [];
  each(services, service => {
    if (
      service.typicality === "holiday_service" &&
      service.added_dates.length > 1
    ) {
      each(service.added_dates, dateString => {
        const serviceName = service.added_dates_notes[dateString];
        expandedServices.push({
          ...service,
          added_dates: [dateString],
          added_dates_notes: { [dateString]: serviceName },
          start_date: dateString,
          id: `${dateString}-${join(split(serviceName, " "), "")}`
        });
      });
    } else {
      expandedServices.push(service);
    }
  });
  return expandedServices;
};

// Exported solely for testing
export const parseResults = (json: JSON): Journey[] =>
  (json as unknown) as Journey[];

const SchedulesSelect = ({
  sortedServices,
  todayServiceId,
  defaultSelectedServiceId,
  todayDate,
  onSelectService
}: {
  sortedServices: ServiceInSelector[];
  defaultSelectedServiceId: string;
  todayServiceId: string;
  todayDate: Date;
  onSelectService: (service: ServiceInSelector | undefined) => void;
}): ReactElement<HTMLElement> => {
  const servicesWithExpandedHolidays = expandHolidayServices(
    sortedServices
  ).sort(serviceStartDateComparator);
  const servicesByOptGroup: Dictionary<Service[]> = groupServicesByDateRating(
    servicesWithExpandedHolidays,
    todayDate
  );

  return (
    <div className="schedule-finder__service-selector">
      <label>
        <span className="sr-only">
          Choose a schedule type from the available options
        </span>
        <SelectContainer>
          <select
            className="c-select-custom text-center font-bold"
            defaultValue={defaultSelectedServiceId}
            onChange={e =>
              onSelectService(
                servicesWithExpandedHolidays.find(s => s.id === e.target.value)
              )
            }
            aria-controls="daily-schedule"
          >
            {Object.keys(servicesByOptGroup)
              .sort(optGroupComparator)
              .map((group: string) => {
                const groupedServices = servicesByOptGroup[group];
                const sortedService =
                  group === "Holiday Schedules"
                    ? sortBy(groupedServices, "start_date")
                    : sortBy(groupedServices, serviceComparator);
                /* istanbul ignore next */
                if (groupedServices.length <= 0) return null;

                return (
                  <ServiceOptGroup
                    key={group}
                    label={group}
                    services={sortedService}
                    todayServiceId={todayServiceId}
                  />
                );
              })}
          </select>
        </SelectContainer>
      </label>
    </div>
  );
};

export const DailySchedule = ({
  selectedOrigin,
  services,
  routeId,
  directionId,
  routePatterns,
  today
}: Props): ReactElement<HTMLElement> | null => {
  const [fetchState, fetch] = useFetch<Journey[]>();

  const todayDate = stringToDateObject(today);

  // By default, show the current day's service
  const sortedServices = services.sort(serviceStartDateComparator);
  const currentServices = sortedServices.filter(service =>
    isCurrentValidService(service, todayDate)
  );
  const todayService =
    currentServices.find(service => !!service["default_service?"]) ||
    currentServices[0];
  const todayServiceId = todayService?.id || "";
  const defaultSelectedService = todayService || sortedServices[0];

  const [selectedService, setSelectedService] = useState(
    defaultSelectedService
  );

  const getJourneysForSelectedService = (service: Service): void => {
    fetch({
      fetcher: fetchJourneys(
        routeId,
        selectedOrigin,
        service,
        directionId,
        false
      ),
      parser: parseResults
    });
  };

  useEffect(
    () => {
      /* istanbul ignore next */
      if (selectedService && isNotStarted(fetchState)) {
        getJourneysForSelectedService(selectedService);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (services.length <= 0) return null;

  return (
    <>
      <h3>Daily Schedule</h3>

      <SchedulesSelect
        sortedServices={sortedServices}
        todayServiceId={todayServiceId}
        defaultSelectedServiceId={defaultSelectedService.id}
        todayDate={todayDate}
        onSelectService={chosenService => {
          if (chosenService) {
            setSelectedService(chosenService);
            getJourneysForSelectedService(chosenService);
          }
        }}
      />

      <div id="daily-schedule">
        {isLoading(fetchState) ? (
          <Loading />
        ) : (
          <span className="sr-only" aria-live="polite">
            Showing times for {selectedService.description}
          </span>
        )}

        {/* istanbul ignore next */ !isLoading(fetchState) &&
          /* istanbul ignore next */ fetchState.data && (
            /* istanbul ignore next */ <ScheduleTable
              journeys={fetchState.data}
              routePatterns={routePatterns}
              input={{
                route: routeId,
                origin: selectedOrigin,
                direction: directionId,
                date: selectedService!.end_date
              }}
            />
          )}
      </div>
    </>
  );
};

export default DailySchedule;
