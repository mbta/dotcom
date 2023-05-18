import React, { ReactElement } from "react";
import { DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
  directionId: DirectionId;
}

const DepartureList = ({
  route,
  stop,
  schedules,
  directionId
}: DepartureListProps): ReactElement<HTMLElement> => {
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );

  let departures: DepartureInfo[] = [];
  return (
    <>
      {schedules.map((schs, idx) => {
        const { headsign } = schs.trip;
        const preds = predictionsByHeadsign[headsign]
          ? predictionsByHeadsign[headsign]
          : [];
        departures = mergeIntoDepartureInfo(schedules, preds);
        const prediction = departures.at(idx)?.prediction;
        const predictionOrSchedule = prediction || departures.at(idx)?.schedule;
        return (
          <div key={`${predictionOrSchedule?.trip.id}`}>
            {predictionOrSchedule?.time.toString()}
          </div>
        );
      })}
    </>
  );
};

export default DepartureList;
