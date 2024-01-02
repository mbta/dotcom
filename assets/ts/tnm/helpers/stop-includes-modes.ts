import { modeByV3ModeType } from "../../components/ModeFilter";
import { Mode } from "../../__v3api";
import { StopWithRoutes } from "../components/__tnm";

const reducer = (
  stop: StopWithRoutes,
  accumulator: boolean,
  mode: Mode
): boolean =>
  accumulator ||
  stop.routes.some(routeGroup =>
    routeGroup.routes.some(route => modeByV3ModeType[route.type] === mode)
  );

const stopIncludesModes = (stop: StopWithRoutes, modes: Mode[]): boolean =>
  // if there are no selections or all selections, do not filter
  modes.length === 0 ||
  modes.length === 3 ||
  modes.reduce((acc: boolean, mode: Mode) => reducer(stop, acc, mode), false);

export default stopIncludesModes;
