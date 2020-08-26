import React, { ReactElement, useReducer, useCallback } from "react";
import { Provider } from "react-redux";
import {
  useQueryParams,
  StringParam,
  updateInLocation
} from "use-query-params";
import useSWR from "swr";
import useFilteredList from "../../../hooks/useFilteredList";
import SearchBox from "../../../components/SearchBox";
import {
  LineDiagramStop,
  RoutePatternsByDirection,
  ScheduleNote as ScheduleNoteType,
  ServiceInSelector,
  SimpleStopMap,
  SelectedOrigin,
  RouteStop
} from "../__schedule";
import { DirectionId, Route } from "../../../__v3api";
import {
  createLineDiagramCoordStore
} from "./graphics/graphic-helpers";
import { lineDiagramReducer } from "./reducer";
import { LiveDataByStop } from "./__line-diagram";
import ScheduleFinderModal from "../schedule-finder/ScheduleFinderModal";
import StopCard from "./StopCard";
import LineDiagramWithStops from "./LineDiagramWithStops";

interface LineDiagramProps {
  lineDiagram: LineDiagramStop[];
  route: Route;
  directionId: DirectionId;
  routePatternsByDirection: RoutePatternsByDirection;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
  scheduleNote: ScheduleNoteType | null;
}

const stationsOrStops = (routeType: number): string =>
  [0, 1, 2].includes(routeType) ? "Stations" : "Stops";

const directionIdToNumber = (direction: string): DirectionId =>
  direction === "0" ? 0 : 1;

const reversedDirectionId = (direction: DirectionId): DirectionId =>
  direction === 0 ? 1 : 0;

const LineDiagramAndStopListPage = ({
  lineDiagram,
  route,
  directionId,
  routePatternsByDirection,
  services,
  stops,
  today,
  scheduleNote
}: LineDiagramProps): ReactElement<HTMLElement> | null => {
  /**
   * Setup state handling etc
   */
  const [state, dispatch] = useReducer(lineDiagramReducer, {
    direction: directionId,
    origin: lineDiagram[0].route_stop.id,
    modalMode: "schedule",
    modalOpen: false
  });

  // also track the location of text to align the diagram points to
  const lineDiagramCoordStore = createLineDiagramCoordStore(lineDiagram);

  /**
   * Handle URL params
   */
  const [query] = useQueryParams({
    // eslint-disable-next-line @typescript-eslint/camelcase
    "schedule_direction[direction_id]": StringParam,
    "schedule_direction[origin]": StringParam
  });

  React.useEffect(
    () => {
      const newDirection = query["schedule_direction[direction_id]"];
      const newOrigin = query["schedule_direction[origin]"];
      // modify values in case URL either parameters:
      if (newDirection !== undefined && newOrigin !== undefined) {
        dispatch({
          type: "initialize",
          origin: newOrigin,
          direction: directionIdToNumber(newDirection)
        });
      }
    },
    [query]
  );
  const updateURL = (origin: SelectedOrigin, direction?: DirectionId): void => {
    if (window) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const newQuery = {
        "schedule_direction[direction_id]":
          direction !== undefined ? direction.toString() : "",
        "schedule_direction[origin]": origin
      };
      const newLoc = updateInLocation(newQuery, window.location);
      // newLoc is not a true Location, so toString doesn't work
      window.history.replaceState({}, "", `${newLoc.pathname}${newLoc.search}`);
    }
  };

  /**
   * Events - clicking a stop, changing various params for the resulting modal
   */
  const handleStopClick = useCallback(
    (stop: RouteStop): void => {
      const { "is_beginning?": isBeginning, "is_terminus?": isTerminus } = stop;
      const isDestination = isTerminus && !isBeginning;
      const direction = isDestination
        ? reversedDirectionId(directionId)
        : directionId;
      dispatch({ type: "initialize", origin: stop.id, direction });
      // modify URL:
      updateURL(stop.id, directionId);
    },
    [directionId]
  ); // only update function when stop or directionId changes
  const handleOriginSelectClick = (): void => {
    dispatch({ type: "set_origin", origin: null });
    dispatch({ type: "toggle_modal", modalOpen: true });
  };
  const directionChanged = (direction: DirectionId): void => {
    dispatch({ type: "set_direction", direction });
  };
  const originChanged = (origin: SelectedOrigin): void => {
    dispatch({ type: "set_origin", origin });
  };
  const closeModal = (): void => {
    dispatch({ type: "toggle_modal", modalOpen: false });
    // clear parameters from URL when closing the modal:
    updateURL("");
  };

  /**
   * Provide a search box for filtering stops
   */
  const [stopQuery, setStopQuery, filteredStops] = useFilteredList(
    lineDiagram,
    "route_stop.name"
  );

  /**
   * Live data, including realtime vehicle locations and predictions
   */
  const { data: maybeLiveData } = useSWR(
    `/schedules/line_api/realtime?id=${route.id}&direction_id=${directionId}`,
    url => fetch(url).then(response => response.json()),
    { refreshInterval: 15000 }
  );
  const liveData = (maybeLiveData || {}) as LiveDataByStop;

  /**
   * Putting it all together
   */
  return (
    <>
      <h3 className="m-schedule-diagram__heading">
        {stationsOrStops(route.type)}
      </h3>
      <SearchBox
        id="stop-search"
        labelText={`Search for a ${stationsOrStops(route.type)
          .toLowerCase()
          .slice(0, -1)}`}
        onChange={setStopQuery}
        className="m-schedule-diagram__filter"
      />
      {stopQuery !== "" ? (
        <ol className="m-schedule-diagram m-schedule-diagram--searched">
          {filteredStops.length ? (
            (filteredStops as LineDiagramStop[]).map(
              (stop: LineDiagramStop) => (
                <StopCard
                  key={stop.route_stop.id}
                  stop={stop}
                  onClick={handleStopClick}
                  liveData={liveData[stop.route_stop.id]}
                  searchQuery={stopQuery}
                />
              )
            )
          ) : (
            <div className="c-alert-item c-alert-item--low c-alert-item__top-text-container">
              No stops {route.direction_names[directionId]} to{" "}
              {route.direction_destinations[directionId]} matching{" "}
              <b className="u-highlight">{stopQuery}</b>. Try changing your
              direction or adjusting your search.
            </div>
          )}
        </ol>
      ) : (
        <Provider store={lineDiagramCoordStore}>
          <LineDiagramWithStops
            stops={lineDiagram}
            handleStopClick={handleStopClick}
            liveData={liveData}
          />
        </Provider>
      )}

      {state.modalOpen && (
        <ScheduleFinderModal
          closeModal={closeModal}
          initialMode={state.modalMode}
          initialDirection={state.direction}
          initialOrigin={state.origin}
          handleOriginSelectClick={handleOriginSelectClick}
          directionChanged={directionChanged}
          originChanged={originChanged}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          scheduleNote={scheduleNote}
          services={services}
          stops={stops}
          today={today}
          updateURL={updateURL}
        />
      )}
    </>
  );
};

export default LineDiagramAndStopListPage;
