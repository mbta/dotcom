import React, { ReactElement, useEffect, useState, useReducer } from "react";
import SelectContainer from "./SelectContainer";
import { ServiceWithServiceDate } from "../../../__v3api";
import {
  ServicesKeyedByGroup,
  groupServiceByDate,
  groupByType,
  getTodaysSchedule,
  ServiceOptGroup,
  ServiceByOptGroup,
  hasMultipleWeekdaySchedules
} from "../../../helpers/service";
import { reducer } from "../../../helpers/fetch";
import ScheduleTable from "./ScheduleTable";
import { SelectedDirection } from "../ScheduleFinder";
import { EnhancedRoutePattern, ServiceScheduleInfo } from "../__schedule";
import ServiceOption from "./ServiceOption";

// until we come up with a good integration test for async with loading
// some lines in this file have been ignored from codecov

const optGroupNames: ServiceOptGroup[] = ["current", "holiday", "future"];

const optGroupTitles: { [key in ServiceOptGroup]: string } = {
  current: "Current Schedules",
  holiday: "Holiday Schedules",
  future: "Future Schedules"
};

interface Props {
  stopId: string;
  services: ServiceWithServiceDate[];
  routeId: string;
  directionId: SelectedDirection;
  routePatterns: EnhancedRoutePattern[];
}

const getTodaysScheduleId = (
  servicesByOptGroup: ServicesKeyedByGroup
): string => {
  const todayService = getTodaysSchedule(servicesByOptGroup);
  return todayService ? todayService.service.id : "";
};

const firstFutureScheduleId = (
  servicesByOptGroup: ServicesKeyedByGroup
): string => {
  const firstFutureSchedule = servicesByOptGroup.future[0];
  return firstFutureSchedule ? firstFutureSchedule.service.id : "";
};

const firstHolidayScheduleId = (
  servicesByOptGroup: ServicesKeyedByGroup
): string => {
  const firstHolidaySchedule = servicesByOptGroup.holiday[0];
  return firstHolidaySchedule ? firstHolidaySchedule.service.id : "";
};

export const getDefaultScheduleId = (
  servicesByOptGroup: ServicesKeyedByGroup
): string =>
  getTodaysScheduleId(servicesByOptGroup) ||
  firstFutureScheduleId(servicesByOptGroup) ||
  firstHolidayScheduleId(servicesByOptGroup);

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: ServiceScheduleInfo }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const fetchData = (
  routeId: string,
  stopId: string,
  selectedService: ServiceWithServiceDate,
  selectedDirection: SelectedDirection,
  dispatch: (action: fetchAction) => void
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/schedule_api?id=${routeId}&date=${
          selectedService.end_date
        }&direction_id=${selectedDirection}&stop_id=${stopId}`
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

interface State {
  data: ServiceScheduleInfo | null;
  isLoading: boolean;
  error: boolean;
}

export const ServiceSelector = ({
  stopId,
  services,
  routeId,
  directionId,
  routePatterns
}: Props): ReactElement<HTMLElement> | null => {
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  });

  useEffect(
    () => {
      const selectedService = services.find(
        service => service.id === selectedServiceId
      );

      if (!selectedService) {
        return;
      }
      fetchData(routeId, stopId, selectedService, directionId, dispatch);
    },
    [services, routeId, directionId, stopId, selectedServiceId]
  );

  if (services.length <= 0) return null;

  const servicesByOptGroup: ServicesKeyedByGroup = services
    .map((service: ServiceWithServiceDate) => groupServiceByDate(service))
    .reduce(groupByType, { current: [], holiday: [], future: [] });

  const defaultServiceId = getDefaultScheduleId(servicesByOptGroup);

  if (!selectedServiceId) {
    setSelectedServiceId(defaultServiceId);
  }

  return (
    <>
      <h3>Daily Schedule</h3>
      <div className="schedule-finder__service-selector">
        <SelectContainer id="service_selector_container" error={false}>
          <select
            id="service_selector"
            className="c-select-custom"
            defaultValue={defaultServiceId}
            onChange={(e): void => {
              setSelectedServiceId(e.target.value);
            }}
          >
            {optGroupNames.map((group: ServiceOptGroup) => {
              const multipleWeekdays = hasMultipleWeekdaySchedules(
                servicesByOptGroup[group].map(service => service.service)
              );

              return (
                <optgroup key={group} label={optGroupTitles[group]}>
                  {servicesByOptGroup[group].map(
                    (service: ServiceByOptGroup) => (
                      <ServiceOption
                        service={service.service}
                        group={group}
                        servicePeriod={service.servicePeriod}
                        multipleWeekdays={multipleWeekdays}
                      />
                    )
                  )}
                </optgroup>
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
            schedule={state.data!}
            routePatterns={routePatterns}
          />
        )}
    </>
  );
};

export default ServiceSelector;
