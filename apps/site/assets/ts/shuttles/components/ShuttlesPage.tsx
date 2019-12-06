import React, { ReactElement, useState } from "react";
import ShuttlesMap from "./ShuttlesMap";
import DirectionButtons from "./DirectionButtons";
import StopDropdown from "./StopDropdown";
import { Route } from "../../__v3api";
import { Diversion, MaybeDirectionId, Shape, Stop } from "./__shuttles";
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

  const [displayedShapes, setDisplayedShapes] = useState(initialShapes);
  const [displayedStops, setDisplayedStops] = useState(initialStops);
  const [selectedStop, setSelectedStop] = useState(
    initialStops.sort().filter(s => s.type === "rail_affected")[0]
  );

  const shapesByDirection = (
    directionId: MaybeDirectionId
  ): ((shape: Shape) => boolean) => (shape: Shape): boolean =>
    directionId !== null ? shape.direction_id === directionId : true;
  const stopsByDirection = (
    directionId: MaybeDirectionId
  ): ((stop: Stop) => boolean) => (stop: Stop): boolean =>
    directionId !== null
      ? stop.direction_id === directionId || stop.direction_id === null
      : true;

  const filterMap = (directionId: MaybeDirectionId): void => {
    setDisplayedShapes(initialShapes.filter(shapesByDirection(directionId)));
    setDisplayedStops(initialStops.filter(stopsByDirection(directionId)));
  };

  return (
    <div className="shuttles__main">
      <h2>Shuttle Maps</h2>

      <DirectionButtons places={places} onClick={filterMap} />

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
