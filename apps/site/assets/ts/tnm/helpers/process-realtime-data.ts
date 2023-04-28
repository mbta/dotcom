import dotProp from "dot-prop-immutable";
import {
  RouteWithStopsWithDirections,
  Stop,
  EnhancedRoute,
  PredictedOrScheduledTime,
  Prediction,
  Headsign
} from "../../__v3api";
import {
  RealtimeScheduleData,
  PredictedSchedule,
  PredictedScheduleByHeadsign,
  StopWithRoutes,
  DistanceByStopId
} from "../components/__tnm";

const findRoute = (
  data: RouteWithStopsWithDirections[],
  routeId: string
): [string, number] => {
  const index = data.findIndex(({ route }) => route.id === routeId);
  return index === -1 ? ["add", data.length] : ["update", index];
};

const findStop = (
  data: RouteWithStopsWithDirections[],
  routeIndex: number,
  stopId: string
): [string, number] => {
  const index = data[routeIndex].stops_with_directions.findIndex(
    ({ stop }) => stop.id === stopId
  );
  return index === -1
    ? ["add", data[routeIndex].stops_with_directions.length]
    : ["update", index];
};

const findHeadsign = (
  data: RouteWithStopsWithDirections[],
  routeIndex: number,
  stopIndex: number,
  directionIndex: number,
  headsign: string
): number => {
  const index = data[routeIndex].stops_with_directions[stopIndex].directions[
    directionIndex
  ].headsigns.findIndex(({ name }) => name === headsign);
  return index === -1
    ? data[routeIndex].stops_with_directions[stopIndex].directions[
        directionIndex
      ].headsigns.length
    : index;
};

const setRoute = (
  data: RouteWithStopsWithDirections[],
  index: number,
  route: EnhancedRoute
): RouteWithStopsWithDirections[] =>
  dotProp.set(
    dotProp.set(data, `${index}.route`, route),
    `${index}.stops_with_directions`,
    []
  );

const setStop = (
  data: RouteWithStopsWithDirections[],
  routeIndex: number,
  index: number,
  stop: Stop,
  distance: string
): RouteWithStopsWithDirections[] => {
  let nextData = dotProp.set(
    data,
    `${routeIndex}.stops_with_directions.${index}.stop`,
    stop
  );
  nextData = dotProp.set(
    nextData,
    `${routeIndex}.stops_with_directions.${index}.distance`,
    distance
  );
  nextData = dotProp.set(
    nextData,
    `${routeIndex}.stops_with_directions.${index}.directions`,
    // eslint-disable-next-line camelcase
    [
      { headsigns: [], direction_id: 0 },
      { headsigns: [], direction_id: 1 }
    ]
  );

  return nextData;
};

const getFirstTrainNumber = (
  predictedSchedules: PredictedSchedule[]
): string | undefined => {
  const predictedSchedule = predictedSchedules.find(
    ({ schedule }) => schedule !== null && schedule.train_number !== undefined
  );
  return predictedSchedule
    ? predictedSchedule.schedule.train_number
    : undefined;
};

const buildHeadsign = (
  headsign: string,
  predictedSchedulesByHeadsign: PredictedScheduleByHeadsign
): Headsign => {
  const headsignNameFromSchedule = predictedSchedulesByHeadsign[
    headsign
  ].predicted_schedules.map(
    ({ prediction, schedule }) => prediction || schedule
  );
  const headsignDisplayName = headsignNameFromSchedule[0].headsign;
  return {
    name: headsign,
    headsign: headsignDisplayName,
    times: predictedSchedulesByHeadsign[headsign].predicted_schedules.map(
      ({ prediction, schedule }): PredictedOrScheduledTime => {
        const shortPrediction: Prediction | null = prediction
          ? {
              track: prediction.track,
              time: prediction.time,
              status: null,
              // eslint-disable-next-line camelcase
              schedule_relationship: prediction.schedule_relationship
            }
          : null;
        // TODO figure out how/when this data becomes an array
        const scheduledTime = schedule ? schedule.time : null;
        const delay = 0;

        return {
          prediction: shortPrediction,
          // eslint-disable-next-line camelcase
          scheduled_time: scheduledTime,
          delay
        };
      }
    ),

    // eslint-disable-next-line camelcase
    train_number:
      getFirstTrainNumber(
        predictedSchedulesByHeadsign[headsign].predicted_schedules
      ) || null
  };
};

const setHeadsigns = (
  data: RouteWithStopsWithDirections[],
  routeIndex: number,
  stopIndex: number,
  predictedScheduleByHeadsign: PredictedScheduleByHeadsign
): RouteWithStopsWithDirections[] =>
  Object.keys(predictedScheduleByHeadsign).reduce(
    (accumulator: RouteWithStopsWithDirections[], headsign: string) => {
      const { direction_id: directionId } = predictedScheduleByHeadsign[
        headsign
      ];
      const nextData = accumulator;

      const headsignIndex = findHeadsign(
        nextData,
        routeIndex,
        stopIndex,
        directionId,
        headsign
      );

      return dotProp.set(
        nextData,
        `${routeIndex}.stops_with_directions.${stopIndex}.directions.${directionId}.headsigns.${headsignIndex}`,
        buildHeadsign(headsign, predictedScheduleByHeadsign)
      );
    },
    data
  );

