import tnmData from "../tnmData.json";
import tnmStopData from "../tnmStopData.json";
import { StopWithRoutes } from "../../components/__tnm";
import { RouteWithStopsWithDirections } from "../../../__v3api";

export const importData = (): RouteWithStopsWithDirections[] =>
  JSON.parse(JSON.stringify(tnmData));

export const importStopData = (): StopWithRoutes[] =>
  JSON.parse(JSON.stringify(tnmStopData));
