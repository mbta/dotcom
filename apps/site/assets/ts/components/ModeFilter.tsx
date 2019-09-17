import React, { ReactElement } from "react";
import { Mode } from "../__v3api";
import FilterButton from "./FilterButton";
import ModeIcon from "../tnm/components/ModeIcon";

type IsModeSelectedFunction = (mode: Mode) => boolean;

interface Props {
  isModeSelected: IsModeSelectedFunction;
  onModeClickAction: (mode: Mode) => void;
  modeButtonsToShow?: string[];
}

interface ModeButtonProps {
  mode: Mode;
  icon: string;
  name: string;
  isModeSelected: IsModeSelectedFunction;
  onClick: (mode: Mode) => () => void;
}

interface ModeByV3ModeType {
  [s: number]: Mode;
}

export const modeByV3ModeType: ModeByV3ModeType = {
  0: "subway",
  1: "subway",
  2: "commuter_rail",
  3: "bus"
};

const ModeButton = ({
  mode,
  icon,
  name,
  isModeSelected,
  onClick
}: ModeButtonProps): ReactElement<HTMLElement> => (
  <FilterButton
    identifier={mode}
    icon={<ModeIcon type={icon} />}
    name={name}
    isSelected={isModeSelected}
    onClick={onClick}
  />
);

const shouldShowModeButton = (
  mode: string,
  modeButtonsToShow?: string[]
): boolean => {
  if (modeButtonsToShow) {
    return modeButtonsToShow.includes(mode);
  }

  // By default, show all available modes except ferry.

  if (mode === "ferry") {
    return false;
  }
  return true;
};

export const ModeFilter = ({
  isModeSelected,
  onModeClickAction,
  modeButtonsToShow
}: Props): ReactElement<HTMLElement> => (
  <div className="m-tnm-sidebar__filter-bar">
    <span className="m-tnm-sidebar__filter-header u-small-caps">Filter</span>

    <div className="c-mode-filter__filter-btn-group">
      {shouldShowModeButton("subway", modeButtonsToShow) && (
        <ModeButton
          mode="subway"
          icon="subway"
          name="Subway"
          isModeSelected={isModeSelected}
          onClick={mode => () => onModeClickAction(mode)}
        />
      )}
      {shouldShowModeButton("bus", modeButtonsToShow) && (
        <ModeButton
          mode="bus"
          icon="bus"
          name="Bus"
          isModeSelected={isModeSelected}
          onClick={mode => () => onModeClickAction(mode)}
        />
      )}
    </div>

    <div className="c-mode-filter__filter-btn-group">
      {shouldShowModeButton("commuter_rail", modeButtonsToShow) && (
        <ModeButton
          mode="commuter_rail"
          icon="commuter_rail"
          name="Rail"
          isModeSelected={isModeSelected}
          onClick={mode => () => onModeClickAction(mode)}
        />
      )}
      {shouldShowModeButton("ferry", modeButtonsToShow) && (
        <ModeButton
          mode="ferry"
          icon="ferry"
          name="Ferry"
          isModeSelected={isModeSelected}
          onClick={mode => () => onModeClickAction(mode)}
        />
      )}
    </div>
  </div>
);
