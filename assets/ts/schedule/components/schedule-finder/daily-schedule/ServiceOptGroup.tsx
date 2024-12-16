import React, { ReactElement } from "react";
import { format } from "date-fns";
import { Service } from "../../../../__v3api";
import { shortDate, stringToDateObject } from "../../../../helpers/date";
import {
  ServiceGroupNames,
  dedupeServices,
  isInAddedDates,
  isInCurrentService
} from "../../../../helpers/service";

interface Props {
  label: string;
  services: Service[];
  todayServiceId: string;
  nowDate?: Date;
}

const ServiceOptGroup = ({
  label,
  services,
  todayServiceId,
  nowDate = new Date()
}: Props): ReactElement<HTMLElement> | null =>
  services.length === 0 ? null : (
    <optgroup label={label}>
      {dedupeServices(services).map(service => {
        const startDate = stringToDateObject(service.start_date);
        const endDate = stringToDateObject(service.end_date);
        const dateRange = `${shortDate(startDate)} to ${shortDate(endDate)}`;
        let optionText = "";

        if (
          service.typicality === "unplanned_disruption" ||
          service.typicality === "planned_disruption"
        ) {
          optionText = service.description;
        } else if (
          ["extra_service", "holiday_service"].includes(service.typicality) &&
          service.added_dates &&
          service.added_dates_notes
        ) {
          const addedDate = service.added_dates[0];
          const addedNote = service.added_dates_notes[addedDate];
          const addedNoteString = addedNote ? `${addedNote}, ` : "";
          optionText = `${addedNoteString}${shortDate(
            stringToDateObject(addedDate)
          )}`;
        } else if (label === ServiceGroupNames.OTHER) {
          optionText = `${service.description}, ${dateRange}`;
        } else {
          optionText = service.description;
          if (service.rating_description) {
            optionText += `, ${service.rating_description}`;
          }
        }

        if (service.id === todayServiceId) {
          // if it's the only service this rating, this service might not
          // technically be now - adjust text for that
          if (
            isInCurrentService(service, nowDate) ||
            isInAddedDates(service, nowDate)
          ) {
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
