import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  busIcon,
  commuterRailIcon,
  ferryIcon,
  genericSubwayIcon
} from "../../helpers/icon";
import { Mode } from "../../__v3api";
import { ModeFilter } from "../../components/ModeFilter";
import { State, SetState, UpdateSelectedMode } from "./ProjectsPage";

interface Props {
  state: State;
  setState: SetState;
  updateSelectedMode: UpdateSelectedMode;
}

const FilterAndSearch = ({
  state,
  setState,
  updateSelectedMode
}: Props): ReactElement<HTMLElement> => {
  return (
    <div className="filter-and-search">
      <div className="filter-and-search__wrapper">
        <div className="filter-and-search__filter-buttons">
          <ModeFilter
            isModeSelected={mode => mode === state.currentMode}
            onModeClickAction={newMode =>
              updateSelectedMode(state, newMode, setState)
            }
            modeButtonsToShow={["subway", "bus", "commuter_rail", "ferry"]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
