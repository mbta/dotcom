import React, { ReactElement, ChangeEvent } from "react";
import { SimpleStop } from "../__schedule";
import {
  SelectedOrigin,
  SelectedDirection,
  stopListOrder
} from "../ScheduleFinder";
import OriginListItem from "./OriginListItem";

const stopListSearchFilter = (
  stops: SimpleStop[],
  originSearch: string
): SimpleStop[] => {
  if (originSearch.trim() === "") {
    return stops;
  }

  const streetSuffixRegExp = /( s| st| | st\.| str| stre| stree| street)$/gi;
  const cleanSearch = originSearch.trim().replace(streetSuffixRegExp, "");

  const regExp = new RegExp(cleanSearch, "gi");
  return stops.filter(stop => (stop.name.match(regExp) || []).length > 0);
};

interface Props {
  originSearch: string;
  selectedOrigin: SelectedOrigin;
  selectedDirection: SelectedDirection;
  stops: SimpleStop[];
  handleChangeOrigin: Function;
  handleUpdateOriginSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const OriginModalContents = ({
  originSearch,
  selectedOrigin,
  selectedDirection,
  stops,
  handleChangeOrigin,
  handleUpdateOriginSearch
}: Props): ReactElement<HTMLElement> => (
  <>
    <br />
    <p className="schedule-finder__origin-text">
      <strong>Choose an origin stop</strong>
    </p>
    <div className="schedule-finder__origin-search-container">
      <input
        className="schedule-finder__origin-search"
        id="origin-filter"
        key="origin-search-input"
        type="text"
        onChange={handleUpdateOriginSearch}
        value={originSearch}
        placeholder="Filter stops and stations"
      />
    </div>
    <p className="schedule-finder__origin-text">Select from the list below.</p>
    <div className="schedule-finder__origin-list">
      {stopListSearchFilter(
        stopListOrder(stops, selectedDirection),
        originSearch
      ).map((stop: SimpleStop) => (
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
