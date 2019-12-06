import React, { ReactElement, useState, useEffect } from "react";
import { MaybeDirectionId } from "./__shuttles";
import { DirectionInfo } from "../../__v3api";

interface Props {
  places: DirectionInfo;
  onClick: (directionId: MaybeDirectionId) => void;
}

const DirectionButtons: React.FC<Props> = ({
  places,
  onClick
}: Props): ReactElement<HTMLElement> => {
  const [selectedDirectionId, setSelectedDirectionId] = useState<
    MaybeDirectionId
  >(null);

  useEffect(
    () => {
      onClick(selectedDirectionId);
    },
    [onClick, selectedDirectionId]
  );

  const DirectionButton = (
    directionId: MaybeDirectionId,
    headsign: string
  ): JSX.Element => (
    <button
      key={`${headsign}`}
      type="button"
      className={`btn btn-secondary btn-sm c-btn-group-stackable__btn ${selectedDirectionId ===
        directionId && "c-btn-group-stackable__btn--active"}`}
      onClick={() => {
        setSelectedDirectionId(directionId);
      }}
    >
      {headsign}
    </button>
  );

  return (
    <div
      className="c-btn-group-stackable"
      role="group"
      aria-label="Filter shuttle map by direction"
    >
      {DirectionButton(null, "All Directions")}
      {Object.entries(places)
        .sort()
        .map(([directionId, headsign]) =>
          DirectionButton(
            parseInt(directionId, 10) as MaybeDirectionId,
            headsign
          )
        )}
    </div>
  );
};

export default DirectionButtons;
