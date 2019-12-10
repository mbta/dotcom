import React, { ReactElement } from "react";
import ServiceOption from "./ServiceOption";
import HolidayServiceOption from "./HolidayServiceOption";
import {
  ServiceOptGroupName,
  ServiceByOptGroup
} from "../../../helpers/service";

interface Props {
  group: ServiceOptGroupName;
  label: string;
  services: ServiceByOptGroup[];
  multipleWeekdays: boolean;
}

const ServiceOptGroup = ({
  group,
  label,
  services,
  multipleWeekdays
}: Props): ReactElement<HTMLElement> | null => (
  <optgroup key={group} label={label}>
    {services.map((service: ServiceByOptGroup) =>
      group === "holiday" ? (
        <HolidayServiceOption
          key={service.service.id + service.servicePeriod}
          service={service.service}
          servicePeriod={service.servicePeriod}
        />
      ) : (
        <ServiceOption
          key={service.service.id + service.servicePeriod}
          service={service.service}
          group={group}
          servicePeriod={service.servicePeriod}
          multipleWeekdays={multipleWeekdays}
        />
      )
    )}
  </optgroup>
);
export default ServiceOptGroup;
