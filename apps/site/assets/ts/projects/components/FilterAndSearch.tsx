import React, { ReactElement } from "react";
import SubwayFilter from "./SubwayFilter";
import { ModeFilter } from "../../components/ModeFilter";
import {
  State,
  SetState,
  UpdateSelectedLine,
  UpdateSelectedMode
} from "./ProjectsPage";

interface Props {
  state: State;
  setState: SetState;
  updateSelectedLine: UpdateSelectedLine;
  updateSelectedMode: UpdateSelectedMode;
}

const FilterAndSearch = ({
  state,
  setState,
  updateSelectedLine,
  updateSelectedMode
}: Props): ReactElement<HTMLElement> => (
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
        <SubwayFilter
          state={state}
          setState={setState}
          updateSelectedLine={updateSelectedLine}
        />
      </div>
    </div>
  </div>
);

export default FilterAndSearch;
