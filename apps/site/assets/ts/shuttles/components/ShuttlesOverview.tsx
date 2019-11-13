import React, { ReactElement, useState, useEffect } from "react";

interface Props {
  places: {
    0: string;
    1: string;
  };
}

const ShuttlesOverview = ({ places }: Props): ReactElement<HTMLElement> => {
  const [selectedDirectionId, setSelectedDirectionId] = useState("");
  useEffect(() => {}, [selectedDirectionId]); // placeholder function, update map here

  const DirectionButton = (
    directionId: string,
    headsign: string
  ): JSX.Element => (
    <button
      key={`${headsign}`}
      type="button"
      className={`btn btn-secondary btn-sm ${
        selectedDirectionId === directionId
          ? "c-btn-group-stackable__btn c-btn-group-stackable__btn--active"
          : "c-btn-group-stackable__btn"
      }`}
      onClick={() => setSelectedDirectionId(directionId)}
    >
      {headsign}
    </button>
  );

  return (
    <>
      <div
        className="c-btn-group-stackable"
        role="group"
        aria-label="Filter shuttle map by direction"
      >
        {DirectionButton("", "All Directions")}
        {Object.entries(places)
          .sort()
          .map(([directionId, headsign]) =>
            DirectionButton(directionId, headsign)
          )}
      </div>
      <div>Map1 {selectedDirectionId} </div>
    </>
  );
};

export default ShuttlesOverview;
