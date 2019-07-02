import React, { ReactElement } from "react";
import SelectContainer from "./SelectContainer";
import { ServiceWithServiceDate, Schedule } from "../../../__v3api";
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
import { ServiceSchedule } from "../__schedule";
import { RoutePillSmall } from "./UpcomingDepartures";
import { modeIcon } from "../../../helpers/icon";

const optGroupNames: ServiceOptGroup[] = ["current", "holiday", "other"];

const optGroupTitles: { [key in ServiceOptGroup]: string } = {
  current: "Current Schedules",
  holiday: "Holiday Schedules",
  other: "Other Schedules"
};

interface Props {
  services: ServiceWithServiceDate[];
  serviceSchedules: ServiceSchedule;
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

const Trip = ({ schedule }: { schedule: Schedule }) => {
  return (
    <tr>
      <td>
        {schedule.time} {schedule.trip.name && `Train ${schedule.trip.name} `}
        {schedule.stop.name}
      </td>
    </tr>
  );
};

const TableRow = ({
  schedule
}: {
  schedule: Schedule;
}): ReactElement<HTMLElement> | null => {
  if (schedule.route.type === 2) return <CrTableRow schedule={schedule} />;
  return (
    <tr className="schedule-table__row">
      <td className="schedule-table__td schedule-table__time">
        {schedule.time}
      </td>
      <td className="schedule-table__td">
        <div className="schedule-table__row-route">
          <RoutePillSmall route={schedule.route} />
        </div>
        {schedule.stop.name}
      </td>
    </tr>
  );
};

const CrTableRow = ({
  schedule
}: {
  schedule: Schedule;
}): ReactElement<HTMLElement> => {
  return (
    <tr className="schedule-table__row">
      <td className="schedule-table__td">
        <div className="schedule-table__time">{schedule.time}</div>
      </td>
      <td className="schedule-table__headsign">
        {modeIcon(schedule.route.id)}
        {"   "}
        {schedule.trip.name}
      </td>
    </tr>
  );
};

const ServiceSelector = ({
  services,
  serviceSchedules
}: Props): ReactElement<HTMLElement> => {
  const servicesByOptGroup: ServicesKeyedByGroup = services
    .map((service: ServiceWithServiceDate) => groupServiceByDate(service))
    .reduce(groupByType, { current: [], holiday: [], other: [] });

  const todayService = getTodaysSchedule(servicesByOptGroup);
  const defaultServiceId = todayService ? todayService.service.id : "";
  const selectedServiceSchedule = serviceSchedules[services[0].id]["0"];
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
      <table className="schedule-table">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
          <th className="schedule-table__row-header-label">Departs</th>
          <th className="schedule-table__row-header-label">Destination</th>
          </tr>
        </thead>
        <tbody>
          {selectedServiceSchedule.trip_order.map(trip_id => (
            <TableRow schedule={selectedServiceSchedule.by_trip[trip_id][0]} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceSelector;
