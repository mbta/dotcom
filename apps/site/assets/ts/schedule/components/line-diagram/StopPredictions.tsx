import React from "react";
import { HeadsignWithTimeData } from "../../../__v3api";
import { timeForCommuterRail } from "../../../helpers/prediction-helpers";
import { hasPredictionTime } from "../../../models/prediction";
import LiveCrowdingIcon from "./LiveCrowdingIcon";

interface StopPredictions {
  headsigns: HeadsignWithTimeData[];
  isCommuterRail: boolean;
}

const predictionTexts = (headsign: HeadsignWithTimeData): string[] => {
  const texts = headsign.headsign_name! ? [headsign.headsign_name] : [];
  if (headsign.trip_name!) {
    texts.push(` · Train ${headsign.trip_name}`);
  }

  if (headsign.track!) {
    texts.push(` · Track ${headsign.track}`);
  }

  if (headsign.status!) {
    texts.push(` · ${headsign.status}`);
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
      const { headsign_name, skipped_or_cancelled } = headsign;
      const predictionTimeClass = skipped_or_cancelled
        ? "m-schedule-diagram__cr-prediction-time strikethrough"
        : "m-schedule-diagram__cr-prediction-time";

      return (
        <div key={`${headsign_name}-cr`}>
          <div className="m-schedule-diagram__cr-prediction">
            {timeForCommuterRail(headsign, predictionTimeClass)}
          </div>
          <div className="m-schedule-diagram__cr-prediction-details">
            {predictionTexts(headsign).map((text: string) => (
              <span key={text}>{text}</span>
            ))}
          </div>
        </div>
      );
    });
  } else {
    predictions = liveHeadsigns.map(
      ({ vehicle_crowding, headsign_name, displayed_time }, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`headsign.name-${index}`}
          className="m-schedule-diagram__prediction"
        >
          <div>{headsign_name}</div>
          <div className="m-schedule-diagram__prediction-time">
            {displayed_time}
          </div>
          <LiveCrowdingIcon crowding={vehicle_crowding} />
        </div>
      )
    );
  }

  return <div className="m-schedule-diagram__predictions">{predictions}</div>;
};

export default StopPredictions;
