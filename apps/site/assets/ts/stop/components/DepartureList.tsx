import React, { ReactElement } from "react";
import { Dictionary } from "lodash";
import { DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";

interface DepartureListProps {
  route: Route | null;
  stop: Stop;
  schedules: Dictionary<ScheduleWithTimestamp[]> | null | undefined;
  directionId: DirectionId | null;
}

const DepartureList = ({
  route,
  stop,
  schedules,
  directionId
}: DepartureListProps): ReactElement<HTMLElement> => {
  if (directionId && schedules && route) {
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
          return <div>{departures.at(0)?.prediction?.time.toString()}</div>;
        })}
      </>
    );
  }
  return <div>No upcoming trips today</div>;
};

export default DepartureList;
