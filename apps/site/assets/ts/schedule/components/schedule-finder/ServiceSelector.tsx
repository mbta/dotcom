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
  serviceDays
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
          {optGroupNames.map((group: ServiceOptGroup) => (
            <optgroup key={group} label={optGroupTitles[group]}>
              {servicesByOptGroup[group].map((service: ServiceByOptGroup) => {
                const daysOfWeek = serviceDays(service.service);
                return (
                  <option value={service.service.id} key={service.service.id}>
                    {service.service.description}
                    {daysOfWeek && ` ${daysOfWeek}`}
                    {group !== "holiday" ? ", " : " "}
                    {service.servicePeriod}
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
      </SelectContainer>
    </div>
  );
};

export default ServiceSelector;
