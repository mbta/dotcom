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
import { createLineDiagramCoordStore } from "./graphics/graphic-helpers";
import { lineDiagramReducer } from "./reducer";
import { LiveDataByStop } from "./__line-diagram";
import ScheduleFinderModal from "../schedule-finder/ScheduleFinderModal";
import StopCard from "./StopCard";
import LineDiagramWithStops from "./LineDiagramWithStops";
import { getCurrentState, storeHandler } from "../../store/ScheduleStore";

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

const usePrevPropValue = (value: any) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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

  const prevLineDiagram = usePrevPropValue(lineDiagram)
  if (prevLineDiagram !== lineDiagram) console.log('LineDiagram. Prev: ', prevLineDiagram, 'New: ', lineDiagram)
  const prevroute = usePrevPropValue(route)
  if (prevroute !== route) console.log('route. Prev: ', prevroute, 'New: ', route)
  const prevdirectionId = usePrevPropValue(directionId)
  if (prevdirectionId !== directionId) console.log('directionId. Prev: ', prevdirectionId, 'New: ', directionId)
  const prevroutePatternsByDirection = usePrevPropValue(routePatternsByDirection)
  if (prevroutePatternsByDirection !== routePatternsByDirection) console.log('routePatternsByDirection. Prev: ', prevroutePatternsByDirection, 'New: ', routePatternsByDirection)
  const prevservices = usePrevPropValue(services)
  if (prevservices !== services) console.log('services. Prev: ', prevservices, 'New: ', services)
  const prevstops = usePrevPropValue(stops)
  if (prevstops !== stops) console.log('stops. Prev: ', prevstops, 'New: ', stops)
  const prevtoday = usePrevPropValue(today)
  if (prevtoday !== today) console.log('today. Prev: ', prevtoday, 'New: ', today)
  const prevscheduleNote = usePrevPropValue(scheduleNote)
  if (prevscheduleNote !== scheduleNote) console.log('scheduleNote. Prev: ', prevscheduleNote, 'New: ', scheduleNote)

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
    // eslint-disable-next-line camelcase
    "schedule_direction[direction_id]": StringParam,
    "schedule_direction[origin]": StringParam
  });

  React.useEffect(() => {
    console.log('use effect happened')
    const newDirection = query["schedule_direction[direction_id]"];
    const newOrigin = query["schedule_direction[origin]"];
    // modify values in case URL has both parameters:
    if (newDirection !== undefined && newOrigin !== undefined) {
      dispatch({
        type: "initialize",
        origin: newOrigin,
        direction: directionIdToNumber(newDirection)
      });
    }
  }, [query]);

  const updateURL = useCallback(
    (origin: SelectedOrigin, direction?: DirectionId): void => {
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
      window.location.reload();
      console.log('in updating url. Should be done!')
    }
  }, []
  );

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
      console.log('I think we updated by now')
    },
    [directionId]
  ); // only update function when stop or directionId changes

  // const handleStopClick = (stop: RouteStop): void => {
  //   const currentState = getCurrentState();
  //   const { modalOpen: modalIsOpen } = currentState;
  //   if (stop.id !== undefined && !modalIsOpen) {
  //     storeHandler({
  //       type: "OPEN_MODAL",
  //       newStoreValues: {
  //         modalMode: "schedule"
  //       }
  //     });
  //   }
  // }
  const handleOriginSelectClick = useCallback(
    (): void => {
    console.log('origin select click')
    dispatch({ type: "set_origin", origin: null });
    dispatch({ type: "toggle_modal", modalOpen: true });
  }, []
  );
  const directionChanged = useCallback(
    (direction: DirectionId): void => {
    console.log('direction changed')
    dispatch({ type: "set_direction", direction });
  }, []
  );
  const originChanged = useCallback(
    (origin: SelectedOrigin): void => {
    console.log('origin changed')
    dispatch({ type: "set_origin", origin });
  }, []
  );
  const closeModal = useCallback(
    (): void => {
    console.log('modal closed')
    dispatch({ type: "toggle_modal", modalOpen: false });
    // clear parameters from URL when closing the modal:
    updateURL("");
  }, []
  );

  /**
   * Provide a search box for filtering stops
   */
  const [stopQuery, setStopQuery, filteredStops] = useFilteredList(
    lineDiagram,
    "route_stop.name"
  );

  /**
   * Live data, including realtime vehicle locations and predictions
   * Available on all modes except ferry (route.type 4)
   */
  const liveUrl =
    route.type !== 4
      ? `/schedules/line_api/realtime?id=${route.id}&direction_id=${directionId}`
      : "";
  const { data: maybeLiveData } = useSWR(
    liveUrl,
    url => fetch(url).then(response => response.json()),
    { refreshInterval: 15000 }
  );
  const liveData = (maybeLiveData || {}) as LiveDataByStop;

  console.log('LineDiagram rerendering')
  const MemoizedModal = React.memo(ScheduleFinderModal)
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

      {/* {state.modalOpen && (
        <MemoizedModal
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
      )} */}
    </>
  );
};

export default LineDiagramAndStopListPage;
