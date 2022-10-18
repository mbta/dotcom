import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createStore, Store } from "redux";
import { stopIds } from "../../../../helpers/stop-tree";
import { StopId, StopTree } from "../../__schedule";
import { branchPosition } from "../line-diagram-helpers";
import {
  BASE_LINE_WIDTH,
  BRANCH_SPACING,
  CoordAction,
  coordReducer,
  CoordState
} from "./graphic-helpers";
import { RefMap } from "./useStopPositions";

export const createStopTreeCoordStore = (
  stopTree: StopTree
): Store<CoordState, CoordAction> => {
  const ids: StopId[] = stopIds(stopTree);

  const initialCoordState: CoordState = ids.reduce(
    (acc, id) => ({ ...acc, [id]: null }),
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

const xCoordForStop = (stopTree: StopTree, id: StopId): number =>
  BRANCH_SPACING * (branchPosition(stopTree, id) - 1) + BASE_LINE_WIDTH + 1;

export default function useTreeStopPositions(
  stopTree: StopTree
): [RefMap, () => void] {
  const stopRefsMap = useRef(new Map() as RefMap);
  const dispatchStopCoords = useDispatch();

  const updateAllStops = useCallback((): void => {
    stopRefsMap.current.forEach((el, stopId) => {
      const x = xCoordForStop(stopTree, stopId);
      let coordinates = null;
      if (el) {
        const { offsetTop, offsetHeight } = el;
        const y = offsetTop + offsetHeight / 2;
        coordinates = [x, y];
      }

      dispatchStopCoords({
        type: "set",
        stop: stopId,
        coords: coordinates
      });
    });
  }, [dispatchStopCoords, stopRefsMap, stopTree]);

  useEffect(() => {
    updateAllStops();
    window.addEventListener("resize", updateAllStops);
    return () => window.removeEventListener("resize", updateAllStops);
  }, [updateAllStops]);

  return [stopRefsMap.current, updateAllStops];
}
