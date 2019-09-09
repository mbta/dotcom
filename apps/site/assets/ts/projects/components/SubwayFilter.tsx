import React, { ReactElement } from "react";
import FilterButton from "../../components/FilterButton";
import ModeIcon from "../../tnm/components/ModeIcon";
import { SetState, State, SubwayLine, UpdateSelectedLine } from "./ProjectsPage";

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

const LineButton = ({ line, updateSelectedLine, state, setState }: LineButtonProps): ReactElement<HTMLElement> => {
  const iconType = `${line}_line`;
  const name = line[0].toUpperCase() + line.slice(1) + " Line";

  return (
    <FilterButton
      identifier={line}
      icon={<ModeIcon type={iconType} />}
      name={name}
      isSelected={f => line === state.currentLine}
      onClick={(line) => () => updateSelectedLine(state, line, setState)}
    />
  );
};

const SubwayFilter = ({
  state,
  setState,
  updateSelectedLine
}: Props): ReactElement<HTMLElement> | null => {
  if (state.currentMode != "subway") {
    return null;
  }

  return (
    <div className="subway-filter">
      <div className="c-mode-filter__filter-btn-group">
        <LineButton line="red" updateSelectedLine={updateSelectedLine} state={state} setState={setState} />
        <LineButton line="orange" updateSelectedLine={updateSelectedLine} state={state} setState={setState} />
      </div>
      <div className="c-mode-filter__filter-btn-group">
        <LineButton line="blue" updateSelectedLine={updateSelectedLine} state={state} setState={setState} />
        <LineButton line="green" updateSelectedLine={updateSelectedLine} state={state} setState={setState} />
      </div>
      <div className="c-mode-filter__filter-btn-group">
        <LineButton line="mattapan" updateSelectedLine={updateSelectedLine} state={state} setState={setState} />
      </div>
    </div>
  );
};

export default SubwayFilter;
