import React, { ReactElement } from "react";
import { SimpleStop } from "../__schedule";
import {
  SelectedOrigin,
  SelectedDirection,
  stopListOrder
} from "../ScheduleFinder";
import OriginListItem from "./OriginListItem";

interface Props {
  selectedOrigin: SelectedOrigin;
  selectedDirection: SelectedDirection;
  stops: SimpleStop[];
  handleChangeOrigin: Function;
}

const OriginModalContents = ({
  selectedOrigin,
  selectedDirection,
  stops,
  handleChangeOrigin
}: Props): ReactElement<HTMLElement> => (
  <>
    <p className="schedule-finder__origin-text">Choose an origin stop</p>
    <div>
      {stopListOrder(stops, selectedDirection).map((stop: SimpleStop) => (
        <OriginListItem
          key={stop.id}
          stop={stop}
          changeOrigin={handleChangeOrigin}
          selectedOrigin={selectedOrigin}
          lastStop={stopListOrder(stops, selectedDirection)[stops.length - 1]}
        />
      ))}
    </div>
  </>
);

export default OriginModalContents;
