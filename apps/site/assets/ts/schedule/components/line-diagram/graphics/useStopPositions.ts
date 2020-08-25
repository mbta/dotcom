import { useDispatch } from "react-redux";
import { useRef, useEffect, useCallback } from "react";
import { LineDiagramStop } from "../../__schedule";
import { isMergeStop } from "../line-diagram-helpers";
import { BASE_LINE_WIDTH, BRANCH_SPACING } from "./graphic-helpers";

export interface RefList {
  [key: string]: React.MutableRefObject<HTMLElement | null>;
}

function useStopRef(prev: RefList, stop: LineDiagramStop): RefList {
  return {
    ...prev,
    [stop.route_stop.id]: useRef<HTMLElement>(null)
  };
}

const stopById = (stopId: string): ((stop: LineDiagramStop) => boolean) =>
  // eslint-disable-next-line @typescript-eslint/camelcase
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
): [RefList, () => void] {
  const stopRefsMap: RefList = stops.reduce(useStopRef, {});
  const dispatchStopCoords = useDispatch();
  const updateAllStops = useCallback(
    (): void => {
      Object.entries(stopRefsMap).forEach(([stopId, ref]) => {
        const x = xCoordForStop(stops.find(stopById(stopId))!);
        let coordinates = null;
        if (ref && ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          const y = offsetTop + offsetHeight / 2;
          coordinates = [x, y];
        }
        dispatchStopCoords({
          type: "set",
          stop: stopId,
          coords: coordinates
        });
      });
    },
    [dispatchStopCoords, stopRefsMap, stops]
  );

  useEffect(
    () => {
      window.addEventListener("resize", updateAllStops);
      return () => window.removeEventListener("resize", updateAllStops);
    },
    [updateAllStops]
  );

  updateAllStops();

  return [stopRefsMap, updateAllStops];
}
