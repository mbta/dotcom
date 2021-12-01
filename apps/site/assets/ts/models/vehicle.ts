import { CrowdingType } from "../schedule/components/__schedule";

// eslint-disable-next-line import/prefer-default-export
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

export const crCrowdingDescriptions = (crowding: CrowdingType): string =>
  crowding
    ? {
        // eslint-disable-next-line camelcase
        not_crowded: "many seats available",
        // eslint-disable-next-line camelcase
        some_crowding: "some seats available",
        crowded: "few seats available"
      }[crowding]
    : "";
