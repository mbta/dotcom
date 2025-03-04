import React from "react";
import { capitalize } from "lodash";
import { HeadsignWithCrowding } from "../../../__v3api";
import {
  timeForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";
import {
  isSkippedOrCancelled,
  hasPredictionTime
} from "../../../models/prediction";
import LiveCrowdingIcon from "./LiveCrowdingIcon";

interface StopPredictions {
  headsigns: HeadsignWithCrowding[];
  isCommuterRail: boolean;
}

const predictionTexts = (headsign: HeadsignWithCrowding): string[] => {
  const texts = [headsign.name];
  if (headsign.train_number) {
    texts.push(` · Train ${headsign.train_number}`);
  }

  const predictedOrScheduledTime =
    headsign.time_data_with_crowding_list[0].time_data;
  const { prediction } = predictedOrScheduledTime;

  if (prediction && prediction.track) {
    texts.push(` · Track ${prediction.track}`);
  }

  const status = statusForCommuterRail(predictedOrScheduledTime);
  if (status) {
    texts.push(` · ${status}`);
  }
  return texts;
};

const StopPredictions = ({
  headsigns,
  isCommuterRail
}: StopPredictions): JSX.Element => {
  let predictions: JSX.Element[];
  const liveHeadsigns = headsigns.filter(hasPredictionTime);

  if (isCommuterRail) {
    // Display at most 1 prediction for Commuter Rail
    predictions = liveHeadsigns.slice(0, 1).map(headsign => {
      const enhancedTimeData = headsign.time_data_with_crowding_list[0];
      const predictedOrScheduledTime = enhancedTimeData.time_data;
      const predictionTimeClass = isSkippedOrCancelled(
        enhancedTimeData.predicted_schedule.prediction
      )
        ? "m-schedule-diagram__cr-prediction-time strikethrough"
        : "m-schedule-diagram__cr-prediction-time";

      let headsignCopy = headsign;
      if (
        headsign?.time_data_with_crowding_list[0]?.predicted_schedule?.schedule
          ?.stop_headsign
      ) {
        const headsignName =
          headsign.time_data_with_crowding_list[0].predicted_schedule.schedule
            .stop_headsign;
        headsignCopy = { ...headsign, name: headsignName };
      }

      return (
        <div key={`${headsignCopy.name}-cr`}>
          <div className="m-schedule-diagram__cr-prediction">
            {timeForCommuterRail(predictedOrScheduledTime, predictionTimeClass)}
          </div>
          <div className="m-schedule-diagram__cr-prediction-details">
            {predictionTexts(headsignCopy).map((text: string) => (
              <span key={text}>{text}</span>
            ))}
          </div>
        </div>
      );
    });
  } else {
    predictions = liveHeadsigns.map((headsign, index) => {
      const { crowding } = headsign.time_data_with_crowding_list[0];
      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`headsign.name-${index}`}
          className="m-schedule-diagram__prediction notranslate"
        >
          <div>{headsign.name}</div>
          <div className="m-schedule-diagram__prediction-time">
            {capitalize(
              headsign.time_data_with_crowding_list[0].time_data.prediction!.time.join(
                " "
              )
            )}
          </div>
          <LiveCrowdingIcon crowding={crowding} />
        </div>
      );
    });
  }

  return <div className="m-schedule-diagram__predictions">{predictions}</div>;
};

export default StopPredictions;
