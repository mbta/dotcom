import { startCase } from "lodash";
import React, { ReactElement } from "react";
import Pill from "./Pill";
import { Mode } from "../../__v3api";
export type ModeChoice = "all" | Mode;
interface ModeDisplay {
  displayText: string;
  displayIcon?: JSX.Element;
  mode: ModeChoice;
}

const DeparturesFilters = ({
  modesList,
  selectedMode,
  setSelectedMode
}: {
  modesList: ModeChoice[];
  selectedMode: ModeChoice;
  setSelectedMode: (val: ModeChoice) => void;
}): ReactElement<HTMLElement> | null => {
  if (!modesList.length) return null;
  // Create filter list
  const displayedModes: ModeDisplay[] = [
    {
      displayText: "All",
      mode: "all" as ModeChoice
    }
  ].concat(
    modesList.map(mode => ({
      displayText: startCase(mode),
      mode: mode as ModeChoice
    }))
  );
  return (
    <div className="d-flex">
      {displayedModes.map(option => (
        <Pill
          onClick={() => setSelectedMode(option.mode)}
          selected={selectedMode === option.mode}
          key={option.mode}
        >
          {option.displayText}
        </Pill>
      ))}
    </div>
  );
};

export default DeparturesFilters;
