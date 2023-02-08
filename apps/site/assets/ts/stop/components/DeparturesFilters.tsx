import React, { ReactElement, useEffect, useState } from "react";
import { each, startCase, uniqueId } from "lodash";
import Pill from "./Pill";
import { Mode } from "../../__v3api";

export const ALL = "all";
export const BUS: Mode = "bus";
export const SUBWAY: Mode = "subway";
export const FERRY: Mode = "ferry";
export const COMMUTER_RAIL: Mode = "commuter_rail";

const filterDeparturesByMode = (
  departuresArray: any[],
  mode: Mode | typeof ALL
): any[] => {
  if (mode === ALL) {
    return departuresArray;
  }
  return departuresArray.filter(d => d.mode === mode);
};

const DeparturesFilters = ({
  departures,
  onModeChange
}: {
  departures: any[];
  onModeChange: (val: any[]) => void;
}): ReactElement<HTMLElement> => {
  const [selectedMode, setSelectedMode] = useState<typeof ALL | Mode>(ALL);
  const [filterOptions, setFilterOptions] = useState<
    { displayText: string; mode: typeof ALL | Mode }[]
  >([]);

  // Create filter list
  useEffect(() => {
    if (departures.length === 0) {
      setFilterOptions([]);
    } else {
      const filterOptionsArray: {
        displayText: string;
        mode: typeof ALL | Mode;
      }[] = [
        {
          displayText: startCase(ALL),
          mode: ALL
        }
      ];
      each([BUS, SUBWAY, COMMUTER_RAIL, FERRY], arrayMode => {
        if (filterDeparturesByMode(departures, arrayMode).length > 0) {
          filterOptionsArray.push({
            displayText: startCase(arrayMode),
            mode: arrayMode
          });
        }
      });
      setFilterOptions(filterOptionsArray);
    }
  }, [departures]);

  useEffect(() => {
    onModeChange(filterDeparturesByMode(departures, selectedMode));
  }, [departures, selectedMode, onModeChange]);

  return (
    <div className="d-flex">
      {filterOptions.map(option => (
        <Pill
          onClick={() => setSelectedMode(option.mode)}
          selected={selectedMode === option.mode}
          key={uniqueId()}
        >
          {option.displayText}
        </Pill>
      ))}
    </div>
  );
};

export default DeparturesFilters;
