import React, { ReactElement } from "react";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { isACommuterRailRoute } from "../../models/route";
import { DirectionId, Route, Stop } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import { formatDepartureTime } from "../../helpers/date";

interface DepartureTimesProps {
  route: Route;
  stop: Stop;
  directionId: DirectionId;
}

const departureTimeRow = (
  headsignName: string,
  formattedTimes?: string[]
): JSX.Element => {
  return (
    <div key={headsignName} className="departure-card__headsign">
      <div className="departure-card__headsign-name">{headsignName}</div>
      <div>
        {formattedTimes && formattedTimes.length > 0
          ? formattedTimes.map(t => <div key={t}>{t}</div>)
          : "No times."}
      </div>
      {/* TODO: Navigate to Realtime Tracking view */}
      <button
        type="button"
        aria-label={`Open upcoming departures to ${headsignName}`}
      >
        {renderFa("", "fa-angle-right")}
      </button>
    </div>
  );
};

/* istanbul ignore next */
/**
 * A proof-of-concept component illustrating a usage of the
 * usePredictionsChannel hook to fetch live predictions for a specific
 * route/stop/direction, sorted by date.
 *
 */
const DepartureTimes = (
  props: DepartureTimesProps
): ReactElement<HTMLElement> => {
  const { route, stop, directionId } = props;
  const isCR = isACommuterRailRoute(route);
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId,
    isCR ? 1 : 2
  );

  // TODO: Show schedules when we don't have predictions, and implement logic
  // for various states of next departute time.

  if (!Object.keys(predictionsByHeadsign).length) {
    return departureTimeRow(route.direction_destinations[directionId]!);
  }
  return (
    <>
      {Object.entries(predictionsByHeadsign).map(([headsign, predictions]) => {
        return departureTimeRow(
          headsign,
          predictions.map(p => formatDepartureTime(p.time, isCR))
        );
      })}
    </>
  );
};

export default DepartureTimes;
