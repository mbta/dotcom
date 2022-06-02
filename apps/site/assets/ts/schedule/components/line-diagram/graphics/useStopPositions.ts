import { useDispatch } from "react-redux";
import { useRef, useEffect, useCallback } from "react";
import { LineDiagramStop } from "../../__schedule";
import { isMergeStop } from "../line-diagram-helpers";
import { BASE_LINE_WIDTH, BRANCH_SPACING } from "./graphic-helpers";

export type RefMap = Map<string, HTMLElement | null>;

const stopById = (stopId: string): ((stop: LineDiagramStop) => boolean) =>
  // eslint-disable-next-line camelcase
  ({ route_stop }) => stopId === route_stop.id;

const xCoordForStop = (stop: LineDiagramStop): number => {
  if (isMergeStop(stop)) {
    return BASE_LINE_WIDTH + 1;
  }
  // usually just a function of stop_data length
  return BRANCH_SPACING * (stop.stop_data.length - 1) + BASE_LINE_WIDTH + 1;
};

export default function useStopPositions(
  stops: LineDiagramStop[]
): [RefMap, () => void] {
  const stopRefsMap = useRef(new Map() as RefMap);
  const dispatchStopCoords = useDispatch();
  const updateAllStops = useCallback((): void => {
    stopRefsMap.current.forEach((el, stopId) => {
      const stop = stops.find(stopById(stopId));
      if (!stop) {
        return;
      }

      const x = xCoordForStop(stop);
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
  }, [dispatchStopCoords, stopRefsMap, stops]);

  useEffect(() => {
    updateAllStops();
    window.addEventListener("resize", updateAllStops);
    return () => window.removeEventListener("resize", updateAllStops);
  }, [updateAllStops]);

  return [stopRefsMap.current, updateAllStops];
}
