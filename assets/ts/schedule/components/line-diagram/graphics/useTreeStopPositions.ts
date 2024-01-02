import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createStore, Store } from "redux";
import { stopIds } from "../../../../helpers/stop-tree";
import { RouteStop, StopId, StopTree } from "../../__schedule";
import { branchPosition } from "../line-diagram-helpers";
import {
  BASE_LINE_WIDTH,
  BRANCH_SPACING,
  CoordAction,
  coordReducer,
  CoordState
} from "./graphic-helpers";

export type RefMap = Map<string, HTMLElement | null>;

const isRouteStopList = (
  stopOrList: StopTree | RouteStop[]
): stopOrList is RouteStop[] => Array.isArray(stopOrList);

export const createStopTreeCoordStore = (
  stopTreeOrList: StopTree | RouteStop[]
): Store<CoordState, CoordAction> => {
  const ids: StopId[] = isRouteStopList(stopTreeOrList)
    ? stopTreeOrList.map(rs => rs.id)
    : stopIds(stopTreeOrList);

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
  stopTreeOrList: StopTree | RouteStop[]
): [RefMap, () => void] {
  const stopRefsMap = useRef(new Map() as RefMap);
  const dispatchStopCoords = useDispatch();

  const updateAllStops = useCallback((): void => {
    stopRefsMap.current.forEach((el, stopId) => {
      const x = isRouteStopList(stopTreeOrList)
        ? BASE_LINE_WIDTH + 1
        : xCoordForStop(stopTreeOrList, stopId);
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
  }, [dispatchStopCoords, stopRefsMap, stopTreeOrList]);

  useEffect(() => {
    updateAllStops();
    window.addEventListener("resize", updateAllStops);
    return () => window.removeEventListener("resize", updateAllStops);
  }, [updateAllStops]);

  return [stopRefsMap.current, updateAllStops];
}
