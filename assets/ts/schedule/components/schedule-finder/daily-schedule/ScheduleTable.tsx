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

interface RoutePatternsById {
  [key: string]: EnhancedRoutePattern;
}

const isSchoolTrip = (
  routePatternsById: RoutePatternsById,
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
  if (journeys.length === 0) {
    return (
      <div className="callout font-bold text-center">
        There is no scheduled service for this time period.
      </div>
    );
  }

  const routePatternsById = routePatterns.reduce(
    (accumulator, routePattern) => ({
      ...accumulator,
      [routePattern.id]: routePattern
    }),
    {}
  ) as RoutePatternsById;
  const anySchoolTrips = Object.values(
    journeys
  ).some(({ trip: { route_pattern_id: routePatternId } }) =>
    isSchoolTrip(routePatternsById, routePatternId)
  );

  const firstTrip = journeys[0];
  const lastTrip = journeys.length > 1 ? journeys[journeys.length - 1] : null;

  return (
    <>
      <div className="schedule-finder__first-last-trip">
        <div className="u-small-caps font-bold">First Trip</div>
        {firstTrip.departure.time}
        {lastTrip && (
          <>
            <div className="u-small-caps font-bold">Last Trip</div>
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
            {anySchoolTrips && <td className="schedule-table__cell" />}
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
