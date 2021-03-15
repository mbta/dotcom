import React, { ReactElement } from "react";
import { Service } from "../../../../__v3api";
import { shortDate } from "../../../../helpers/date";
import {
  ServiceGroupNames,
  serviceDays,
  dedupeServices
} from "../../../../helpers/service";

interface Props {
  label: string;
  services: Service[];
  multipleWeekdays: boolean;
  todayServiceId: string;
}

const ServiceOptGroup = ({
  label,
  services,
  multipleWeekdays,
  todayServiceId
}: Props): ReactElement<HTMLElement> | null =>
  services.length === 0 ? null : (
    <optgroup label={label}>
      {dedupeServices(services).map(service => {
        const isMultipleWeekday =
          multipleWeekdays &&
          service.type === "weekday" &&
          service.typicality !== "holiday_service";

        const startDate = new Date(service.start_date);
        const endDate = new Date(service.end_date);
        let optionText = "";

        if (
          service.typicality === "unplanned_disruption" ||
          service.typicality === "planned_disruption"
        ) {
          optionText = service.description;
        } else if (
          service.typicality === "holiday_service" &&
          service.added_dates_notes
        ) {
          optionText = Object.entries(service.added_dates_notes)
            .map(entry => {
              const [addedDate, addedNote] = entry;
              if (addedNote === "") {
                return `${shortDate(new Date(addedDate))}`;
              }
              return `${addedNote}, ${shortDate(new Date(addedDate))}`;
            })
            .join(", ");
        } else if (label === ServiceGroupNames.OTHER) {
          optionText = isMultipleWeekday
            ? `${serviceDays(service)} schedule`
            : service.description;
          optionText += `, ${shortDate(startDate)} to ${shortDate(endDate)}`;
        } else {
          optionText = isMultipleWeekday
            ? `${serviceDays(service)} schedule`
            : service.description;
          if (service.rating_description) {
            optionText += `, ${service.rating_description}`;
          }
        }

        return (
          <option key={service.id} value={service.id}>
            {optionText}
            {service.id === todayServiceId && " (now)"}
          </option>
        );
      })}
    </optgroup>
  );

export default ServiceOptGroup;
