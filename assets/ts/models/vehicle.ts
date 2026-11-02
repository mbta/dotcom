import { DirectionId } from "../__v3api";
import { CrowdingType } from "../schedule/components/__schedule";

export interface Vehicle {
  id: string;
  route_id: string | null;
  trip_id: string | null;
  stop_id: string | null;
  direction_id: DirectionId;
  longitude: number;
  latitude: number;
  bearing: number;
  status: string;
  crowding: CrowdingType | null;
}

export const crowdingDescriptions = (crowding: CrowdingType): string =>
  crowding
    ? {
        // eslint-disable-next-line camelcase
        not_crowded: "Not crowded",
        // eslint-disable-next-line camelcase
        some_crowding: "Some crowding",
        crowded: "Crowded"
      }[crowding]
    : "";
