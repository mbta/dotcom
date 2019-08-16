import React, { ReactElement } from "react";
import { ServiceScheduleInfo, RoutePatternWithShape } from "../__schedule";
import TableRow from "./TableRow";

interface Props {
  schedule: ServiceScheduleInfo;
  routePatterns: RoutePatternWithShape[];
}

const isSchoolTrip = (
  routePatternsById: {
    [key: string]: RoutePatternWithShape;
  },
  routePatternId: string
): boolean =>
  (
    (routePatternsById[routePatternId] &&
      routePatternsById[routePatternId].time_desc) ||
    ""
  ).match(/school/gi) !== null;

const ScheduleTable = ({
  schedule,
  routePatterns
}: Props): ReactElement<HTMLElement> => {
  const routePatternsById = routePatterns.reduce(
    (accumulator, routePattern) => ({
      ...accumulator,
      [routePattern.id]: routePattern
    }),
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

  const anySchoolTrips = Object.values(schedule.by_trip).some(
    ({ route_pattern_id: routePatternId }) =>
      isSchoolTrip(routePatternsById, routePatternId)
  );

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
      {anySchoolTrips && (
        <p className="text-center">
          <strong>S</strong> - Does NOT run on school vacation
        </p>
      )}
      <table className="schedule-table">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
            {anySchoolTrips && (
              <th className="schedule-table__row-header-label--tiny" />
            )}
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
              isSchoolTrip={isSchoolTrip(
                routePatternsById,
                schedule.by_trip[tripId].route_pattern_id
              )}
              anySchoolTrips={anySchoolTrips}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ScheduleTable;
