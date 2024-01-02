import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";

const fetchData = async (url: string): Promise<MapConfig> =>
  fetchJsonOrThrow(url);

export interface MapConfig {
  tile_server_url: string;
}

const useMapConfig = (): MapConfig | undefined => {
  const { data } = useSWR<MapConfig>(`/api/map-config`, fetchData);
  return data;
};

export default useMapConfig;
