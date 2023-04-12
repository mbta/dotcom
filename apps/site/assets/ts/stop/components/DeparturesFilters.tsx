import React, { ReactElement } from "react";
import { Mode } from "../../__v3api";
import {
  commuterRailIcon,
  genericSubwayIcon,
  busIcon,
  ferryIcon
} from "../../helpers/icon";

export type ModeChoice = "all" | Mode;
interface ModeDisplay {
  displayText: string;
  displayIcon?: JSX.Element;
  mode: ModeChoice;
}

const ALL_MODE_BUTTONS: ModeDisplay[] = [
  {
    mode: "all",
    displayText: "All"
  },
  {
    mode: "commuter_rail",
    displayText: "Rail",
    displayIcon: commuterRailIcon("c-svg__icon")
  },
  {
    mode: "subway",
    displayText: "Subway",
    displayIcon: genericSubwayIcon("c-svg__icon")
  },
  {
    mode: "bus",
    displayText: "Bus",
    displayIcon: busIcon("c-svg__icon")
  },
  {
    mode: "ferry",
    displayText: "Ferry",
    displayIcon: ferryIcon("c-svg__icon")
  }
];

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
  const displayedModes: ModeDisplay[] = ALL_MODE_BUTTONS.filter(
    ({ mode }) => mode === "all" || modesList.includes(mode)
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
