import { useEffect, useState } from "react";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { RapidTransitHours, TransitHours } from "../__v3api";

const fetchData = async (
  routeIdString: string
): Promise<RapidTransitHours | TransitHours> =>
  fetchJsonOrThrow(
    `/schedules/${routeIdString}/line/hours?${window.location.search.substring(
      1
    )}`
  );

const fetchDataByStop = async (
  routeIdString: string
): Promise<RapidTransitHours | TransitHours> =>
  fetchJsonOrThrow(
    `/schedules/${routeIdString}/line/hours-by-stop?${window.location.search.substring(
      1
    )}`
  );

const useHoursOfOperation = (
  routeId: string
): RapidTransitHours | TransitHours | null => {
  const [hoursOfOperation, setHoursOfOperation] = useState<
    RapidTransitHours | TransitHours | null
  >(null);

  useEffect(() => {
    fetchData(routeId).then(result => setHoursOfOperation(result));
  }, [routeId]);

  return hoursOfOperation;
};

const useHoursOfOperationByStop = (
  routeId: string
): RapidTransitHours | TransitHours | null => {
  const [hoursOfOperation, setHoursOfOperation] = useState<
    RapidTransitHours | TransitHours | null
  >(null);

  useEffect(() => {
    fetchDataByStop(routeId).then(result => setHoursOfOperation(result));
  }, [routeId]);

  return hoursOfOperation;
};

export { useHoursOfOperation as default, useHoursOfOperationByStop };
