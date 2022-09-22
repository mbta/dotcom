import React, { ReactElement } from "react";
import { RouteType } from "../../../../__v3api";
import { alertIcon } from "../../../../helpers/icon";
import { breakTextAtSlash } from "../../../../helpers/text";
import { isSkippedOrCancelled } from "../../../../models/prediction";
import { isACommuterRailRoute } from "../../../../models/route";
import { TripDeparture } from "../../__trips";

interface Props {
  departure: TripDeparture;
  index: number;
  showFare: boolean;
  routeType: RouteType;
}

const formattedDepartureTimes = (
  departure: TripDeparture,
  routeType: RouteType
): ReactElement<HTMLElement> => {
  const { schedule, prediction, delay } = departure;

  if (isACommuterRailRoute(routeType)) {
    if (delay && delay >= 300 && prediction && prediction.time) {
      return (
        <>
          <span className="schedule-table__times--delayed schedule-table__times--delayed-future_stop">
            {schedule.time}
          </span>
          <br className="d-sm-none" />
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
            isSkippedOrCancelled(departure.prediction) ? "strikethrough" : ""
          }
        >
          {isSkippedOrCancelled(departure.prediction) && (
            <>
              {alertIcon("c-svg__icon-alerts-triangle")}
              <span className="visually-hidden">
                This trip skips this stop at
              </span>
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
