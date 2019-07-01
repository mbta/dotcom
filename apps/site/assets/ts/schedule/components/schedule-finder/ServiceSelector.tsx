import React, { ReactElement } from "react";
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

const optGroupNames: ServiceOptGroup[] = ["current", "holiday", "other"];

const optGroupTitles: { [key in ServiceOptGroup]: string } = {
  current: "Current Schedules",
  holiday: "Holiday Schedules",
  other: "Other Schedules"
};

interface Props {
  services: ServiceWithServiceDate[];
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

const ServiceSelector = ({ services }: Props): ReactElement<HTMLElement> => {
  const servicesByOptGroup: ServicesKeyedByGroup = services
    .map((service: ServiceWithServiceDate) => groupServiceByDate(service))
    .reduce(groupByType, { current: [], holiday: [], other: [] });

  const todayService = getTodaysSchedule(servicesByOptGroup);
  const defaultServiceId = todayService ? todayService.service.id : "";
  return (
    <div className="schedule-finder__service-selector">
      <SelectContainer id="service_selector_container" error={false}>
        <select
          id="service_selector"
          className="schedule-finder__select"
          defaultValue={defaultServiceId}
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
  );
};

export default ServiceSelector;
