import { DepartureInfo } from "../../models/departureInfo";

const getInfoKey = (departureInfo: DepartureInfo): string => {
  const trip = departureInfo.prediction
    ? departureInfo.prediction.trip
    : departureInfo.schedule!.trip;
  // This will return Trip1-undefined if prediction data is not available
  // This is fine as there should not be 2 schedules with the same trip id
  return `${trip.id}-${departureInfo.prediction?.vehicle_id}`;
};

// eslint-disable-next-line import/prefer-default-export
export { getInfoKey };
