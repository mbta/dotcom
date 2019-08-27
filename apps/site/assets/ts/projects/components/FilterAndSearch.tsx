import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { busIcon, commuterRailIcon, ferryIcon, genericSubwayIcon } from "../../helpers/icon";
import { Mode } from "../../__v3api";
import { ModeFilter } from "../../components/ModeFilter";
import { SetSelectedMode, UpdateSelectedMode } from "./ProjectsPage";

interface Props {
  selectedMode?: Mode;
  setSelectedMode: SetSelectedMode;
  updateSelectedMode: UpdateSelectedMode;
};

const FilterAndSearch = ({selectedMode, setSelectedMode, updateSelectedMode}: Props): ReactElement<HTMLElement> => {
  return (
    <div className="filter-and-search">
      <div className="filter-and-search__wrapper">
        <div className="filter-and-search__filter-buttons">
          <ModeFilter isModeSelected={(mode) => mode === selectedMode} onModeClickAction={(newMode) => updateSelectedMode(setSelectedMode, newMode, selectedMode)} modeButtonsToShow={["subway", "bus", "commuter_rail", "ferry"]} />
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
