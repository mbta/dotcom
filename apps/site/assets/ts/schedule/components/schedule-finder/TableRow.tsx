import React, { useState, ReactElement } from "react";
import { ScheduleWithFare, ScheduleInfo } from "../__schedule";
import { RoutePillSmall } from "./UpcomingDepartures";
import { modeIcon } from "../../../helpers/icon";

const totalMinutes = (schedules: ScheduleInfo): string => schedules.duration;

const TripInfo = ({
  schedules
}: {
  schedules: ScheduleInfo;
}): ReactElement<HTMLElement> => {
  const lastTrip = schedules.schedules[schedules.schedules.length - 1];
  return (
    <tr>
      <td>
        <div className="schedule-table__subtable-trip-info">
          <div className="schedule-table__subtable-trip-info-title u-small-caps u-bold">
            Trip length
          </div>
          {schedules.schedules.length} stops, {totalMinutes(schedules)} minutes
          total
        </div>
        <div className="schedule-table__subtable-trip-info">
          <div className="schedule-table__subtable-trip-info-title u-small-caps u-bold">
            Fare
          </div>
          {lastTrip.price}
          <a
            className="schedule-table__subtable-trip-info-link"
            href={lastTrip.fare_link}
          >
            View fares
          </a>
        </div>
      </td>
    </tr>
  );
};

const BusTableRow = ({
  schedules
}: {
  schedules: ScheduleInfo;
}): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const firstSchedule = schedules.schedules[0];
  return (
    <>
      <tr
        className={
          expanded ? "schedule-table__row-selected" : "schedule-table__row"
        }
        onClick={() => setExpanded(!expanded)}
      >
        <td className="schedule-table__td schedule-table__time">
          {firstSchedule.time}
        </td>
        <td className="schedule-table__td">
          <div className="schedule-table__row-route">
            <RoutePillSmall route={firstSchedule.route} />
          </div>
          {firstSchedule.trip.headsign}
        </td>
      </tr>
      {expanded && (
        <tr className="schedule-table__subtable-container">
          <td className="schedule-table__subtable-td">
            <table className="schedule-table__subtable">
              <thead>
                <TripInfo schedules={schedules} />
                <tr className="schedule-table__subtable-row">
                  <th className="schedule-table__subtable-data">Stops</th>
                  <th className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
                    Arrival
                  </th>
                </tr>
              </thead>
              <tbody className="schedule-table__subtable-tbody">
                {schedules.schedules.map((schedule: ScheduleWithFare) => (
                  <tr
                    key={`${schedule.stop.id}-${schedule.trip.id}`}
                    className="schedule-table__subtable-row"
                  >
                    <td className="schedule-table__subtable-data">
                      <a href={`/stops/${schedule.stop.id}`}>
                        {schedule.stop.name}
                      </a>
                    </td>
                    <td className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
                      {schedule.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

const CrTableRow = ({
  schedules
}: {
  schedules: ScheduleInfo;
}): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const firstSchedule = schedules.schedules[0];

  return (
    <>
      <tr
        className={
          expanded ? "schedule-table__row-selected" : "schedule-table__row"
        }
        onClick={() => setExpanded(!expanded)}
      >
        <td className="schedule-table__td">
          <div className="schedule-table__time">{firstSchedule.time}</div>
        </td>
        <td className="schedule-table__td schedule-table__tab-num">
          {firstSchedule.trip.name}
        </td>
        <td className="schedule-table__headsign">
          {modeIcon(firstSchedule.route.id)} {firstSchedule.trip.headsign}
        </td>
      </tr>
      {expanded && (
        <tr className="schedule-table__subtable-container">
          <td className="schedule-table__subtable-td">
            <table className="schedule-table__subtable">
              <thead>
                <TripInfo schedules={schedules} />
                <tr className="schedule-table__subtable-row">
                  <th className="schedule-table__subtable-data schedule-table__subtable-data--long">
                    Stops
                  </th>
                  <th className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
                    Fare
                  </th>
                  <th className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
                    Arrival
                  </th>
                </tr>
              </thead>
              <tbody className="schedule-table__subtable-tbody">
                {schedules.schedules.map(
                  (schedule: ScheduleWithFare, index: number) => (
                    <tr
                      key={`${schedule.stop.id}-${schedule.trip.id}`}
                      className="schedule-table__subtable-row"
                    >
                      <td className="schedule-table__subtable-data">
                        <a href={`/stops/${schedule.stop.id}`}>
                          {schedule.stop.name}
                        </a>
                      </td>
                      <td className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
                        {index === 0 ? "" : schedule.price}
                      </td>
                      <td className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
                        {schedule.time}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

const TableRow = ({
  schedules
}: {
  schedules: ScheduleInfo;
}): ReactElement<HTMLElement> | null => {
  if (schedules.schedules[0].route.type === 2)
    return <CrTableRow schedules={schedules} />;
  return <BusTableRow schedules={schedules} />;
};

export default TableRow;
