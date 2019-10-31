import React, { ReactElement, Dispatch, SetStateAction } from "react";
import SelectContainer from "./SelectContainer";
import { ServiceWithServiceDate } from "../../../__v3api";
import {
  ServicesKeyedByGroup,
  groupServiceByDate,
  groupByType,
  getTodaysSchedule,
  ServiceOptGroup,
  ServiceByOptGroup,
  serviceDays,
  hasMultipleWeekdaySchedules
} from "../../../helpers/service";
import ScheduleTable from "./ScheduleTable";
import { EnhancedRoutePattern, ServiceScheduleInfo } from "../__schedule";

// until we come up with a good integration test for async with loading
// some lines in this file have been ignored from codecov

const optGroupNames: ServiceOptGroup[] = ["current", "holiday", "future"];

const optGroupTitles: { [key in ServiceOptGroup]: string } = {
  current: "Current Schedules",
  holiday: "Holiday Schedules",
  future: "Future Schedules"
};

export interface ScheduleState {
  data: ServiceScheduleInfo | null;
  initial: ServiceScheduleInfo | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  scheduleState: ScheduleState;
  selectedServiceId: string;
  setSelectedServiceId: Dispatch<SetStateAction<string>>;
  services: ServiceWithServiceDate[];
  routePatterns: EnhancedRoutePattern[];
}

const serviceDescription = (
  service: ServiceWithServiceDate,
  group: ServiceOptGroup,
  servicePeriod: string,
  multipleWeekdays: boolean
): ReactElement<HTMLElement> => {
  const isMultipleWeekday =
    multipleWeekdays &&
    service.type === "weekday" &&
    service.typicality !== "holiday_service";
  return (
    <option value={service.id} key={service.id}>
      {isMultipleWeekday
        ? `${serviceDays(service)} schedule`
        : service.description}
      {group !== "holiday" ? ", " : " "}
      {servicePeriod}
    </option>
  );
};

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

export const ServiceSelector = ({
  scheduleState,
  selectedServiceId,
  setSelectedServiceId,
  services,
  routePatterns
}: Props): ReactElement<HTMLElement> | null => {
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
                  {servicesByOptGroup[group].map((service: ServiceByOptGroup) =>
                    serviceDescription(
                      service.service,
                      group,
                      service.servicePeriod,
                      multipleWeekdays
                    )
                  )}
                </optgroup>
              );
            })}
          </select>
        </SelectContainer>
      </div>

      {scheduleState.isLoading && (
        <div className="c-spinner__container">
          <div className="c-spinner">Loading...</div>
        </div>
      )}

      {/* istanbul ignore next */ !scheduleState.isLoading &&
        /* istanbul ignore next */ scheduleState.data && (
          /* istanbul ignore next */ <ScheduleTable
            schedule={scheduleState.data!}
            routePatterns={routePatterns}
          />
        )}
    </>
  );
};

export default ServiceSelector;
