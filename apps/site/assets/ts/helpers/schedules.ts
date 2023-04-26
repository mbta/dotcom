import { filter } from "lodash";
import { Schedule } from "../__v3api";

//direction_destinations : {0: 'Wonderland Station', 1: 'Maverick Station'}
// direction_names : {0: 'Outbound', 1: 'Inbound'}

const schedulesTowardHeadsign = (
  schedules: Schedule[],
  headsign: string
): Schedule[] => {
  return filter(schedules, (sch: Schedule) => {
    return sch.route.direction_destinations[0] === headsign;
  });
};

export { schedulesTowardHeadsign };
