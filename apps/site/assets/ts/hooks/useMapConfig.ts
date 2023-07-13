import useFetch from "./useFetch";

const useMapConfig = ():
  | {
      tile_server_url: string;
    }
  | undefined => {
  const { data } = useFetch<{
    tile_server_url: string;
  }>("/api/map-config");
  return data;
};

export default useMapConfig;
