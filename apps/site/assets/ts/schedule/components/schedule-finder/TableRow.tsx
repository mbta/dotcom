import React, { useState, ReactElement, ReactHTMLElement } from "react";
import { ScheduleWithFare, ScheduleInfo } from "../__schedule";
import { RoutePillSmall } from "./UpcomingDepartures";
import { modeIcon, caret } from "../../../helpers/icon";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events";
import { breakTextAtSlash } from "../../../helpers/text";

const totalMinutes = (schedules: ScheduleInfo): string => schedules.duration;

interface TableRowProps {
  schedules: ScheduleWithFare[];
}
interface Props {
  schedule: ScheduleInfo;
  isSchoolTrip: boolean;
  anySchoolTrips: boolean;
}

interface AccordionProps {
  schedule: ScheduleInfo;
  isSchoolTrip: boolean;
  anySchoolTrips: boolean;
  contentCallback: () => ReactElement<HTMLElement>;
}

const TripInfo = ({
  schedules
}: {
  schedules: ScheduleInfo;
}): ReactElement<HTMLElement> => {
  const lastTrip = schedules.schedules[schedules.schedules.length - 1];
  return (
    <tr>
      <td colSpan={3}>
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

export const Accordion = ({
  schedule,
  isSchoolTrip,
  anySchoolTrips,
  contentCallback
}: AccordionProps): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const firstSchedule = schedule.schedules[0];
  const onClick = (): void => setExpanded(!expanded);

  return (
    <>
      <tr
        className={
          expanded ? "schedule-table__row-selected" : "schedule-table__row"
        }
        aria-controls={`trip-${firstSchedule.trip.id}`}
        aria-expanded={expanded}
        role="button"
        onClick={onClick}
        onKeyPress={e => handleReactEnterKeyPress(e, onClick)}
        tabIndex={0}
      >
        {anySchoolTrips && (
          <td className="schedule-table__td--tiny">
            {isSchoolTrip && <strong>S</strong>}
          </td>
        )}

        {contentCallback()}

        <td className="schedule-table__td schedule-table__td--flex-end">
          {caret(
            `c-expandable-block__header-caret${expanded ? "--white" : ""}`,
            expanded
          )}
        </td>
      </tr>
      {expanded && (
        <tr
          id={`trip-${firstSchedule.trip.id}`}
          className="schedule-table__subtable-container"
        >
          <td className="schedule-table__subtable-td">
            <table className="schedule-table__subtable">
              <thead>
                <TripInfo schedules={schedule} />
                <tr className="schedule-table__subtable-row">
                  <th
                    scope="col"
                    className="schedule-table__subtable-data schedule-table__subtable-data--long"
                  >
                    Stops
                  </th>
                  <th
                    scope="col"
                    className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted"
                  >
                    Fare
                  </th>
                  <th
                    scope="col"
                    className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted"
                  >
                    Arrival
                  </th>
                </tr>
              </thead>
              <tbody className="schedule-table__subtable-tbody">
                {schedule.schedules.map(
                  (schedule: ScheduleWithFare, index: number) => (
                    <tr
                      key={`${schedule.stop.id}-${schedule.trip.id}`}
                      className="schedule-table__subtable-row"
                    >
                      <td className="schedule-table__subtable-data">
                        <a href={`/stops/${schedule.stop.id}`}>
                          {breakTextAtSlash(schedule.stop.name)}
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

const BusTableRow = ({
  schedules
}: TableRowProps): ReactElement<HTMLElement> => {
  const firstSchedule = schedules[0];

  return (
    <>
      <td className="schedule-table__td schedule-table__time">
        {firstSchedule.time}
      </td>
      <td className="schedule-table__td">
        <div className="schedule-table__row-route">
          <RoutePillSmall route={firstSchedule.route} />
        </div>
        {breakTextAtSlash(firstSchedule.trip.headsign)}
      </td>
    </>
  );
};

const CrTableRow = ({
  schedules
}: TableRowProps): ReactElement<HTMLElement> => {
  const firstSchedule = schedules[0];

  return (
    <>
      <td className="schedule-table__td">
        <div className="schedule-table__time">{firstSchedule.time}</div>
      </td>
      {firstSchedule.trip.name && (
        <td className="schedule-table__td schedule-table__tab-num">
          {firstSchedule.trip.name}
        </td>
      )}
      <td className="schedule-table__headsign">
        {modeIcon(firstSchedule.route.id)}{" "}
        {breakTextAtSlash(firstSchedule.trip.headsign)}
      </td>
    </>
  );
};

const TableRow = ({
  schedule,
  isSchoolTrip,
  anySchoolTrips
}: Props): ReactElement<HTMLElement> | null => {
  const callback =
    schedule.schedules[0].route.type === 2
      ? () => <CrTableRow schedules={schedule.schedules} />
      : () => <BusTableRow schedules={schedule.schedules} />;

  return (
    <Accordion
      schedule={schedule}
      isSchoolTrip={isSchoolTrip}
      anySchoolTrips={anySchoolTrips}
      contentCallback={callback}
    />
  );
};

export default TableRow;
