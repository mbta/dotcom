import React from "react";
import { AnyAction, Reducer } from "redux";

export const CIRC_RADIUS = 4;
export const CIRC_DIAMETER = CIRC_RADIUS * 2;
export const BASE_LINE_WIDTH = CIRC_DIAMETER + 2;
export const BRANCH_LINE_WIDTH = BASE_LINE_WIDTH + 6;
export const BRANCH_SPACING = 16;
export const MERGE_RADIUS = 6;

export type StopCoord = [number, number];
export interface CoordState {
  [key: string]: StopCoord | null;
}

export interface CoordAction extends AnyAction {
  stop: string;
  coords: StopCoord | null;
}

export const coordReducer: Reducer<CoordState, CoordAction> = (
  allCoordinates: CoordState | undefined,
  action: CoordAction
): CoordState => {
  const { stop, coords } = action;
  return {
    ...allCoordinates,
    [stop]: coords
  };
};

export const DiagonalHatchPattern = (id?: string | undefined): JSX.Element => (
  <pattern
    id={id ?? "diagonalHatch"}
    width="10"
    height="10"
    patternTransform="rotate(45 0 0)"
    patternUnits="userSpaceOnUse"
  >
    <line
      className="line-diagram-svg__line"
      y2={CIRC_DIAMETER}
      strokeWidth={`${BRANCH_LINE_WIDTH}px`}
    />
  </pattern>
);
