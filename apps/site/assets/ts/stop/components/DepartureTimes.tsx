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

  if (!Object.keys(predictionsByHeadsign).length) {
    return (
      <div className="departure-card__headsign">
        <div className="departure-card__headsign-name">
          {route.direction_destinations[directionId]}
        </div>
        <div>No predictions.</div>
        <button
          type="button"
          aria-label={`Open upcoming departures to ${route.direction_destinations[directionId]}`}
        >
          {renderFa("", "fa-angle-right")}
        </button>
      </div>
    );
  }
  return (
    <>
      {Object.entries(predictionsByHeadsign).map(([headsign, predictions]) => {
        return (
          <div key={headsign} className="departure-card__headsign">
            <div className="departure-card__headsign-name">{headsign}</div>
            <div>
              {predictions.length ? (
                predictions.map(p => {
                  return (
                    <div key={p.id}>{formatDepartureTime(p.time!, isCR)}</div>
                  );
                })
              ) : (
                <div>No predictions.</div>
              )}
            </div>
            <button
              type="button"
              aria-label={`Open upcoming departures to ${headsign}`}
            >
              {renderFa("", "fa-angle-right")}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default DepartureTimes;
