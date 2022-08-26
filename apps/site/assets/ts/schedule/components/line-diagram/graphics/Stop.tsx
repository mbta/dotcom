import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { LineDiagramStop } from "../../__schedule";
import { StopCoord, CoordState, CIRC_RADIUS } from "./graphic-helpers";

const Stop = ({
  stop,
  shuttle
}: {
  stop: LineDiagramStop;
  shuttle?: boolean;
}): ReactElement<SVGCircleElement> | null => {
  const coords: StopCoord | null = useSelector(
    (state: CoordState) => state[stop.route_stop.id]
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
