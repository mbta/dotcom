import useSWR, { Fetcher } from "swr";
import { LiveDataByStop } from "../schedule/components/line-diagram/__line-diagram";
import { DirectionId, Route } from "../__v3api";

/**
 * Live data, including realtime vehicle locations and predictions
 * Available on all modes except ferry (route.type 4)
 */
const fetcher: Fetcher<LiveDataByStop, string> = (url: string) =>
  fetch(url).then(response => response.json());

const useRealtime = (
  route: Route,
  directionId: DirectionId,
  enabled: boolean = true
): LiveDataByStop | undefined => {
  const liveUrl = `/schedules/line_api/realtime?id=${route.id}&direction_id=${directionId}`;
  const { data } = useSWR<LiveDataByStop>(enabled ? liveUrl : null, fetcher, {
    refreshInterval: 15000
  });
  return data;
};

export default useRealtime;
