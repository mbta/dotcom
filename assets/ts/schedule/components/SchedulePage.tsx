import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  useQueryParams,
  StringParam,
  updateInLocation
} from "use-query-params";
import ContentTeasers from "./ContentTeasers";
import UpcomingHolidays from "./UpcomingHolidays";
import AdditionalLineInfo from "./AdditionalLineInfo";
import ScheduleDirection from "./ScheduleDirection";
import {
  SchedulePageData,
  SelectedOrigin,
  StopTree,
  StopTreeData
} from "./__schedule";
import { MapData, StaticMapData } from "../../leaflet/components/__mapdata";
import ScheduleFinder from "./ScheduleFinder";
import ScheduleFinderModal from "./schedule-finder/ScheduleFinderModal";
import { DirectionId, Route } from "../../__v3api";
import { StoreProps } from "../store/ScheduleStore";
import { isFerryRoute, isSubwayRoute } from "../../models/route";
import HoursOfOperation from "./HoursOfOperation";
import useDirectionChangeEvent from "../../hooks/useDirectionChangeEvent";
import { isTripSpecific } from "../../models/alert";

const updateURL = (origin: SelectedOrigin, direction?: DirectionId): void => {
  /* istanbul ignore else  */
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

export const fromStopTreeData = (stopTreeData: StopTreeData): StopTree => ({
  byId: stopTreeData.by_id,
  edges: stopTreeData.edges,
  startingNodes: stopTreeData.starting_nodes
});

export const changeOrigin = (
  origin: SelectedOrigin,
  dispatch: Dispatch
): void => {
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

export const changeDirection = (
  direction: DirectionId,
  dispatch: Dispatch
): void => {
  dispatch({
    type: "CHANGE_DIRECTION",
    newStoreValues: {
      selectedDirection: direction,
      selectedOrigin: null
    }
  });
};

const closeModal = (dispatch: Dispatch): void => {
  dispatch({
    type: "CLOSE_MODAL",
    newStoreValues: {}
  });
  // clear parameters from URL when closing the modal:
  updateURL("");
};

export const handleOriginSelectClick = (dispatch: Dispatch): void => {
  dispatch({
    type: "OPEN_MODAL",
    newStoreValues: {
      modalMode: "origin"
    }
  });
};

const getDirectionAndMap = (
  schedulePageData: SchedulePageData,
  mapData: MapData,
  staticMapData: StaticMapData | undefined,
  directionId: DirectionId
): JSX.Element => {
  const {
    route,
    stops,
    route_patterns: routePatternsByDirection,
    services,
    today,
    schedule_note: scheduleNote,
    route_stop_lists: routeStopLists,
    "service_today?": hasServiceToday,
    stop_tree: stopTree,
    alerts,
    variant: busVariantId
  } = schedulePageData;
  const maybeStopTree: StopTree | null = stopTree
    ? fromStopTreeData(stopTree)
    : null;

  return isFerryRoute(route) ? (
    <>
      <ScheduleFinder
        updateURL={updateURL}
        route={route}
        stops={stops}
        services={services}
        routePatternsByDirection={routePatternsByDirection}
        today={today}
        hasServiceToday={hasServiceToday}
        directionId={directionId}
        changeDirection={changeDirection}
        changeOrigin={changeOrigin}
        closeModal={closeModal}
        scheduleNote={scheduleNote}
      />
      <div className="schedule-map-container">
        <h2>Route Map</h2>
        {staticMapData && (
          <>
            <img
              src={staticMapData.img_src}
              alt={`${route.name} route map`}
              className="img-fluid"
            />
            <a
              href={staticMapData.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-search-plus" aria-hidden="true" />
              View map as a PDF
            </a>
          </>
        )}
      </div>
    </>
  ) : (
    <ScheduleDirection
      directionId={directionId}
      route={route}
      routePatternsByDirection={routePatternsByDirection}
      routeStopLists={routeStopLists}
      mapData={mapData}
      staticMapData={staticMapData}
      stopTree={maybeStopTree}
      alerts={alerts.filter(alert => !isTripSpecific(alert))}
      busVariantId={busVariantId}
    />
  );
};

const getScheduleFinder = (
  schedulePageData: SchedulePageData,
  directionId: DirectionId
): JSX.Element | undefined => {
  const {
    route,
    stops,
    services,
    route_patterns: routePatternsByDirection,
    today,
    "service_today?": hasServiceToday,
    schedule_note: scheduleNote
  } = schedulePageData;
  return (
    <ScheduleFinder
      updateURL={updateURL}
      route={route}
      stops={stops}
      services={services}
      routePatternsByDirection={routePatternsByDirection}
      today={today}
      directionId={directionId}
      changeDirection={changeDirection}
      changeOrigin={changeOrigin}
      closeModal={closeModal}
      scheduleNote={scheduleNote}
      hasServiceToday={hasServiceToday}
    />
  );
};

const ScheduleNote = ({
  schedulePageData,
  directionId,
  modalOpen
}: {
  schedulePageData: SchedulePageData;
  directionId: DirectionId;
  modalOpen: boolean;
}): JSX.Element => {
  const {
    pdfs,
    hours,
    route,
    schedule_note: scheduleNote,
    route_patterns: routePatternsByDirection,
    today,
    "service_today?": hasServiceToday,
    services,
    stops
  } = schedulePageData;

  const currentDirection = useDirectionChangeEvent(directionId);

  return (
    <>
      <HoursOfOperation
        route={route}
        pdfs={pdfs}
        hours={hours}
        scheduleNote={scheduleNote}
      />
      {modalOpen && (
        <ScheduleFinderModal
          closeModal={closeModal}
          directionChanged={changeDirection}
          initialDirection={currentDirection}
          handleOriginSelectClick={handleOriginSelectClick}
          originChanged={changeOrigin}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          services={services}
          stops={stops}
          today={today}
          hasServiceToday={hasServiceToday}
          updateURL={updateURL}
          scheduleNote={scheduleNote}
        />
      )}
    </>
  );
};

const getAdditionalLineInfo = (
  schedulePageData: SchedulePageData,
  routeIsSuspended: boolean
): JSX.Element => {
  const {
    route,
    schedule_note: scheduleNote,
    teasers,
    pdfs,
    connections,
    fares,
    fare_link: fareLink,
    holidays,
    hours
  } = schedulePageData;

  if (routeIsSuspended) {
    return (
      <>
        <ContentTeasers teasers={teasers} />
        <UpcomingHolidays holidays={holidays} />
      </>
    );
  }

  return (
    <AdditionalLineInfo
      teasers={teasers}
      pdfs={pdfs}
      connections={connections}
      fares={fares}
      fareLink={fareLink}
      route={route}
      holidays={holidays}
      hours={hours}
      scheduleNote={scheduleNote}
    />
  );
};

const getPageTitle = (route: Route): string | null => {
  switch (route.type) {
    case 0:
    case 1:
      return "Stations & Departures";
    case 4:
      return null;
    case 2:
    default:
      return "Schedules & Maps";
  }
};

interface SchedulePageProps {
  schedulePageData: SchedulePageData;
  noBranches: boolean;
  mapData: MapData;
  staticMapData?: StaticMapData;
}

export const SchedulePage = ({
  schedulePageData,
  noBranches,
  mapData,
  staticMapData
}: SchedulePageProps): JSX.Element => {
  const dispatch = useDispatch();
  const { route, route_patterns: routePatternsByDirection } = schedulePageData;

  const routeIsSuspended = Object.keys(routePatternsByDirection).length === 0;

  const [query] = useQueryParams({
    // eslint-disable-next-line camelcase
    "schedule_finder[direction_id]": StringParam,
    "schedule_direction[direction_id]": StringParam,
    "schedule_finder[origin]": StringParam
  });

  const currentState = useSelector((state: StoreProps) => state);

  useEffect(() => {
    // get initial values from the store:
    const { selectedDirection, selectedOrigin } = currentState;
    let { modalOpen, modalMode } = currentState;

    let newDirection: DirectionId | undefined;
    const newOrigin: SelectedOrigin | undefined =
      query["schedule_finder[origin]"];

    // modify the store values in case URL has parameters:
    const queryDirectionId =
      query["schedule_finder[direction_id]"] ||
      query["schedule_direction[direction_id]"];
    if (queryDirectionId !== undefined) {
      newDirection = queryDirectionId === "0" ? 0 : 1;
    }

    if (newDirection !== undefined && newOrigin !== undefined) {
      modalMode = "schedule";
      modalOpen = true;
    }

    dispatch({
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection:
          newDirection !== undefined ? newDirection : selectedDirection,
        selectedOrigin: newOrigin || selectedOrigin,
        modalMode,
        modalOpen
      }
    });
    // we disable linting in this next line because we DO want to specify an empty array since we want this piece to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offset = noBranches
    ? "col-md-offset-7 col-lg-offset-8"
    : "col-lg-offset-1";
  const ferry = isFerryRoute(route) ? "ferry" : "";
  const title = getPageTitle(route);
  if (!!currentState && Object.keys(currentState).length !== 0) {
    const {
      selectedDirection: currentDirection,
      selectedOrigin
    } = currentState;

    // check first if this is a unidirectional route:
    let readjustedDirectionId: DirectionId = currentDirection;
    if (
      !routeIsSuspended &&
      !Object.keys(routePatternsByDirection).includes(
        currentDirection.toString()
      )
    ) {
      // This route doesn't have this direction, so pick first existing direction
      readjustedDirectionId = parseInt(
        Object.keys(routePatternsByDirection)[0],
        10
      ) as DirectionId;
      changeDirection(readjustedDirectionId, dispatch);
      updateURL(selectedOrigin, readjustedDirectionId);
    }

    return (
      <>
        {!noBranches && (
          <div className="col-md-7 m-schedule-page__main-content">
            <div className={`m-schedule-line__main-content ${ferry}`}>
              {title && <h2>{title}</h2>}
              <div>
                {getDirectionAndMap(
                  schedulePageData,
                  mapData,
                  staticMapData,
                  readjustedDirectionId
                )}
              </div>
            </div>
          </div>
        )}
        <div
          className={`col-md-5 col-lg-4 ${offset} m-schedule-page__schedule-finder-or-note`}
        >
          {isSubwayRoute(route) && schedulePageData.schedule_note !== null && (
            <ScheduleNote
              schedulePageData={schedulePageData}
              directionId={readjustedDirectionId}
              modalOpen={currentState.modalOpen}
            />
          )}
          {schedulePageData.schedule_note === null &&
            !isFerryRoute(route) &&
            getScheduleFinder(schedulePageData, readjustedDirectionId)}
        </div>
        <div
          className={`col-md-5 col-lg-4 ${offset} m-schedule-page__side-content`}
        >
          <div className="m-schedule-line__side-content">
            {getAdditionalLineInfo(schedulePageData, routeIsSuspended)}
          </div>
        </div>
      </>
    );
  }
  return <></>;
};
