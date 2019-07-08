import React, { ReactElement, useState, useRef } from "react";
import SelectContainer from "./SelectContainer";
import {
  ServiceWithServiceDate,
  Schedule,
  DirectionId
} from "../../../__v3api";
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
import { ServiceSchedule, ServiceScheduleInfo } from "../__schedule";
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
  directionId: DirectionId;
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
        {schedule.trip.headsign}
      </td>
    </tr>
  );
};

const CrTableRow = ({
  schedule
}: {
  schedule: Schedule;
}): ReactElement<HTMLElement> => (
  <tr className="schedule-table__row">
    <td className="schedule-table__td">
      <div className="schedule-table__time">{schedule.time}</div>
    </td>
    <td className="schedule-table__td schedule-table__tab-num">
      {schedule.trip.name}
    </td>
    <td className="schedule-table__headsign">
      {modeIcon(schedule.route.id)}
      {"   "}
      {schedule.trip.headsign}
    </td>
  </tr>
);

const getTodaysScheduleId = (
  servicesByOptGroup: ServicesKeyedByGroup
): string => {
  const todayService = getTodaysSchedule(servicesByOptGroup);
  return todayService ? todayService.service.id : "";
};

const ServiceSelector = ({
  services,
  serviceSchedules,
  directionId
}: Props): ReactElement<HTMLElement> => {
  const ref = useRef<HTMLSelectElement>(null);
  const [state, setState] = useState({ selectedServiceId: "" });
  const servicesByOptGroup: ServicesKeyedByGroup = services
    .map((service: ServiceWithServiceDate) => groupServiceByDate(service))
    .reduce(groupByType, { current: [], holiday: [], other: [] });

  const defaultServiceId = getTodaysScheduleId(servicesByOptGroup);
  const selectedServiceId = state.selectedServiceId || defaultServiceId;
  const selectedServiceSchedule =
    serviceSchedules[selectedServiceId][directionId];

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
              if (ref && ref.current) {
                setState({ selectedServiceId: ref.current.value });
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
      <ScheduleTable schedule={selectedServiceSchedule} />
    </>
  );
};

const ScheduleTable = ({
  schedule
}: {
  schedule: ServiceScheduleInfo;
}): ReactElement<HTMLElement> => {
  const firstTrip = schedule.trip_order[0];
  const lastTrip = schedule.trip_order[schedule.trip_order.length - 1];

  return (
    <>
      <div className="schedule-finder__first-last-trip">
        <div className="u-small-caps u-bold">First Trip</div>
        {schedule.by_trip[firstTrip][0].time}
        <div className="u-small-caps u-bold">Last Trip</div>
        {schedule.by_trip[lastTrip][0].time}
      </div>
      <table className="schedule-table">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
            <th className="schedule-table__row-header-label">Departs</th>
            {schedule.by_trip[firstTrip][0].route.type === 2 && (
              <th className="schedule-table__row-header-label--small">Train</th>
            )}
            <th className="schedule-table__row-header-label">Destination</th>
          </tr>
        </thead>
        <tbody>
          {schedule.trip_order.map((tripId: string) => (
            <TableRow key={tripId} schedule={schedule.by_trip[tripId][0]} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ServiceSelector;
