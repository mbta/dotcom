import React, { ReactElement } from "react";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";
import { modeIcon } from "../../../helpers/icon";
import { modeBgClass } from "../../../stop/components/RoutePillList";
import { Route } from "../../../__v3api";
import { StopPrediction } from "../__schedule";
import { breakTextAtSlash } from "../../../helpers/text";

interface State {
  data: StopPrediction[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  state: State;
}

const hasPredictions = (stopPredictions: StopPrediction[]): boolean =>
  stopPredictions.filter(
    stopPrediction => stopPrediction.prediction.prediction !== null
  ).length > 0;

export const RoutePillSmall = ({
  route
}: {
  route: Route;
}): ReactElement<HTMLElement> | null => (
    <div className="schedule-table__row-route-pill m-route-pills">
      <div className={modeBgClass(route)}>{route.name}</div>
    </div>
  );
interface TableRowProps {
  prediction: StopPrediction;
}

const TableRow = ({
  prediction
}: TableRowProps): ReactElement<HTMLElement> | null => {
  if (prediction.prediction.prediction === null) return null;
  if (prediction.route.type === 2)
    return <CrTableRow prediction={prediction} />;
  return (
    <tr className="schedule-table__row schedule-table__row--stretch">
      <td>
        <div className="schedule-table__row-route">
          <RoutePillSmall route={prediction.route} /> {prediction.headsign}
        </div>
      </td>
      <td className="schedule-table__time u-bold">
        {prediction.prediction.prediction.time}
      </td>
    </tr>
  );
};

const CrTableRow = ({
  prediction
}: TableRowProps): ReactElement<HTMLElement> => {
  const track = trackForCommuterRail(prediction.prediction);
  const trainNumber = prediction.train_number
    ? `Train ${prediction.train_number} · `
    : "";
  const predictedSchedule = prediction.prediction;
  return (
    <tr className="schedule-table__row schedule-table__row--stretch">
      <td className="schedule-table__headsign">
        {modeIcon(prediction.route.id)} {breakTextAtSlash(prediction.headsign)}
      </td>
      <td>
        <div className="schedule-table__time-container">
          {timeForCommuterRail(
            predictedSchedule,
            "schedule-table__time u-bold"
          )}
        </div>
        <div className="u-nowrap text-right">
          {trainNumber}
          {track ? `${track} · ` : ""}
          {statusForCommuterRail(predictedSchedule)}
        </div>
      </td>
    </tr>
  );
};

export const UpcomingDepartures = ({
  state
}: Props): ReactElement<HTMLElement> | null => {
  const { data: predictions, error, isLoading } = state;
  if (error || isLoading) {
    return null;
  }
  if (predictions !== null && hasPredictions(predictions)) {
    return (
      <>
        <h3>Upcoming Departures</h3>
        <table className="schedule-table">
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th>Destinations</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction: StopPrediction, idx: number) => (
              <TableRow
                prediction={prediction}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return null;
};

export default UpcomingDepartures;
