import React, { ReactElement } from "react";
import isSilverLine, {
  isSilverLineWaterfront
} from "../../../helpers/silver-line";
import { RouteType } from "../../../__v3api";

interface Props {
  id: string;
  type: RouteType;
  name: string;
}

const HeaderRoutePill = ({
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
        {isSilverLineWaterfront(id) ? "SL" : name}
      </div>
    </div>
  ) : null;

export default HeaderRoutePill;
