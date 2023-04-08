import { sortBy, startCase } from "lodash";
import React, { ReactElement } from "react";
import { Mode } from "../../__v3api";
import { iconForMode } from "../../models/route";

export type ModeChoice = "all" | Mode;
interface ModeDisplay {
  displayText: string;
  displayIcon?: JSX.Element;
  mode: ModeChoice;
}

const buttonNameForMode = (mode: Mode): string => {
  if (mode === "commuter_rail") {
    return "Rail";
  }
  return startCase(mode);
};

// Commuter Rail, then Subway, then Bus
const buttonSortFn = (mode: Mode): number => {
  if (mode === "commuter_rail") {
    return 1;
  }
  if (mode === "subway") {
    return 2;
  }
  if (mode === "bus") {
    return 3;
  }
  return 4;
};

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
    sortBy(modesList, [buttonSortFn]).map(mode => ({
      displayText: buttonNameForMode(mode as Mode),
      displayIcon: iconForMode(mode as Mode),
      mode: mode as ModeChoice
    }))
  );
  return (
    <div className="d-flex departure-filters">
      {displayedModes.map(option => (
        <button
          key={option.mode}
          type="button"
          onClick={() => setSelectedMode(option.mode)}
          className={`
            btn btn-secondary ${
              selectedMode === option.mode ? "active" : "inactive"
            }
        `}
        >
          {option.displayIcon} {option.displayText}
        </button>
      ))}
    </div>
  );
};

export default DeparturesFilters;
