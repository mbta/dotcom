import React from "react";
import { AnyAction, Reducer, Store, createStore } from "redux";
import { LineDiagramStop } from "../../__schedule";

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

export const createLineDiagramCoordStore = (
  lineDiagram: LineDiagramStop[]
): Store<CoordState, CoordAction> => {
  const stopIds = lineDiagram.map(ld => ld.route_stop.id);
  const initialCoordState: CoordState = stopIds.reduce(
    (state, id) => ({ ...state, [id]: null }),
    {}
  );
  const store = createStore(
    coordReducer,
    initialCoordState,
    /* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    /* eslint-enable no-underscore-dangle, @typescript-eslint/no-explicit-any */
  );

  return store;
};

export const DiagonalHatchPattern = (
  id?: string | undefined
): React.SVGProps<SVGPatternElement> => (
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
