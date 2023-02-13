import { useEffect, useState } from "react";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Stop } from "../__v3api";

const fetchData = async (stopIdString: string): Promise<Stop> =>
  fetchJsonOrThrow(`/api/stop/${stopIdString}`);

const useStop = (stopId: string): Stop | null => {
  const [stop, setStop] = useState<Stop | null>(null);

  useEffect(() => {
    fetchData(stopId).then(result => setStop(result));
  }, [stopId]);

  return stop;
};

export default useStop;
