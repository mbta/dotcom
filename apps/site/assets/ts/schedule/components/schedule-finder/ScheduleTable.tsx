import React, { ReactElement } from "react";
import { ServiceScheduleInfo } from "../__schedule";
import TableRow from "./TableRow";

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
        {schedule.by_trip[firstTrip].schedules[0].time}
        <div className="u-small-caps u-bold">Last Trip</div>
        {schedule.by_trip[lastTrip].schedules[0].time}
      </div>
      <table className="schedule-table">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
            <th className="schedule-table__row-header-label">Departs</th>
            {schedule.by_trip[firstTrip].schedules[0].route.type === 2 && (
              <th className="schedule-table__row-header-label--small">Train</th>
            )}
            <th className="schedule-table__row-header-label">Destination</th>
          </tr>
        </thead>
        <tbody>
          {schedule.trip_order.map((tripId: string) => (
            <TableRow key={tripId} schedules={schedule.by_trip[tripId]} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ScheduleTable;
