import React, { ReactElement } from "react";
import { ServiceScheduleInfo, RoutePatternWithShape } from "../__schedule";
import TableRow from "./TableRow";

interface Props {
  schedule: ServiceScheduleInfo;
  routePatterns: RoutePatternWithShape[];
}

const ScheduleTable = ({
  schedule,
  routePatterns
}: Props): ReactElement<HTMLElement> => {
  const routePatternsById = routePatterns.reduce(
    (accumulator, routePattern) =>
      Object.assign({}, accumulator, { [routePattern.id]: routePattern }),
    {}
  ) as {
    [key: string]: RoutePatternWithShape;
  };

  if (schedule.trip_order.length === 0) {
    return (
      <div className="callout schedule-table--empty">
        There is no scheduled service for this time period.
      </div>
    );
  }
  const firstTrip = schedule.trip_order[0];
  const lastTrip =
    schedule.trip_order.length > 1
      ? schedule.trip_order[schedule.trip_order.length - 1]
      : null;

  const routePatternId = schedule.by_trip[firstTrip].route_pattern_id;

  const isSchoolTrip =
    (
      (routePatternsById[routePatternId] &&
        routePatternsById[routePatternId].time_desc) ||
      ""
    ).match(/school/gi) !== null;

  return (
    <>
      <div className="schedule-finder__first-last-trip">
        <div className="u-small-caps u-bold">First Trip</div>
        {schedule.by_trip[firstTrip].schedules[0].time}
        {lastTrip && (
          <>
            <div className="u-small-caps u-bold">Last Trip</div>
            {schedule.by_trip[lastTrip].schedules[0].time}
          </>
        )}
      </div>
      <table className="schedule-table">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
            <th className="schedule-table__row-header-label" />
            <th className="schedule-table__row-header-label">Departs</th>
            {schedule.by_trip[firstTrip].schedules[0].route.type === 2 && (
              <th className="schedule-table__row-header-label--small">Train</th>
            )}
            <th className="schedule-table__row-header-label">Destination</th>
          </tr>
        </thead>
        <tbody>
          {schedule.trip_order.map((tripId: string) => (
            <TableRow
              key={tripId}
              schedules={schedule.by_trip[tripId]}
              isSchoolTrip={isSchoolTrip}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ScheduleTable;
