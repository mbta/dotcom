import React, { ReactElement } from "react";
import usePredictionsChannel, {
  Prediction
} from "../../hooks/usePredictionsChannel";
import { isACommuterRailRoute } from "../../models/route";
import { DirectionId, Route, Schedule, Stop } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import { formatToBostonTime } from "../../helpers/date";
import { filter, find, groupBy, slice } from "lodash";
import { differenceInSeconds, isTomorrow } from "date-fns";

interface DisplayTimeConfig {
  isPrediction?: boolean;
  displayString: string;
  trackName?: string | null;
  isTomorrow?: boolean;
  isBolded?: boolean;
  isStikethrough?: boolean;
}

interface ScheduleModel {
  time: Date;
  isCancelled?: boolean;
  isDelayed?: boolean;
  track?: string | null;
}

interface DepartureTimesProps {
  route: Route;
  stop: Stop;
  directionId: DirectionId;
  schedulesForDirection: Schedule[];
}

export const isCancelled = (prediction: Prediction): boolean => {
  return prediction.schedule_relationship === "cancelled";
};

export const isDelayed = (
  prediction: Prediction,
  schedules: Schedule[]
): boolean => {
  // Status is a short english sentance displaying what is up with the prediction
  const schedule = find(
    schedules,
    (sch: Schedule) => sch.trip.id === prediction.trip.id
  );

  return (
    !!schedule &&
    differenceInSeconds(new Date(schedule.time), prediction.time) > 60
  );
};

// TODO ask how the canceled schedules looks (IE what is considered the next schedule)
// TODO ask how the delayed schedule data looks
// How often do we cache schedules?  Would the prediction show it and not the schedule?  Would the schedule show a cancelation/delay at all?

const departureTimeRow = (
  headsignName: string,
  formattedTimes: DisplayTimeConfig[]
): JSX.Element => {
  return (
    <div
      key={headsignName}
      className="departure-card__headsign d-flex justify-content-space-between"
    >
      <div
        className="departure-card__headsign-name"
        style={{ maxWidth: "250px" }}
      >
        {headsignName}
      </div>
      <div className="d-flex">
        <div className="d-flex justify-content-space-between">
          {formattedTimes.map((time, index) => {
            let customClasses = "";
            if (time.isBolded) {
              customClasses += " font-weight-bold ";
            }
            if (time.isStikethrough) {
              // TODO keep original font color
              customClasses += " strikethrough ";
            }
            if (index === 1) {
              // All secondary times should be smaller
              customClasses += " fs-12 pt-4 ";
            }
            return (
              <>
                {time.isPrediction && <div className="me-8">📶</div>}
                <div key={`${index}-departure-times`} className={`me-8`}>
                  <div className={`${customClasses}`}>{time.displayString}</div>
                  {time.isTomorrow && <div className="fs-12">Tomorrow</div>}
                  {time.trackName && (
                    <div className="fs-12">{time.trackName}</div>
                  )}
                </div>
              </>
            );
          })}
        </div>
        {/* TODO: Navigate to Realtime Tracking view */}
        <button
          type="button"
          aria-label={`Open upcoming departures to ${headsignName}`}
        >
          {renderFa("", "fa-angle-right")}
        </button>
      </div>
    </div>
  );
};

const filterPredictions = (
  predictions: Prediction[],
  schedules: Schedule[]
): Array<Prediction | undefined> => {
  if (!predictions || predictions.length === 0) {
    return predictions;
  }
  // Assuming there are predictions
  // This function will return an array containing at least one predcition.
  // It will return 2 predictions if there are more than 2 predictions that are not cancelled,
  // If the first prediction is cancelled or delayed, the 2nd prediction will not be cancelled or delayed

  const prediction1 = predictions[0];
  if (isDelayed(prediction1, schedules) || isCancelled(prediction1)) {
    const regPrediction = find(
      predictions,
      p => !isDelayed(p, schedules) && !isCancelled(p)
    );
    return [prediction1, regPrediction];
  }

  // The first prediction in this list should not be deplayed or cancelled (as that case is handeled above)
  const regPredictions = filter(
    predictions,
    p => !isDelayed(p, schedules) && !isCancelled(p)
  );
  return slice(regPredictions, 0, 2);
};

