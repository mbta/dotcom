import React, { ReactElement, useState } from "react";
import { Provider } from "react-redux";
import { updateInLocation } from "use-query-params";
import SearchBox from "../../../components/SearchBox";
import { stopForId, stopIds } from "../../../helpers/stop-tree";
import useRealtime from "../../../hooks/useRealtime";
import { isSubwayRoute } from "../../../models/route";
import { Alert, DirectionId, Route } from "../../../__v3api";
import { getCurrentState, storeHandler } from "../../store/ScheduleStore";
import { changeOrigin } from "../ScheduleLoader";
import { RouteStop, SelectedOrigin, StopTree } from "../__schedule";
import { createStopTreeCoordStore } from "./graphics/useTreeStopPositions";
import TreeLineDiagramWithStops from "./TreeLineDiagramWithStops";
import TreeStopCard from "./TreeStopCard";

interface Props {
  stopTree: StopTree;
  route: Route;
  directionId: DirectionId;
  alerts: Alert[];
}

const stationsOrStops = (routeType: number): string =>
  [0, 1, 2].includes(routeType) ? "Stations" : "Stops";

const updateURL = (origin: SelectedOrigin, direction?: DirectionId): void => {
  /* istanbul ignore else */
  if (window) {
    // eslint-disable-next-line camelcase
    const newQuery = {
      "schedule_finder[direction_id]":
        direction !== undefined ? direction.toString() : "",
      "schedule_finder[origin]": origin
    };
    const newLoc = updateInLocation(newQuery, window.location);
    // newLoc is not a true Location, so toString doesn't work
    window.history.replaceState({}, "", `${newLoc.pathname}${newLoc.search}`);
  }
};

const TreeLineDiagram = ({
  stopTree,
  route,
  directionId,
  alerts
}: Props): ReactElement<HTMLElement> => {
  const stopTreeCoordStore = createStopTreeCoordStore(stopTree);
  const liveData = useRealtime(route, directionId, true);
  const [query, setQuery] = useState("");

  const allStops: RouteStop[] = stopIds(stopTree).map(stopId =>
    stopForId(stopTree, stopId)
  );
  const filteredStops: RouteStop[] = allStops.filter(stop =>
    stop.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleStopClick = (stop: RouteStop): void => {
    changeOrigin(stop.id);

    const currentState = getCurrentState();
    const { modalOpen: modalIsOpen } = currentState;

    updateURL(stop.id, directionId);

    if (currentState.selectedOrigin !== undefined && !modalIsOpen) {
      storeHandler({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "schedule"
        }
      });
    }
  };

  return (
    <>
      {!isSubwayRoute(route) && (
        <h3 className="m-schedule-diagram__heading">
          {stationsOrStops(route.type)}
        </h3>
      )}
      <SearchBox
        id="stop-search"
        labelText={`Search for a ${stationsOrStops(route.type)
          .toLowerCase()
          .slice(0, -1)}`}
        onChange={setQuery}
        className="m-schedule-diagram__filter"
      />
      {query !== "" ? (
        <ol className="m-schedule-diagram m-schedule-diagram--searched">
          {filteredStops.length ? (
            filteredStops.map((stop: RouteStop) => (
              <TreeStopCard
                key={stop.id}
                stopTree={stopTree}
                stopId={stop.id}
                alerts={alerts}
                onClick={handleStopClick}
                liveData={liveData?.[stop.id]}
                searchQuery={query}
              />
            ))
          ) : (
            <div className="c-alert-item c-alert-item--low c-alert-item__top-text-container">
              No stops {route.direction_names[directionId]} to{" "}
              {route.direction_destinations[directionId]} matching{" "}
              <b className="u-highlight">{query}</b>. Try changing your
              direction or adjusting your search.
            </div>
          )}
        </ol>
      ) : (
        <Provider store={stopTreeCoordStore}>
          <TreeLineDiagramWithStops
            stopTree={stopTree}
            route={route}
            directionId={directionId}
            alerts={alerts}
            handleStopClick={handleStopClick}
            liveData={liveData}
          />
        </Provider>
      )}
    </>
  );
};

export default TreeLineDiagram;
