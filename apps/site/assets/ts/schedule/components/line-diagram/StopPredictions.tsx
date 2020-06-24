import React from "react";
import { HeadsignWithCrowding } from "../../../__v3api";
import {
  timeForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";

interface Props {
  headsigns: HeadsignWithCrowding[];
  isCommuterRail: boolean;
}

const capitalize = (string: string): string =>
  string[0].toUpperCase() + string.slice(1);

const StopPredictions = ({ headsigns, isCommuterRail }: Props): JSX.Element => {
  let predictions: JSX.Element[];
  const liveHeadsigns = headsigns.filter(
    headsign =>
      headsign.time_data_with_crowding_list[0] &&
      headsign.time_data_with_crowding_list[0].time_data.prediction &&
      headsign.time_data_with_crowding_list[0].time_data.prediction.time
  );

  if (isCommuterRail) {
    // Display at most 1 prediction for Commuter Rail
    predictions = liveHeadsigns.slice(0, 1).map(headsign => {
      const time = headsign.time_data_with_crowding_list[0].time_data;
      const prediction = time.prediction!;
      const status = statusForCommuterRail(time);

      return (
        <div key={headsign.name}>
          <div className="m-schedule-diagram__cr-prediction">
            {timeForCommuterRail(
              time,
              "m-schedule-diagram__cr-prediction-time"
            )}
          </div>
          <div className="m-schedule-diagram__cr-prediction-details">
            <span>{`${headsign.name}`}</span>
            <span>
              {headsign.train_number ? ` · Train ${headsign.train_number}` : ""}
            </span>
            <span>
              {prediction.track ? ` · Track ${prediction.track}` : ""}
            </span>
            <span>{status ? ` · ${status}` : ""}</span>
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
          {capitalize(
            headsign.time_data_with_crowding_list[0].time_data.prediction!.time.join(
              " "
            )
          )}
        </div>
      </div>
    ));
  }

  return <div className="m-schedule-diagram__predictions">{predictions}</div>;
};

export default StopPredictions;