const transformRoutes = (
  distances: DistanceByStopId,
  data: RouteWithStopsWithDirections[],
  realtimeScheduleData: RealtimeScheduleData[]
): RouteWithStopsWithDirections[] =>
  realtimeScheduleData.reduce(
    (
      accumulator: RouteWithStopsWithDirections[],
      {
        route,
        stop,
        predicted_schedules_by_route_pattern: predictedScheduleByHeadsign
      }: RealtimeScheduleData
    ) => {
      let nextData = accumulator;
      const [routeState, routeIndex] = findRoute(accumulator, route.id);
      if (routeState === "add") {
        nextData = setRoute(nextData, routeIndex, route);
      }
      const [stopState, stopIndex] = findStop(nextData, routeIndex, stop.id);
      if (stopState === "add") {
        nextData = setStop(
          nextData,
          routeIndex,
          stopIndex,
          stop,
          distances[stop.id]
        );
      }
      nextData = setHeadsigns(
        nextData,
        routeIndex,
        stopIndex,
        predictedScheduleByHeadsign
      );

      return nextData;
    },
    data
  );

const findStopInStops = (
  data: StopWithRoutes[],
  stopId: string
): [string, number] => {
  const index = data.findIndex(({ stop }) => stop.id === stopId);
  return index === -1 ? ["add", data.length] : ["update", index];
};

const makeGroupName = (route: EnhancedRoute): string => {
  switch (route.type) {
    case 2:
      return "commuter_rail";

    case 3:
      return "bus";

    case 4:
      return "ferry";

    default:
      return route.name.toLowerCase().replace(" ", "_");
  }
};

const findRouteInStops = (
  data: StopWithRoutes[],
  stopIndex: number,
  route: EnhancedRoute
): [string, number, number] => {
  const groupName = makeGroupName(route);
  const routeGroupIndex = data[stopIndex].routes.findIndex(
    routeGroup => routeGroup.group_name === groupName
  );
  if (routeGroupIndex === -1) {
    return ["add-group", data[stopIndex].routes.length, 0];
  }
  const index = data[stopIndex].routes[routeGroupIndex].routes.findIndex(
    existingRoute => existingRoute.id === route.id
  );
  return index === -1
    ? [
        "add-route",
        routeGroupIndex,
        data[stopIndex].routes[routeGroupIndex].routes.length
      ]
    : ["update-route", routeGroupIndex, index];
};

const setStopInStops = (
  data: StopWithRoutes[],
  index: number,
  stop: Stop,
  distance: string
): StopWithRoutes[] => dotProp.set(data, index, { stop, routes: [], distance });

const setRouteGroupInStops = (
  data: StopWithRoutes[],
  stopIndex: number,
  index: number,
  route: EnhancedRoute
): StopWithRoutes[] =>
  dotProp.set(data, `${stopIndex}.routes.${index}`, {
    // eslint-disable-next-line camelcase
    group_name: makeGroupName(route),
    routes: []
  });

const setRouteInStops = (
  data: StopWithRoutes[],
  stopIndex: number,
  routeGroupIndex: number,
  index: number,
  route: EnhancedRoute
): StopWithRoutes[] =>
  dotProp.set(
    data,
    `${stopIndex}.routes.${routeGroupIndex}.routes.${index}`,
    route
  );

const transformStops = (
  distances: DistanceByStopId,
  data: StopWithRoutes[],
  realtimeScheduleData: RealtimeScheduleData[]
): StopWithRoutes[] =>
  realtimeScheduleData.reduce(
    (accumulator: StopWithRoutes[], { route, stop }: RealtimeScheduleData) => {
      let nextData = accumulator;

      // get stop index
      const [stopState, stopIndex] = findStopInStops(nextData, stop.id);

      // add stop
      if (stopState === "add") {
        nextData = setStopInStops(
          nextData,
          stopIndex,
          stop,
          distances[stop.id]
        );
      }

      // get route index
      const [routeState, routeGroupIndex, routeIndex] = findRouteInStops(
        nextData,
        stopIndex,
        route
      );

      // add route group
      if (routeState === "add-group") {
        nextData = setRouteGroupInStops(
          nextData,
          stopIndex,
          routeGroupIndex,
          route
        );
      }
      if (routeState === "add-group" || routeState === "add-route") {
        nextData = setRouteInStops(
          nextData,
          stopIndex,
          routeGroupIndex,
          routeIndex,
          route
        );
      }

      return nextData;
    },
    data
  );

export {
  findRoute,
  findStop,
  findHeadsign,
  findStopInStops,
  makeGroupName,
  findRouteInStops,
  transformRoutes,
  transformStops
};
