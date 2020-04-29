import { Dictionary } from "lodash";
import React, { ReactElement, useEffect, useState, useReducer } from "react";
import SelectContainer from "./SelectContainer";
import {
  hasMultipleWeekdaySchedules,
  groupServicesByDateRating,
  isCurrentValidService,
  serviceStartDateComparator,
  optGroupComparator
} from "../../../helpers/service";
import { reducer } from "../../../helpers/fetch";
import ScheduleTable from "./ScheduleTable";
import { EnhancedRoutePattern, ServiceInSelector } from "../__schedule";
import ServiceOptGroup from "./ServiceOptGroup";
import { Journey } from "../__trips";
import { DirectionId, Service } from "../../../__v3api";
import { stringToDateObject } from "../../../helpers/date";

// until we come up with a good integration test for async with loading
// some lines in this file have been ignored from codecov

interface Props {
  stopId: string;
  services: ServiceInSelector[];
  routeId: string;
  directionId: DirectionId;
  routePatterns: EnhancedRoutePattern[];
  today: string;
}

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: Journey[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const fetchData = (
  routeId: string,
  stopId: string,
  selectedService: Service,
  selectedDirection: DirectionId,
  isCurrent: boolean,
  dispatch: (action: fetchAction) => void
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/finder_api/journeys?id=${routeId}&date=${
          selectedService.end_date
        }&direction=${selectedDirection}&stop=${stopId}&is_current=${isCurrent}`
      )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

export const ServiceSelector = ({
  stopId,
  services,
  routeId,
  directionId,
  routePatterns,
  today
}: Props): ReactElement<HTMLElement> | null => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  });

  const todayDate = stringToDateObject(today);

  // By default, show the current day's service
  const currentServices = services
    .sort(serviceStartDateComparator)
    .filter(service => isCurrentValidService(service, todayDate));

  const [defaultSelectedService] = currentServices.length
    ? currentServices
    : services;
  const now = currentServices.length ? defaultSelectedService.id : "";
  const [selectedService, setSelectedService] = useState(
    defaultSelectedService
  );

  useEffect(
    () => {
      /* istanbul ignore next */
      if (!selectedService) return;
      fetchData(routeId, stopId, selectedService, directionId, false, dispatch);
    },
    [services, routeId, directionId, stopId, selectedService]
  );

  if (services.length <= 0) return null;

  const servicesByOptGroup: Dictionary<Service[]> = groupServicesByDateRating(
    services,
    todayDate
  );

  return (
    <>
      <h3>Daily Schedule</h3>
      <div className="schedule-finder__service-selector">
        <label htmlFor="service_selector" className="sr-only">
          Schedules
        </label>
        <SelectContainer>
          <select
            id="service_selector"
            className="c-select-custom text-center u-bold"
            defaultValue={defaultSelectedService.id}
            onChange={(e): void => {
              const chosenService = services.find(s => s.id === e.target.value);
              if (chosenService) {
                setSelectedService(chosenService);
              }
            }}
          >
            {Object.keys(servicesByOptGroup)
              .sort(optGroupComparator)
              .map((group: string) => {
                const groupedServices = servicesByOptGroup[group];
                /* istanbul ignore next */
                if (groupedServices.length <= 0) return null;

                return (
                  <ServiceOptGroup
                    key={group}
                    label={group}
                    services={groupedServices}
                    multipleWeekdays={hasMultipleWeekdaySchedules(
                      groupedServices
                    )}
                    now={now}
                  />
                );
              })}
          </select>
        </SelectContainer>
      </div>

      {state.isLoading && (
        <div className="c-spinner__container">
          <div className="c-spinner">Loading...</div>
        </div>
      )}

      {/* istanbul ignore next */ !state.isLoading &&
        /* istanbul ignore next */ state.data && (
          /* istanbul ignore next */ <ScheduleTable
            journeys={state.data!}
            routePatterns={routePatterns}
            input={{
              route: routeId,
              origin: stopId,
              direction: directionId,
              date: selectedService!.end_date
            }}
          />
        )}
    </>
  );
};

export default ServiceSelector;
