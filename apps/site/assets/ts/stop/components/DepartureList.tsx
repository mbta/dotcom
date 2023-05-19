import React, { ReactElement } from "react";
import { DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  departures: DepartureInfo[];
  directionId: DirectionId;
}

const DepartureList = ({
  route,
  stop,
  departures,
  directionId
}: DepartureListProps): ReactElement<HTMLElement> => {
  // TODO: debug
  return (
    <>
      {departures.map((dep, idx) => {
        const predictionOrSchedule = dep.prediction || dep.schedule;
        return predictionOrSchedule ? (
          <div key={`${predictionOrSchedule?.trip.id}`}>
            {predictionOrSchedule?.time.toString()}
          </div>
        ) : (
          <div>No upcoming trips today</div>
        );
      })}
    </>
  );
};

export default DepartureList;
