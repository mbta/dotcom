import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
  useRef
} from "react";
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
import { SelectedDirection } from "../ScheduleFinder";
import { RoutePatternWithShape } from "../__schedule";

// until we come up with a good integration test for async with loading
// some lines in this file have been ignored from codecov

const optGroupNames: ServiceOptGroup[] = ["current", "holiday", "other"];

const optGroupTitles: { [key in ServiceOptGroup]: string } = {
  current: "Current Schedules",
  holiday: "Holiday Schedules",
  other: "Other Schedules"
};

interface Props {
  stopId: string;
  services: ServiceWithServiceDate[];
  routeId: string;
  directionId: SelectedDirection;
  routePatterns: RoutePatternWithShape[];
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

export const fetchSchedule = (
  services: ServiceWithServiceDate[],
  selectedServiceId: string,
  routeId: string,
  stopId: string,
  directionId: SelectedDirection,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setSelectedServiceSchedule: Dispatch<SetStateAction<null>>
): void => {
  setIsLoading(true);

  const selectedService = services.find(
    service => service.id === selectedServiceId
  );

  if (!selectedService) {
    return;
  }

  if (window.fetch) {
    window
      .fetch(
        `/schedules/schedule_api?id=${routeId}&date=${
          selectedService.end_date
        }&direction_id=${directionId}&stop_id=${stopId}`
      )
      .then(response => {
        setIsLoading(false);
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => setSelectedServiceSchedule(json));
  }
};

export const ServiceSelector = ({
  stopId,
  services,
  routeId,
  directionId,
  routePatterns
}: Props): ReactElement<HTMLElement> | null => {
  const ref = useRef<HTMLSelectElement>(null);

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServiceSchedule, setSelectedServiceSchedule] = useState(null);

  useEffect(
    () =>
      fetchSchedule(
        services,
        selectedServiceId,
        routeId,
        stopId,
        directionId,
        setIsLoading,
        setSelectedServiceSchedule
      ),
    [services, directionId, routeId, selectedServiceId, stopId]
  );

  if (services.length <= 0) return null;

  const servicesByOptGroup: ServicesKeyedByGroup = services
    .map((service: ServiceWithServiceDate) => groupServiceByDate(service))
    .reduce(groupByType, { current: [], holiday: [], other: [] });

  const defaultServiceId = getTodaysScheduleId(servicesByOptGroup);

  if (!selectedServiceId) {
    setSelectedServiceId(defaultServiceId);
  }

  return (
    <>
      <h3>Daily Schedule</h3>
      <div className="schedule-finder__service-selector">
        <SelectContainer id="service_selector_container" error={false}>
          <select
            ref={ref}
            id="service_selector"
            className="schedule-finder__select"
            defaultValue={defaultServiceId}
            onChange={(): void => {
              /* istanbul ignore next */
              if (ref && ref.current) {
                setSelectedServiceId(ref.current.value);
              }
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

      {isLoading && (
        <div className="schedule-finder__spinner-container">
          <div className="schedule-finder__spinner">Loading...</div>
        </div>
      )}

      {/* istanbul ignore next */ !isLoading &&
        /* istanbul ignore next */ selectedServiceSchedule && (
          /* istanbul ignore next */ <ScheduleTable
            schedule={selectedServiceSchedule!}
            routePatterns={routePatterns}
          />
        )}
    </>
  );
};

export default ServiceSelector;
