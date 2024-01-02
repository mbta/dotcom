import React, { ReactElement } from "react";
import { Mode } from "../../__v3api";
import { Dispatch, clickModeAction } from "../state";
import { ModeFilter } from "../../components/ModeFilter";

interface Props {
  selectedModes: Mode[];
  dispatch: Dispatch;
}

const ModeFilterContainer = ({
  selectedModes,
  dispatch
}: Props): ReactElement<HTMLElement> => {
  const isModeSelected = (mode: Mode): boolean => selectedModes.includes(mode);

  const handleModeClick = (mode: Mode): void => {
    const updatedModes = isModeSelected(mode)
      ? selectedModes.filter(existingMode => !(existingMode === mode))
      : [...selectedModes, mode];

    dispatch(clickModeAction(updatedModes));
  };

  return (
    <ModeFilter
      isModeSelected={isModeSelected}
      onModeClickAction={handleModeClick}
    />
  );
};

export default ModeFilterContainer;
