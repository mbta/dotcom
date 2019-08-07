import tnmData from "../tnmData.json";
import realtimeData from "../realtimeData.json";
import state from "../state.json";
import {
  StopsWithDistances,
  RealtimeScheduleData
} from "../../components/__tnm";
import { State } from "../../state.js";

export const importData = (): StopsWithDistances =>
  JSON.parse(JSON.stringify(tnmData));

export const importRealtimeResponse = (): RealtimeScheduleData[] =>
  JSON.parse(JSON.stringify(realtimeData));

export const importState = (): State => JSON.parse(JSON.stringify(state));
