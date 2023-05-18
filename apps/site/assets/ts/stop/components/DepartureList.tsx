import React, { ReactElement } from "react";
import { Dictionary } from "lodash";
import { DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  schedules: Dictionary<ScheduleWithTimestamp[]>;
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
      {Object.entries(schedules).map(([headsign, schs]) => {
        const preds = predictionsByHeadsign[headsign]
          ? predictionsByHeadsign[headsign]
          : [];
        departures = mergeIntoDepartureInfo(schs, preds);
        return (
          <div key={`${departures.at(0)?.prediction?.id}`}>
            {departures.at(0)?.prediction?.time.toString()}
          </div>
        );
      })}
    </>
  );
};

export default DepartureList;
