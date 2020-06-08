import { Route } from "../__v3api";

export const isABusRoute = ({ type }: Route): boolean => type === 3;

export const isAGreenLineRoute = ({ id }: Route): boolean =>
  id.startsWith("Green");
