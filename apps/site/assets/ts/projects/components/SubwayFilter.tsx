import React, { ReactElement } from "react";
import FilterButton from "../../components/FilterButton";
import ModeIcon from "../../tnm/components/ModeIcon";
import { SubwayLine } from "./ProjectsPage";

interface Props {
  currentMode?: string;
  currentLine?: SubwayLine;
}

interface LineButtonProps {
  line: SubwayLine;
}

const LineButton = ({ line }: LineButtonProps): ReactElement<HTMLElement> => {
  const iconType = `${line}_line`;
  const name = line[0].toUpperCase() + line.slice(1) + " Line";

  return (
    <FilterButton
      identifier={line}
      icon={<ModeIcon type={iconType} />}
      name={name}
      isSelected={f => false}
      onClick={f => () => console.log(f)}
    />
  );
};

const SubwayFilter = ({
  currentMode
}: Props): ReactElement<HTMLElement> | null => {
  if (currentMode != "subway") {
    return null;
  }

  return (
    <div className="subway-filter">
      <div className="c-mode-filter__filter-btn-group">
        <LineButton line="red" />
        <LineButton line="orange" />
      </div>
      <div className="c-mode-filter__filter-btn-group">
        <LineButton line="blue" />
        <LineButton line="green" />
      </div>
      <div className="c-mode-filter__filter-btn-group">
        <LineButton line="mattapan" />
      </div>
    </div>
  );
};

export default SubwayFilter;
