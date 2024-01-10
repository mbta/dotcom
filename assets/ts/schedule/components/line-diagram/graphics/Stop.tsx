import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { StopId } from "../../__schedule";
import { StopCoord, CoordState, CIRC_RADIUS } from "./graphic-helpers";

const Stop = ({
  stopId,
  shuttle
}: {
  stopId: StopId;
  shuttle?: boolean;
}): ReactElement<SVGCircleElement> | null => {
  const coords: StopCoord | null = useSelector(
    (state: CoordState) => state[stopId]
  );
  if (!coords) return null;
  const [x, y] = coords;
  return (
    <circle
      className="line-diagram-svg__stop"
      r={`${CIRC_RADIUS}px`}
      cx={`${x}px`}
      cy={`${y}px`}
      data-shuttle={!!shuttle}
    />
  );
};

export default Stop;
