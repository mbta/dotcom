import { Stop } from "../__v3api";
// eslint-disable-next-line import/prefer-default-export
export const isStopAStation = (stop: Stop): boolean => stop["station?"];

export const isStopAFerryStop = (stop: Stop): boolean => stop["ferry?"];
