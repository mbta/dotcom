import { slice } from "lodash";
import { getNextUnCancelledDeparture } from "../../helpers/departureInfo";
import { DepartureInfo } from "../../models/departureInfo";

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

export { getInfoKey, getNextTwoTimes };
