import React, { ReactElement } from "react";
import { EnhancedRoutePattern } from "../__schedule";
import { Journey } from "../__trips";
import TableRow from "./TableRow";
import { UserInput } from "../ScheduleFinder";

interface Props {
  journeys: Journey[];
  routePatterns: EnhancedRoutePattern[];
  input: UserInput;
}

const isSchoolTrip = (
  routePatternsById: {
    [key: string]: EnhancedRoutePattern;
  },
  routePatternId: string
): boolean =>
  (
    (routePatternsById[routePatternId] &&
      routePatternsById[routePatternId].time_desc) ||
    ""
  ).match(/school/gi) !== null;

const ScheduleTable = ({
  journeys,
  routePatterns,
  input
}: Props): ReactElement<HTMLElement> => {
  const routePatternsById = routePatterns.reduce(
    (accumulator, routePattern) => ({
      ...accumulator,
      [routePattern.id]: routePattern
    }),
    {}
  ) as {
    [key: string]: EnhancedRoutePattern;
  };

  if (journeys.length === 0) {
    return (
      <div className="callout schedule-table--empty">
        There is no scheduled service for this time period.
      </div>
    );
  }
  const firstTrip = journeys[0];
  const lastTrip = journeys.length > 1 ? journeys[journeys.length - 1] : null;

  const anySchoolTrips = Object.values(journeys).some(
    ({ trip: { route_pattern_id: routePatternId } }) =>
      isSchoolTrip(routePatternsById, routePatternId)
  );

  return (
    <>
      <div className="schedule-finder__first-last-trip--bordered first-last-trips">
        <div className="first-last-trips__trip">
          <span className="schedule-finder__first-last-trip-label">
            First Trip
          </span>
          {firstTrip.departure.time}
        </div>
        {lastTrip && (
          <div className="first-last-trips__trip">
            <span className="schedule-finder__first-last-trip-label">
              Last Trip
            </span>
            {lastTrip.departure.time}
          </div>
        )}
      </div>
      {anySchoolTrips && (
        <p>
          <strong>S</strong> - Does NOT run on school vacation
        </p>
      )}
      <table className="schedule-table">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
            {anySchoolTrips && (
              <th
                scope="col"
                className="schedule-table__row-header-label--tiny"
              />
            )}
            <th scope="col" className="schedule-table__row-header-label">
              Departs
            </th>
            {firstTrip.route.type === 2 && (
              <th
                scope="col"
                className="schedule-table__row-header-label--small"
              >
                Train
              </th>
            )}
            <th scope="col" className="schedule-table__row-header-label">
              Destination
            </th>
            <th scope="col" className="schedule-table__th--flex-end">
              Trip Details
            </th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey: Journey) => (
            <TableRow
              key={journey.trip.id}
              input={input}
              journey={journey}
              isSchoolTrip={isSchoolTrip(
                routePatternsById,
                journey.trip.route_pattern_id
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
