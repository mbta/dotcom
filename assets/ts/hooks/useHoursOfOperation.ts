import { useEffect, useState } from "react";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { TransitHoursByStop } from "../__v3api";

const fetchDataByStop = async (
  routeIdString: string
): Promise<TransitHoursByStop> =>
  fetchJsonOrThrow(
    `/schedules/${routeIdString}/line/hours-by-stop?${window.location.search.substring(
      1
    )}`
  );

const useHoursOfOperationByStop = (
  routeId: string
): TransitHoursByStop | null => {
  const [
    hoursOfOperation,
    setHoursOfOperation
  ] = useState<TransitHoursByStop | null>(null);

  useEffect(() => {
    fetchDataByStop(routeId).then(result => setHoursOfOperation(result));
  }, [routeId]);

  return hoursOfOperation;
};

// eslint-disable-next-line import/prefer-default-export
export { useHoursOfOperationByStop };
