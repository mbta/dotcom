import React, { ReactElement } from "react";
import { TripDeparture } from "../__trips";
import { breakTextAtSlash } from "../../../helpers/text";

interface Props {
  departure: TripDeparture;
  index: number;
  showFare: boolean;
  routeType: number;
}

const formattedDepartureTimes = (
  departure: TripDeparture,
  routeType: number
): ReactElement<HTMLElement> => {
  const { schedule, prediction, delay } = departure;

  if (routeType === 2) {
    if (delay && delay >= 300 && prediction && prediction.time) {
      return (
        <>
          <span className="schedule-table__time--delayed schedule-table__time--delayed-future_stop">
            {schedule.time}
          </span>
          <br className="hidden-sm-up" />
          {prediction.time}
        </>
      );
    }

    return <>{schedule.time}</>;
  }

  return <>{prediction && prediction.time ? prediction.time : schedule.time}</>;
};

const TripStop = ({
  departure,
  index,
  showFare,
  routeType
}: Props): ReactElement<HTMLElement> | null => {
  const { schedule } = departure;

  /* istanbul ignore next */
  if (!schedule.stop) return null;

  return (
    <tr key={`${schedule.stop.id}`} className="schedule-table__subtable-row">
      <td className="schedule-table__subtable-data">
        <a href={`/stops/${schedule.stop.id}`}>
          {breakTextAtSlash(schedule.stop.name)}
        </a>
      </td>
      {showFare && (
        <td className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
          {index === 0 ? "" : schedule.fare.price}
        </td>
      )}
      <td className="schedule-table__subtable-data schedule-table__subtable-data--right-adjusted">
        {formattedDepartureTimes(departure, routeType)}
      </td>
    </tr>
  );
};

export default TripStop;
