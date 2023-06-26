import React, { ReactElement } from "react";
import { format } from "date-fns";
import { Service } from "../../../../__v3api";
import { shortDate, stringToDateObject } from "../../../../helpers/date";
import {
  ServiceGroupNames,
  serviceDays,
  dedupeServices,
  isInCurrentService
} from "../../../../helpers/service";

interface Props {
  label: string;
  services: Service[];
  multipleWeekdays: boolean;
  todayServiceId: string;
  nowDate?: Date;
}

const ServiceOptGroup = ({
  label,
  services,
  multipleWeekdays,
  todayServiceId,
  nowDate = new Date()
}: Props): ReactElement<HTMLElement> | null =>
  services.length === 0 ? null : (
    <optgroup label={label}>
      {dedupeServices(services).map(service => {
        const isMultipleWeekday =
          multipleWeekdays &&
          service.type === "weekday" &&
          service.typicality !== "holiday_service";

        const startDate = stringToDateObject(service.start_date);
        const endDate = stringToDateObject(service.end_date);
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
                return `${shortDate(stringToDateObject(addedDate))}`;
              }
              return `${addedNote}, ${shortDate(
                stringToDateObject(addedDate)
              )}`;
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

        if (service.id === todayServiceId) {
          // if it's the only service this rating, this service might not
          // technically be now - adjust text for that
          if (isInCurrentService(service, nowDate)) {
            optionText += " (now)";
          } else {
            optionText += ` (Starting ${format(startDate, "MMMM d, y")})`;
          }
        }

        return (
          <option
            key={service.id}
            value={service.id}
            // the <optgroup> is not reliably conveyed to assistive tech, so add extra label here
            aria-label={`${label} ${optionText}`}
          >
            {optionText}
          </option>
        );
      })}
    </optgroup>
  );

export default ServiceOptGroup;
