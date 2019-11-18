import React, { ReactElement, useState, useEffect } from "react";
import renderSvg from "../../helpers/render-svg";
import arrowIcon from "../../../static/images/icon-down-arrow.svg";
import { Stop } from "./__shuttles";

interface Props {
  stations: Stop[];
  onSelect: (stationId: string) => void;
}

const StationDropdown = ({
  stations,
  onSelect
}: Props): ReactElement<HTMLElement> => {
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id);
  useEffect(
    () => {
      onSelect(selectedStationId);
    },
    [onSelect, selectedStationId]
  );

  return (
    <div className="c-select-custom__container">
      <select
        className="c-select-custom"
        defaultValue={selectedStationId}
        onChange={e => setSelectedStationId(e.target.value)}
      >
        {stations.map(station => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
      {renderSvg("c-svg__icon c-select-custom__arrow", arrowIcon)}
    </div>
  );
};

export default StationDropdown;
