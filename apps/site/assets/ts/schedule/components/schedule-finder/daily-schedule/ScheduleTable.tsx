import React, { ReactElement } from "react";
import { isACommuterRailRoute } from "../../../../models/route";
import { EnhancedRoutePattern, UserInput } from "../../__schedule";
import { Journey } from "../../__trips";
import TableRow from "./TableRow";

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
      <div className="callout u-bold text-center">
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
      <div className="schedule-finder__first-last-trip">
        <div className="u-small-caps u-bold">First Trip</div>
        {firstTrip.departure.time}
        {lastTrip && (
          <>
            <div className="u-small-caps u-bold">Last Trip</div>
            {lastTrip.departure.time}
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
          <tr>
            {anySchoolTrips && (
              <th scope="col" className="schedule-table__cell" />
            )}
            <th scope="col" className="schedule-table__cell">
              Departs
            </th>
            {isACommuterRailRoute(firstTrip.route) && (
              <th scope="col" className="schedule-table__cell">
                Train
              </th>
            )}
            <th scope="col" colSpan={2} className="schedule-table__cell">
              <span className="pull-left">Destination</span>
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
