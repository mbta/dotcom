
import React, { ReactElement} from "react";
import {
    timeForCommuterRail,
    trackForCommuterRail,
    statusForCommuterRail
  } from "../../../helpers/prediction-helpers";
import { modeIcon } from "../../../helpers/icon";
import { modeBgClass } from "../../../stop/components/RoutePillList";
import {
  BareRoute as Route
} from "../../../__v3api";
import { SimpleStop, StopPrediction } from "../__schedule";

interface State {
  data: StopPrediction[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  state: State;
  stop: SimpleStop | undefined;
  destination: string | null;
}

const hasPredictions = (stopPredictions: StopPrediction[]): boolean =>
  stopPredictions.filter(
    stopPrediction => stopPrediction.prediction.prediction !== null
  ).length > 0;


const RoutePillSmall = ({
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
    stop: SimpleStop | undefined;
    destination: string | null;
  }
  
const TableRow = ({
  prediction,
  stop,
  destination
}: TableRowProps): ReactElement<HTMLElement> | null => {
  if (prediction.prediction.prediction === null) return null;
  if (prediction.route.type === 2)
    return (
      <CrTableRow
        prediction={prediction}
        stop={stop}
        destination={destination}
      />
    );
  return (
    <tr className="schedule-table__row">
      <td>
        <div className="schedule-table__row-route">
          <RoutePillSmall route={prediction.route} />
          {"   "}
          {prediction.headsign}
        </div>
      </td>
      <td className="schedule-table__time">
        {prediction.prediction.prediction.time}
      </td>
    </tr>
  );
};
  
const CrTableRow = ({
  prediction,
  destination
}: TableRowProps): ReactElement<HTMLElement> => {
  const track = trackForCommuterRail(prediction.prediction);
  const trainNumber = prediction.train_number
    ? `Train ${prediction.train_number} \u2022 `
    : "";
  const predictedSchedule = prediction.prediction;
  return (
    <tr className="schedule-table__row">
      <td>
        {modeIcon(prediction.route.id)}
        {"   "}
        {destination}
      </td>
      <td>
        {timeForCommuterRail(predictedSchedule, "schedule-table__time")}
        <div className="u-nowrap">
          {trainNumber}
          {track ? `${track} \u2022 ` : ""}
          <strong>{statusForCommuterRail(predictedSchedule)}</strong>
        </div>
      </td>
    </tr>
  );
};

export const UpcomingDepartures = ({
  state,
  stop,
  destination
}: Props): ReactElement<HTMLElement> | null => {
  const { data: predictions, error, isLoading } = state;
  if (error || isLoading) {
    return null;
  }
  if (predictions !== null && hasPredictions(predictions)) {
    return (
      <>
        <h3>Upcoming Departures</h3>
        <table>
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th>Destinations</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction: StopPrediction) => (
              <TableRow
                prediction={prediction}
                stop={stop}
                destination={destination}
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