const getNextTwoTimes = (
  schedules: Schedule[],
  predictions: Prediction[]
): [boolean, ScheduleModel | undefined, ScheduleModel | undefined] => {
  // it appears schedules are in chronological order (make sure this is true)
  // slice an array of 2 to safely get undefined if array is smaller than 2
  const [prd1, prd2] = filterPredictions(predictions, schedules);
  const [sch1, sch2] = slice(schedules, 0, 2);

  // TODO cover more edge cases (such as only 1 schedule)
  let time1: ScheduleModel | undefined;
  let time2: ScheduleModel | undefined;
  // Only set to true if first time is a prediction
  let isPrediction = false;
  if (prd1 && sch1 && prd1.trip.id === sch1.trip.id) {
    time1 = {
      time: prd1.time,
      isCancelled: isCancelled(prd1),
      isDelayed: isDelayed(prd1, schedules),
      track: prd1.track
    };
    isPrediction = true;
  }

  // I Think only time1 should be delayed or cancelled
  if (prd2 && sch2 && prd2.trip.id === sch2.trip.id) {
    time2 = {
      time: prd2.time,
      isCancelled: isCancelled(prd2),
      isDelayed: isDelayed(prd2, schedules),
      track: prd2.track
    };
  }

  if (!prd1 && sch1) {
    time1 = { time: new Date(sch1.time) };
  }

  if (!prd2 && sch2) {
    time2 = { time: new Date(sch2.time) };
  }

  return [isPrediction, time1, time2];
};

const newFormatDeparture = (
  time1: ScheduleModel | undefined,
  time2: ScheduleModel | undefined,
  isPrediction: boolean
): DisplayTimeConfig[] => {
  if (!time1 || !time2) {
    return [] as DisplayTimeConfig[];
  }

  // TODO make new date a param
  // time 2 should always be after time 1 (TODO maybe sort the inputs?)
  const diffInSeconds1 = differenceInSeconds(time1.time, new Date());
  const diffInSeconds2 = differenceInSeconds(time2.time, new Date());

  const formatOverride = "h:mm aa";

  if (time1.isCancelled || time1.isDelayed) {
    // State 7
    // State 8
    // Should display the track of the not canceled trip
    return [
      {
        displayString: `${formatToBostonTime(time2.time, formatOverride)}`,
        isBolded: true,
        isPrediction: true
      },
      {
        displayString: `${formatToBostonTime(time1.time, formatOverride)}`,
        isStikethrough: true,
        trackName: time2.track
      }
    ];
  }

  if (diffInSeconds1 <= 60) {
    // State 9
    return [
      { displayString: "Arriving", isPrediction: isPrediction, isBolded: true }
    ];
  }

  if (
    diffInSeconds1 < 3600 &&
    diffInSeconds1 > 60 &&
    diffInSeconds2 < 3600 &&
    diffInSeconds2 > 60
  ) {
    // State 1
    return [
      {
        displayString: `${Math.floor(diffInSeconds1 / 60)} min`,
        isPrediction: isPrediction,
        isBolded: true
      },
      { displayString: `${Math.floor(diffInSeconds2 / 60)} min` }
    ];
  }

  if (diffInSeconds1 < 3600 && diffInSeconds1 > 60 && diffInSeconds2 >= 3600) {
    // State 2
    return [
      {
        displayString: `${Math.floor(diffInSeconds1 / 60)} min`,
        isBolded: true,
        isPrediction: isPrediction
      }
    ];
  }

  if (diffInSeconds1 >= 3600 && diffInSeconds1 < 86400) {
    // State 3
    // State 4
    // State 5
    // State 6
    return [
      {
        displayString: `${formatToBostonTime(time1.time, "h:mm aa")}`,
        isTomorrow: isTomorrow(time1.time),
        isPrediction: isPrediction,
        isBolded: true,
        trackName: time1.track
      }
    ];
  }

  if (diffInSeconds1 >= 86400) {
    // State 11
    // (This might need its own formatting)
    return [{ displayString: "No departures within 24 hours" }];
  }

  // Default state is error
  // State 10
  return [{ displayString: "Error retrieving data" }];
};

const toDisplayTime = (
  schedules: Schedule[],
  predictions: Prediction[]
): DisplayTimeConfig[] => {
  // TODO this should be short cutted by alerts
  const [isPrediction, time1, time2] = getNextTwoTimes(schedules, predictions);

  return newFormatDeparture(time1, time2, isPrediction);
};

const schedulesByHeadsign = (schedules: Schedule[]) => {
  return groupBy(schedules, (sch: Schedule) => {
    return sch.trip.headsign;
  });
};

/* istanbul ignore next */
/**
 * A proof-of-concept component illustrating a usage of the
 * usePredictionsChannel hook to fetch live predictions for a specific
 * route/stop/direction, sorted by date.
 *
 */
const DepartureTimes = ({
  route,
  stop,
  directionId,
  schedulesForDirection
}: DepartureTimesProps): ReactElement<HTMLElement> => {
  const isCR = isACommuterRailRoute(route);
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId,
    4
  );

  const schedules = schedulesByHeadsign(schedulesForDirection);
  console.log(schedules);

  return (
    <>
      {Object.entries(schedules).map(([headsign, schs]) => {
        const formattedTimes = toDisplayTime(
          schs,
          predictionsByHeadsign[headsign] ? predictionsByHeadsign[headsign] : []
        );
        return departureTimeRow(headsign, formattedTimes);
      })}
    </>
  );
};

export default DepartureTimes;
