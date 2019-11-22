import React, {
  ReactElement,
  useState,
  useEffect,
  SetStateAction,
  Dispatch
} from "react";
import renderSvg from "../../helpers/render-svg";
import arrowIcon from "../../../static/images/icon-down-arrow.svg";
import { Stop } from "./__shuttles";

interface Props {
  stops: Stop[];
  onSelect: Dispatch<SetStateAction<Stop>>;
}

const StopDropdown = ({
  stops,
  onSelect
}: Props): ReactElement<HTMLElement> => {
  const [selectedStopId, setSelectedStopId] = useState(stops[0].id);
  useEffect(
    () => {
      const selectedStop = stops.find(stop => stop.id === selectedStopId);
      if (selectedStop) {
        onSelect(selectedStop);
      }
    },
    [onSelect, selectedStopId, stops]
  );

  return (
    <div className="c-select-custom__container">
      <select
        className="c-select-custom"
        value={selectedStopId}
        onChange={e => setSelectedStopId(e.target.value)}
      >
        {stops.map(stop => (
          <option key={stop.id} value={stop.id}>
            {stop.name}
          </option>
        ))}
      </select>
      {renderSvg("c-svg__icon c-select-custom__arrow", arrowIcon)}
    </div>
  );
};

export default StopDropdown;
