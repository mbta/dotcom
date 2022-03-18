import React, { ReactElement } from "react";
import { RouteType } from "../../../../__v3api";
import { alertIcon } from "../../../../helpers/icon";
import { breakTextAtSlash } from "../../../../helpers/text";
import { isSkippedOrCancelled } from "../../../../models/prediction";
import { isACommuterRailRoute } from "../../../../models/route";
import { TripDepartureWithPrediction } from "../../__trips";
import GlxOpen from "../../../../components/GlxOpen";

interface Props {
  departure: TripDepartureWithPrediction;
  index: number;
  showFare: boolean;
  routeType: RouteType;
}

const formattedDepartureTimes = (
  departure: TripDepartureWithPrediction,
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
  const { prediction, schedule } = departure;

  /* istanbul ignore next */
  if (!prediction.stop) return null;

  return (
    <tr key={`${prediction.stop.id}`}>
      <th className="schedule-table__cell" scope="row">
        <a
          href={`/stops/${prediction.stop.id}`}
          className={isSkippedOrCancelled(prediction) ? "strikethrough" : ""}
        >
          {isSkippedOrCancelled(prediction) && (
            <>
              {alertIcon("c-svg__icon-alerts-triangle")}
              <span className="sr-only">This trip skips this stop at</span>
            </>
          )}
          {breakTextAtSlash(prediction.stop.name)}
        </a>
        <GlxOpen pageType="schedule-finder" stopId={prediction.stop.id} />
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
