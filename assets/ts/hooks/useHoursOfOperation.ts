import { useEffect, useState } from "react";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { TransitHoursByStop, TransitHours } from "../__v3api";

const fetchData = async (routeIdString: string): Promise<TransitHours> =>
  fetchJsonOrThrow(
    `/schedules/${routeIdString}/line/hours?${window.location.search.substring(
      1
    )}`
  );

const fetchDataByStop = async (
  routeIdString: string
): Promise<TransitHoursByStop> =>
  fetchJsonOrThrow(
    `/schedules/${routeIdString}/line/hours-by-stop?${window.location.search.substring(
      1
    )}`
  );

const useHoursOfOperation = (routeId: string): TransitHours | null => {
  const [hoursOfOperation, setHoursOfOperation] = useState<TransitHours | null>(
    null
  );

  useEffect(() => {
    fetchData(routeId).then(result => setHoursOfOperation(result));
  }, [routeId]);

  return hoursOfOperation;
};

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

export { useHoursOfOperation as default, useHoursOfOperationByStop };
