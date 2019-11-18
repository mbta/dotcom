import React, { ReactElement, useState, useEffect } from "react";
import ShuttlesMap from "./ShuttlesMap";
import StationDropdown from "./StationDropdown";
import { Route } from "../../__v3api";
import { Coordinates, Diversion, MaybeDirectionId } from "./__shuttles";

interface Props {
  route: Route;
  diversions: Diversion;
}

const ShuttlesPage = ({
  route,
  diversions
}: Props): ReactElement<HTMLElement> => {
  const places =
    route.id === "Green" ? route.direction_names : route.direction_destinations;

  const [selectedDirectionId, setSelectedDirectionId] = useState<
    MaybeDirectionId
  >(null);
  const [displayedShapes, setDisplayedShapes] = useState([
    ...diversions.shapes
  ]);
  const [displayedStops, setDisplayedStops] = useState([...diversions.stops]);
  const [mapCenter, setMapCenter] = useState<Coordinates>();

  useEffect(
    () => {
      if (selectedDirectionId === null) {
        setDisplayedShapes([...diversions.shapes]);
        setDisplayedStops([...diversions.stops]);
      } else {
        setDisplayedShapes(
          diversions.shapes.filter(
            shape => shape.direction_id === selectedDirectionId
          )
        );
        setDisplayedStops(
          diversions.stops.filter(
            stop =>
              stop.direction_id === selectedDirectionId ||
              stop.direction_id === null
          )
        );
      }
    },
    [diversions, selectedDirectionId]
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
      onClick={() => setSelectedDirectionId(directionId)}
    >
      {headsign}
    </button>
  );

  const centerMapOnStation = (stationId: string): void => {
    const station = diversions.stops.find(stop => stop.id === stationId);
    if (station) {
      setMapCenter({
        longitude: station.longitude,
        latitude: station.latitude
      });
    }
  };

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

      <ShuttlesMap shapes={displayedShapes} stops={displayedStops} />

      <div className="c-heading-with-control">
        <h3>Station Detail</h3>

        <StationDropdown
          stations={diversions.stops
            .sort()
            .filter(stop => stop.type === "rail_affected")}
          onSelect={centerMapOnStation}
        />
      </div>
      <ShuttlesMap
        shapes={displayedShapes}
        stops={displayedStops}
        center={mapCenter}
      />
    </div>
  );
};

export default ShuttlesPage;
