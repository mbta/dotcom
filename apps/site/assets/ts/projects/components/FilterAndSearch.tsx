import React, { ReactElement } from "react";
import { busIcon, commuterRailIcon, ferryIcon, genericSubwayIcon } from "../../helpers/icon";
import { ModeFilter } from "../../components/ModeFilter";

const FilterAndSearch = (): ReactElement<HTMLElement> => (
  <div className="filter-and-search">
    <div className="filter-and-search__wrapper">
      <div className="filter-and-search__filter-buttons">
        <ModeFilter isModeSelected={(m) => false} onModeClickAction={(f) => f} modeButtonsToShow={["subway", "bus", "commuter_rail", "ferry"]} />
      </div>
    </div>
  </div>
);

export default FilterAndSearch;
