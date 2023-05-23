import {
  differenceInSeconds,
  isSameDay,
  secondsInDay,
  secondsInHour,
  secondsInMinute
} from "date-fns";
import {
  departureInfoToTime,
  displayInfoContainsPrediction
} from "../../helpers/departureInfo";
import { formatToBostonTime } from "../../helpers/date";
import { DepartureInfo } from "../../models/departureInfo";
import { ScheduleWithTimestamp } from "../../models/schedules";

// This interface is used to tell the front end
// how to display the ScheduleInfoModel data
interface DisplayTimeConfig {
  isPrediction?: boolean;
  displayString: string;
  trackName?: string | null;
  isTomorrow?: boolean;
  isBolded?: boolean;
  isStikethrough?: boolean;
  reactKey: string;
}

const getInfoKey = (departureInfo: DepartureInfo) => {
  const trip = departureInfo.prediction
    ? departureInfo.prediction.trip
    : departureInfo.schedule!.trip;
  // This will return Trip1-undefined if prediction data is not available
  // This is fine as there should not be 2 schedules with the same trip id
  return `${trip.id}-${departureInfo.prediction?.vehicle_id}`;
};

const infoToDisplayTime = (
  time1: DepartureInfo | undefined,
  time2: DepartureInfo | undefined,
  targetDate: Date = new Date()
): DisplayTimeConfig[] => {
  const defaultState = [
    { displayString: "Updates unavailable", reactKey: "unavail" }
  ];
  // If there is not input time1 then a schedule or prediction could not be found
  if (!time1) {
    return defaultState;
  }

  const departure1Time = departureInfoToTime(time1);
  const formatOverride = "h:mm aa";

  if (time1.isDelayed) {
    // is delayed can only be true if both a prediction and schedule exist
    const scheduleTime = time1.schedule!.time;
    const predictionTime = time1.prediction!.time;
    return [
      {
        displayString: `${formatToBostonTime(predictionTime, formatOverride)}`,
        isBolded: true,
        // only predictions can be delayed
        isPrediction: true,
        // keys only need to be unique in the list
        reactKey: getInfoKey(time1)
      },
      {
        displayString: `${formatToBostonTime(scheduleTime, formatOverride)}`,
        isStikethrough: true,
        trackName: time1.prediction!.track,
        reactKey: `${getInfoKey(time1)}-delayed`
      }
    ];
  }

  if (time2 && time1.isCancelled) {
    const departure2Time = departureInfoToTime(time2);
    // State 7
    // State 8
    // If trip1 is cancelled, then trip2 should not be cancelled
    // Display trip2 in the first time spot (and its track info in the second)
    return [
      {
        displayString: `${formatToBostonTime(departure2Time, formatOverride)}`,
        isBolded: true,
        isPrediction: displayInfoContainsPrediction(time2),
        reactKey: getInfoKey(time2)
      },
      {
        displayString: `${formatToBostonTime(departure1Time, formatOverride)}`,
        isStikethrough: true,
        trackName: time2.prediction?.track,
        reactKey: getInfoKey(time1)
      }
    ];
  }

  const diffInSeconds1 = differenceInSeconds(departure1Time, targetDate);
  const diffInSeconds2 = time2
    ? differenceInSeconds(departureInfoToTime(time2), targetDate)
    : -1;

  if (diffInSeconds1 <= secondsInMinute) {
    // State 9
    return [
      {
        displayString: "Arriving",
        isPrediction: displayInfoContainsPrediction(time1),
        isBolded: true,
        reactKey: getInfoKey(time1)
      }
    ];
  }

  if (
    time2 &&
    diffInSeconds1 < secondsInHour &&
    diffInSeconds1 > secondsInMinute &&
    diffInSeconds2 < secondsInHour &&
    diffInSeconds2 > secondsInMinute
  ) {
    // State 1
    return [
      {
        displayString: `${Math.floor(diffInSeconds1 / secondsInMinute)} min`,
        isPrediction: displayInfoContainsPrediction(time1),
        isBolded: true,
        reactKey: getInfoKey(time1)
      },
      {
        displayString: `${Math.floor(diffInSeconds2 / secondsInMinute)} min`,
        reactKey: getInfoKey(time2)
      }
    ];
  }

  if (
    diffInSeconds1 < secondsInHour &&
    diffInSeconds1 > secondsInMinute &&
    diffInSeconds2 >= secondsInHour
  ) {
    // State 2
    return [
      {
        displayString: `${Math.floor(diffInSeconds1 / secondsInMinute)} min`,
        isBolded: true,
        isPrediction: displayInfoContainsPrediction(time1),
        reactKey: getInfoKey(time1)
      }
    ];
  }

  if (diffInSeconds1 >= secondsInHour && diffInSeconds1 < secondsInDay) {
    // State 3
    // State 4
    // State 5
    // State 6
    return [
      {
        displayString: `${formatToBostonTime(departure1Time, formatOverride)}`,
        // If the days are not the same, then one must be tomorrow
        isTomorrow: !isSameDay(departure1Time, targetDate),
        isPrediction: displayInfoContainsPrediction(time1),
        isBolded: true,
        trackName: time1.prediction?.track,
        reactKey: getInfoKey(time1)
      }
    ];
  }

  if (diffInSeconds1 >= secondsInDay) {
    // State 11
    return [{ displayString: "No upcoming trips", reactKey: "notrip" }];
  }

  // Default state is error
  // State 10
  return defaultState;
};

export { DisplayTimeConfig, infoToDisplayTime };
