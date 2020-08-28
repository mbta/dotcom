import {
  LineDiagramVehicle,
  CrowdingType
} from "../schedule/components/__schedule";
import { RouteType } from "../__v3api";

// See also Routes.Route.vehicle_name/1
export const vehicleName = (routeType: RouteType): string =>
  ({
    0: "Train",
    1: "Train",
    2: "Train",
    3: "Bus",
    4: "Ferry"
  }[routeType]);

// See also VehicleHelpers.realtime_status_text/1
export const vehicleRealtimeStatusText = ({
  status
}: LineDiagramVehicle): string =>
  ({
    // eslint-disable-next-line @typescript-eslint/camelcase
    in_transit: "is on the way to",
    incoming: "is arriving at",
    stopped: "has arrived at"
  }[status]);

export const crowdingDescriptions = (crowding: CrowdingType): string =>
  crowding
    ? {
        // eslint-disable-next-line @typescript-eslint/camelcase
        not_crowded: "Not crowded",
        // eslint-disable-next-line @typescript-eslint/camelcase
        some_crowding: "Some crowding",
        crowded: "Crowded"
      }[crowding]
    : "";
