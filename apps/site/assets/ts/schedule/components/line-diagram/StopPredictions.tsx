import React from "react";
import { Headsign } from "../../../__v3api";
import {
  timeForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";

interface Props {
  headsigns: Headsign[];
  isCommuterRail: boolean;
}

const capitalize = (string: string): string =>
  string[0].toUpperCase() + string.slice(1);

const StopPredictions = ({ headsigns, isCommuterRail }: Props): JSX.Element => {
  let predictions: JSX.Element[];
  const liveHeadsigns = headsigns.filter(
    headsign =>
      headsign.times[0] &&
      headsign.times[0].prediction &&
      headsign.times[0].prediction.time
  );

  if (isCommuterRail) {
    // Display at most 1 prediction for Commuter Rail
    predictions = liveHeadsigns.slice(0, 1).map(headsign => {
      const time = headsign.times[0];
      const prediction = time.prediction!;

      return (
        <div key={headsign.name}>
          <div className="m-schedule-diagram__cr-prediction">
            {timeForCommuterRail(
              time,
              "m-schedule-diagram__cr-prediction-time"
            )}
          </div>
          <div className="m-schedule-diagram__cr-prediction-details">
            <span>{`${headsign.name} ·`}</span>{" "}
            <span>
              {headsign.train_number ? `Train ${headsign.train_number} ·` : ""}
            </span>{" "}
            <span>{prediction.track ? `Track ${prediction.track} ·` : ""}</span>{" "}
            <span>{statusForCommuterRail(headsign.times[0])}</span>
          </div>
        </div>
      );
    });
  } else {
    predictions = liveHeadsigns.map((headsign, index) => (
      /* eslint-disable-next-line react/no-array-index-key */
      <div key={index} className="m-schedule-diagram__prediction">
        <div>{headsign.name}</div>
        <div className="m-schedule-diagram__prediction-time">
          {capitalize(headsign.times[0].prediction!.time.join(" "))}
        </div>
      </div>
    ));
  }

  return <div className="m-schedule-diagram__predictions">{predictions}</div>;
};

export default StopPredictions;
