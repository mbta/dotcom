import {
  differenceInSeconds,
  isSameDay,
  secondsInDay,
  secondsInHour,
  secondsInMinute
} from "date-fns";
import {
  departureInfoToTime,
  displayInfoContainsPrediction,
  getNextUnCancelledDeparture
} from "../../helpers/departureInfo";
import { formatToBostonTime } from "../../helpers/date";
import { DepartureInfo } from "../../models/departureInfo";
import { slice } from "lodash";

// This interface is used to tell the front end
// how to display the ScheduleInfoModel data
interface DisplayTimeConfig {
  isPrediction?: boolean;
  displayString: string;
  trackName?: string | null;
  isTomorrow?: boolean;
  isBolded?: boolean;
  isStrikethrough?: boolean;
  reactKey: string;
}

// Returns 3 times from the departureInfo array
// ensuring that at most time is cancelled
const getNextTwoTimes = (
  departureInfos: DepartureInfo[]
): [DepartureInfo | undefined, DepartureInfo | undefined] => {
  const departure1 = departureInfos[0];
  const departure2 = getNextUnCancelledDeparture(slice(departureInfos, 1));

  return [departure1, departure2];
};

const getInfoKey = (departureInfo: DepartureInfo): string => {
  const trip = departureInfo.prediction
    ? departureInfo.prediction.trip
    : departureInfo.schedule!.trip;
  // This will return Trip1-undefined if prediction data is not available
  // This is fine as there should not be 2 schedules with the same trip id
  return `${trip.id}-${departureInfo.prediction?.vehicle_id}`;
};

const infoToDisplayTime = (
  departureInfos: DepartureInfo[],
  targetDate: Date = new Date()
): DisplayTimeConfig[] => {
  const defaultState = [
    { displayString: "Updates unavailable", reactKey: "unavail" }
  ];

  const [departureInfo1, departureInfo2] = getNextTwoTimes(departureInfos);

  // If there is not a departureInfo1 then a schedule or prediction could not be found
  if (!departureInfo1) {
    return defaultState;
  }

  const departure1Time = departureInfoToTime(departureInfo1);
  const formatOverride = "h:mm aa";

  // Only shown for Bus, CR, and Ferry (if there were predictions)
  if (!departureInfo1.isSubway && departureInfo1.isDelayed) {
    // is delayed can only be true if both a prediction and schedule exist
    const scheduleTime = departureInfo1.schedule!.time;
    const predictionTime = departureInfo1.prediction!.time;
    return [
      {
        displayString: `${formatToBostonTime(predictionTime, formatOverride)}`,
        isBolded: true,
        // only predictions can be delayed
        isPrediction: true,
        // keys only need to be unique in the list
        reactKey: getInfoKey(departureInfo1)
      },
      {
        displayString: `${formatToBostonTime(scheduleTime, formatOverride)}`,
        isStrikethrough: true,
        trackName: departureInfo1.prediction!.track,
        reactKey: `${getInfoKey(departureInfo1)}-delayed`
      }
    ];
  }

  // Only shown for Bus, CR, and Ferry (if there were predictions)
  if (
    !departureInfo1.isSubway &&
    departureInfo2 &&
    departureInfo1.isCancelled
  ) {
    const departure2Time = departureInfoToTime(departureInfo2);
    // State 7
    // State 8
    // If trip1 is cancelled, then trip2 should not be cancelled
    // Display trip2 in the first time spot (and its track info in the second)
    return [
      {
        displayString: `${formatToBostonTime(departure2Time, formatOverride)}`,
        isBolded: true,
        isPrediction: displayInfoContainsPrediction(departureInfo2),
        reactKey: getInfoKey(departureInfo2)
      },
      {
        displayString: `${formatToBostonTime(departure1Time, formatOverride)}`,
        isStrikethrough: true,
        trackName: departureInfo2.prediction?.track,
        reactKey: getInfoKey(departureInfo1)
      }
    ];
  }

  // Reorder the times for subway
  // Effectively ignoring the delayed / cancelled time
  let time1 = departureInfo1;
  let time2 = departureInfo2;
  if (
    (departureInfo1.isCancelled || departureInfo1.isDelayed) &&
    departureInfo2
  ) {
    time1 = departureInfo2;
    time2 = undefined;
  }

  const diffInSeconds1 = differenceInSeconds(
    departureInfoToTime(time1),
    targetDate
  );
  const diffInSeconds2 = time2
    ? differenceInSeconds(departureInfoToTime(time2), targetDate)
    : -1;

  if (diffInSeconds1 <= secondsInMinute) {
    // State 9
    return [
      {
        displayString: "<1 minute away",
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
    // if there is no second time just display the first
    (diffInSeconds2 >= secondsInHour || diffInSeconds2 === -1)
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

export { DisplayTimeConfig, infoToDisplayTime, getInfoKey, getNextTwoTimes };
