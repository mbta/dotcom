import React, { ReactElement, useState, useEffect } from "react";
import ShuttlesMap from "./ShuttlesMap";
import StopDropdown from "./StopDropdown";
import { Route } from "../../__v3api";
import { Diversion, MaybeDirectionId } from "./__shuttles";
import { TileServerUrl } from "../../leaflet/components/__mapdata";

interface Props {
  route: Route;
  diversions: Diversion;
  tileServerUrl: TileServerUrl;
}

const ShuttlesPage: React.FC<Props> = ({
  route,
  diversions,
  tileServerUrl
}: Props): ReactElement<HTMLElement> => {
  const places =
    route.id === "Green" ? route.direction_names : route.direction_destinations;
  const initialShapes = [...diversions.shapes].map(shape => ({
    color: route.color,
    ...shape
  }));
  const initialStops = [...diversions.stops].map(stop => ({
    headsign:
      stop.direction_id === null ? "All Directions" : places[stop.direction_id],
    ...stop
  }));
  const [selectedDirectionId, setSelectedDirectionId] = useState<
    MaybeDirectionId
  >(null);
  const [displayedShapes, setDisplayedShapes] = useState(initialShapes);
  const [displayedStops, setDisplayedStops] = useState(initialStops);
  const [selectedStop, setSelectedStop] = useState(
    initialStops.sort().filter(s => s.type === "rail_affected")[0]
  );

  const filterMap = (): void => {
    if (selectedDirectionId === null) {
      setDisplayedShapes(initialShapes);
      setDisplayedStops(initialStops);
    } else {
      setDisplayedShapes(
        initialShapes.filter(
          shape => shape.direction_id === selectedDirectionId
        )
      );
      setDisplayedStops(
        initialStops.filter(
          stop =>
            stop.direction_id === selectedDirectionId ||
            stop.direction_id === null
        )
      );
    }
  };

  useEffect(filterMap, [selectedDirectionId]);

  const DirectionButton = (
    directionId: MaybeDirectionId,
    headsign: string
  ): JSX.Element => (
    <button
      key={`${headsign}`}
      type="button"
      className={`btn btn-secondary btn-sm c-btn-group-stackable__btn ${selectedDirectionId ===
        directionId && "c-btn-group-stackable__btn--active"}`}
      onClick={() => setSelectedDirectionId(directionId)}
    >
      {headsign}
    </button>
  );

  return (
    <div className="shuttles__main">
      <h2>Shuttle Maps</h2>

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

      <ShuttlesMap
        tileServerUrl={tileServerUrl}
        shapes={displayedShapes}
        stops={displayedStops}
      />

      <div className="c-heading-with-control">
        <h3>Stop Detail</h3>

        <StopDropdown
          stops={diversions.stops
            .sort()
            .filter(stop => stop.type === "rail_affected")}
          onSelect={setSelectedStop}
        />
      </div>
      <ShuttlesMap
        tileServerUrl={tileServerUrl}
        shapes={displayedShapes}
        stops={displayedStops}
        centerStop={selectedStop}
      />
    </div>
  );
};

export default ShuttlesPage;
