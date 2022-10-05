import { useEffect, useState } from "react";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { RapidTransitHours, TransitHours } from "../__v3api";

const useHoursOfOperation = (
  routeId: string
): RapidTransitHours | TransitHours | null => {
  const [hoursOfOperation, setHoursOfOperation] = useState<
    RapidTransitHours | TransitHours | null
  >(null);

  const fetchData = async (
    routeId: string
  ): Promise<RapidTransitHours | TransitHours> =>
    await fetchJsonOrThrow(`/schedules/${routeId}/line/hours`);

  useEffect(() => {
    fetchData(routeId)
      .then(result => setHoursOfOperation(result))
      .catch(console.error);
  }, [routeId]);

  return hoursOfOperation;
};

export default useHoursOfOperation;
