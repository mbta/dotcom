import React, { ReactElement, useState } from "react";
import { SimpleStop, SelectedStopId } from "../__schedule";
import StopSearchListItem from "./StopSearchListItem";
import SearchBox from "../../../components/SearchBox";

const stopListSearchFilter = (
  stops: SimpleStop[],
  stopQuery: string
): SimpleStop[] => {
  if (stopQuery.trim() === "") {
    return stops;
  }

  const streetSuffixRegExp = /( s| st| | st\.| str| stre| stree| street)$/gi;
  const cleanSearch = stopQuery.trim().replace(streetSuffixRegExp, "");

  const regExp = new RegExp(cleanSearch, "gi");
  return stops.filter(stop => (stop.name.match(regExp) || []).length > 0);
};

interface Props {
  searchLabel: string;
  selectedStop: SelectedStopId;
  stops: SimpleStop[];
  handleChangeStop: (stopId: string) => void;
  disabledStop: SelectedStopId;
}

const StopSearchModalContent = ({
  searchLabel,
  selectedStop,
  stops,
  handleChangeStop,
  disabledStop
}: Props): ReactElement<HTMLElement> => {
  const [stopQuery, setStopQuery] = useState("");

  return (
    <div className="stop-search">
      <h3>{searchLabel}</h3>
      <SearchBox
        id="stop-search-filter"
        labelText={searchLabel}
        className="stop-search__searchbox"
        placeholder="Filter stops and stations"
        onChange={setStopQuery}
      />
      <p>Select from the list below.</p>
      <div className="stop-search__stops-list">
        {stopListSearchFilter(stops, stopQuery).map((stop: SimpleStop) => (
          <StopSearchListItem
            key={stop.id}
            stop={stop}
            changeStop={handleChangeStop}
            isSelected={stop.id === selectedStop}
            isDisabled={stop.id === disabledStop || stop.is_closed}
          />
        ))}
      </div>
    </div>
  );
};

export default StopSearchModalContent;
