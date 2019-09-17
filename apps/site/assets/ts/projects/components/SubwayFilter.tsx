import React, { ReactElement } from "react";
import FilterButton from "../../components/FilterButton";
import ModeIcon from "../../tnm/components/ModeIcon";
import {
  SetState,
  State,
  SubwayLine,
  UpdateSelectedLine
} from "./ProjectsPage";

interface Props {
  state: State;
  setState: SetState;
  updateSelectedLine: UpdateSelectedLine;
}

interface LineButtonProps {
  line: SubwayLine;
  updateSelectedLine: UpdateSelectedLine;
  state: State;
  setState: SetState;
}

const LineButton = ({
  line,
  updateSelectedLine,
  state,
  setState
}: LineButtonProps): ReactElement<HTMLElement> => {
  const iconType = `${line}_line`;
  const firstLetter = line[0].toUpperCase();
  const rest = line.slice(1);
  const name = `${firstLetter}${rest}`;

  return (
    <FilterButton
      identifier={line}
      icon={<ModeIcon type={iconType} />}
      name={name}
      isSelected={() => line === state.currentLine}
      onClick={clickedLine => () =>
        updateSelectedLine(state, clickedLine, setState)}
    />
  );
};

const SubwayFilter = ({
  state,
  setState,
  updateSelectedLine
}: Props): ReactElement<HTMLElement> | null => {
  if (state.currentMode !== "subway") {
    return null;
  }

  return (
    <>
      <div className="subway-filter__top-hairline" />
      <span className="m-tnm-sidebar__filter-header u-small-caps">
        Subway Lines
      </span>
      <div className="subway-filter">
        <div className="c-mode-filter__filter-btn-group">
          <LineButton
            line="red"
            updateSelectedLine={updateSelectedLine}
            state={state}
            setState={setState}
          />
          <LineButton
            line="orange"
            updateSelectedLine={updateSelectedLine}
            state={state}
            setState={setState}
          />
        </div>
        <div className="c-mode-filter__filter-btn-group">
          <LineButton
            line="blue"
            updateSelectedLine={updateSelectedLine}
            state={state}
            setState={setState}
          />
          <LineButton
            line="green"
            updateSelectedLine={updateSelectedLine}
            state={state}
            setState={setState}
          />
        </div>
        <div className="c-mode-filter__filter-btn-group">
          <LineButton
            line="mattapan"
            updateSelectedLine={updateSelectedLine}
            state={state}
            setState={setState}
          />
        </div>
      </div>
    </>
  );
};

export default SubwayFilter;
