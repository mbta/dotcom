import React, { ReactElement } from "react";
import { TripDeparture, Prediction } from "../__trips";
import { breakTextAtSlash } from "../../../helpers/text";
import { alertIcon } from "../../../helpers/icon";

interface Props {
  departure: TripDeparture;
  index: number;
  showFare: boolean;
  routeType: number;
}

const skippedOrCancelled = (prediction: Prediction | null): boolean | null =>
  prediction
    ? prediction.schedule_relationship === "skipped" ||
      prediction.schedule_relationship === "cancelled"
    : null;

const formattedDepartureTimes = (
  departure: TripDeparture,
  routeType: number
): ReactElement<HTMLElement> => {
  const { schedule, prediction, delay } = departure;
  if (routeType === 2) {
    if (delay && delay >= 300 && prediction && prediction.time) {
      return (
        <>
          <span className="schedule-table__times--delayed schedule-table__times--delayed-future_stop">
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
  if (!schedule || !schedule.stop) return null;

  return (
    <tr key={`${schedule.stop.id}`}>
      <th className="schedule-table__cell" scope="row">
        <a
          href={`/stops/${schedule.stop.id}`}
          className={
            skippedOrCancelled(departure.prediction) ? "strikethrough" : ""
          }
        >
          {skippedOrCancelled(departure.prediction) && (
            <>
              {alertIcon("c-svg__icon-alerts-triangle")}
              <span className="sr-only">This trip skips this stop at</span>
            </>
          )}
          {breakTextAtSlash(schedule.stop.name)}
        </a>
      </th>
      {showFare && (
        <td className="schedule-table__cell schedule-table__cell--right-adjusted u-tabular-nums">
          {index === 0 ? "" : schedule.fare.price}
        </td>
      )}
      <td className="schedule-table__cell schedule-table__cell--right-adjusted u-tabular-nums">
        {formattedDepartureTimes(departure, routeType)}
      </td>
    </tr>
  );
};

export default TripStop;
