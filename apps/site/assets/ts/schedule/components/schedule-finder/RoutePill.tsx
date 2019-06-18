import React, { ReactElement } from "react";
import { RouteType } from "../../../__v3api";
import isSilverLine from "../../../helpers/silver-line";

interface Props {
  id: string;
  type: RouteType;
  name: string;
}

const RoutePill = ({
  id,
  type,
  name
}: Props): ReactElement<HTMLElement> | null =>
  type === 3 ? (
    <div className="m-route-pills">
      <div
        className={`h1 schedule-finder__modal-route-pill u-bg--${
          isSilverLine(id) ? "silver-line" : "bus"
        }`}
      >
        {name}
      </div>
    </div>
  ) : null;

export default RoutePill;
