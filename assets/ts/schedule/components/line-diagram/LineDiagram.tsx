import React, { ReactElement, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateInLocation } from "use-query-params";
import { uniqBy } from "lodash";
import SearchBox from "../../../components/SearchBox";
import { stopForId, stopIds } from "../../../helpers/stop-tree";
import { isSubwayRoute } from "../../../models/route";
import { Alert, DirectionId, Route } from "../../../__v3api";
import { StoreProps } from "../../store/ScheduleStore";
import {
  IndexedRouteStop,
  RouteStop,
  SelectedOrigin,
  StopTree
} from "../__schedule";
import { createStopTreeCoordStore } from "./graphics/useTreeStopPositions";
import LineDiagramWithStops from "./LineDiagramWithStops";
import StopCard from "./StopCard";
import { alertsByStop } from "../../../models/alert";
import OtherStopList from "./OtherStopList";

interface Props {
  alerts: Alert[];
  directionId: DirectionId;
  otherRouteStops?: RouteStop[];
  route: Route;
  routeStopList: IndexedRouteStop[];
  stopTree: StopTree | null;
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

const LineDiagram = ({
  alerts,
  directionId,
  otherRouteStops = [],
  route,
  routeStopList,
  stopTree
}: Props): ReactElement<HTMLElement> => {
  const stopTreeCoordStore = stopTree
    ? createStopTreeCoordStore(stopTree)
    : createStopTreeCoordStore(routeStopList);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const currentState = useSelector((state: StoreProps) => state);

  const allStops: RouteStop[] = stopTree
    ? stopIds(stopTree).map(stopId => stopForId(stopTree, stopId))
    : routeStopList;
  const filteredStops: RouteStop[] = uniqBy(
    allStops.filter(stop =>
      stop.name.toLowerCase().includes(query.toLowerCase())
    ),
    rs => rs.id
  );
  const filteredOtherStops: RouteStop[] = uniqBy(
    otherRouteStops.filter(stop =>
      stop.name.toLowerCase().includes(query.toLowerCase())
    ),
    rs => rs.id
  );

  const changeOrigin = (origin: SelectedOrigin): void => {
    dispatch({
      type: "CHANGE_ORIGIN",
      newStoreValues: {
        selectedOrigin: origin
      }
    });
    // reopen modal depending on choice:
    dispatch({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: origin ? "schedule" : "origin"
      }
    });
  };

  const handleStopClick = (stop: RouteStop): void => {
    changeOrigin(stop.id);
    const { modalOpen: modalIsOpen, selectedOrigin } = currentState;

    updateURL(stop.id, directionId);

    if (selectedOrigin !== undefined && !modalIsOpen) {
      dispatch({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "schedule"
        }
      });
    }
  };

  return (
    <div className="mb-4">
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
        <>
          <ol className="m-schedule-diagram m-schedule-diagram--searched">
            {filteredStops.length ? (
              filteredStops.map((stop: RouteStop) => (
                <StopCard
                  alerts={alertsByStop(alerts, stop.id)}
                  key={stop.id}
                  onClick={handleStopClick}
                  routeStopList={routeStopList}
                  searchQuery={query}
                  stopId={stop.id}
                  stopTree={stopTree}
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
          <OtherStopList
            alerts={alerts}
            handleStopClick={handleStopClick}
            otherRouteStops={filteredOtherStops}
            searchQuery={query}
            stopTree={stopTree}
          />
        </>
      ) : (
        <Provider store={stopTreeCoordStore}>
          <LineDiagramWithStops
            alerts={alerts}
            directionId={directionId}
            handleStopClick={handleStopClick}
            otherRouteStops={otherRouteStops}
            route={route}
            routeStopList={routeStopList}
            stopTree={stopTree}
          />
        </Provider>
      )}
    </div>
  );
};

export default LineDiagram;
