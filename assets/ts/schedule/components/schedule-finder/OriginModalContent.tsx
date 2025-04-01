import React, { ReactElement, useState } from "react";
import { SimpleStop, SelectedOrigin } from "../__schedule";
import OriginListItem from "./OriginListItem";
import SearchBox from "../../../components/SearchBox";

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
  selectedOrigin: SelectedOrigin;
  stops: SimpleStop[];
  handleChangeOrigin: Function;
}

const OriginModalContent = ({
  selectedOrigin,
  stops,
  handleChangeOrigin
}: Props): ReactElement<HTMLElement> => {
  const [originSearch, setOriginSearch] = useState("");

  return (
    <>
      <br />
      <h3 className="schedule-finder__origin-text">Choose an origin stop</h3>
      <SearchBox
        id="origin-filter"
        labelText="Choose an origin stop"
        className="schedule-finder__origin-search-container"
        placeholder="Filter stops and stations"
        onChange={setOriginSearch}
      />
      <p className="schedule-finder__origin-text">
        Select from the list below.
      </p>
      <div className="schedule-finder__origin-list notranslate">
        {stopListSearchFilter(stops, originSearch).map((stop: SimpleStop) => (
          <OriginListItem
            key={stop.id}
            stop={stop}
            changeOrigin={handleChangeOrigin}
            selectedOrigin={selectedOrigin}
          />
        ))}
      </div>
    </>
  );
};

export default OriginModalContent;
