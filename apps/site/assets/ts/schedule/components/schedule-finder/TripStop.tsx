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
  const skippedOrCancelled = prediction
    ? prediction.schedule_relationship === "skipped" ||
      prediction.schedule_relationship === "cancelled"
    : null;
  const predictionOrScheduleTime =
    prediction && prediction.time ? prediction.time : schedule.time;

  if (
    routeType === 2 &&
    delay &&
    delay >= 300 &&
    prediction &&
    prediction.time
  ) {
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

  return (
    <span className={skippedOrCancelled ? "strikethrough" : ""}>
      {routeType === 2 ? schedule.time : predictionOrScheduleTime}
    </span>
  );
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
      <td className="schedule-table__cell">
        <a href={`/stops/${schedule.stop.id}`}>
          {breakTextAtSlash(schedule.stop.name)}
        </a>
      </td>
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
