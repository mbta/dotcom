// See also Routes.Route.vehicle_name/1
export const vehicleTypeNames = {
  0: "Train",
  1: "Train",
  2: "Train",
  3: "Bus",
  4: "Ferry"
};

// See also VehicleHelpers.realtime_status_text/1
export const statusDescriptions = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  in_transit: "is on the way to",
  incoming: "is arriving at",
  stopped: "has arrived at"
};

export const crowdingDescriptions: { [key: string]: string } = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  not_crowded: "Not crowded",
  // eslint-disable-next-line @typescript-eslint/camelcase
  some_crowding: "Some crowding",
  crowded: "Crowded"
};
