import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { useQueryParams, StringParam } from "use-query-params";
import SchedulePage from "../components/SchedulePage";
import ScheduleNote from "../components/ScheduleNote";
import ScheduleDirection from "../components/ScheduleDirection";
import {
  SchedulePageData,
  SelectedStopId,
  ComponentToRender
} from "../components/__schedule";
import { MapData, StaticMapData } from "../../leaflet/components/__mapdata";
import ScheduleFinder from "../components/ScheduleFinder";
import ScheduleFinderModal from "../components/schedule-finder/ScheduleFinderModal";
import { DirectionId } from "../../__v3api";
import {
  mapStateToProps,
  getCurrentState,
  storeHandler
} from "../store/ScheduleStore";

interface Props {
  schedulePageData: SchedulePageData;
  component: ComponentToRender;
  updateURL: (origin: SelectedStopId, direction?: DirectionId) => void;
}

export const ScheduleLoader = ({
  component,
  schedulePageData,
  updateURL
}: Props): ReactElement<HTMLElement> => {
  const [query] = useQueryParams({
    // eslint-disable-next-line @typescript-eslint/camelcase
    "schedule_finder[direction_id]": StringParam,
    "schedule_finder[origin]": StringParam
  });

  const changeDirection = (direction: DirectionId): void => {
    storeHandler({
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: direction,
        selectedOrigin: null
      }
    });
  };

  const changeOrigin = (origin: SelectedStopId): void => {
    storeHandler({
      type: "CHANGE_ORIGIN",
      newStoreValues: {
        selectedOrigin: origin
      }
    });
    // reopen modal depending on choice:
    storeHandler({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: origin ? "schedule" : "origin"
      }
    });
  };

  const closeModal = (): void => {
    storeHandler({
      type: "CLOSE_MODAL",
      newStoreValues: {}
    });
    // clear parameters from URL when closing the modal:
    updateURL("");
  };

  React.useEffect(() => {
    // get initial values from the store:
    const currentState = getCurrentState();
    const { selectedDirection, selectedOrigin } = currentState;
    let { modalOpen, modalMode } = currentState;

    let newDirection: DirectionId | undefined;
    let newOrigin: SelectedStopId | undefined;

    // modify the store values in case URL has parameters:
    if (query["schedule_finder[direction_id]"] !== undefined) {
      newDirection = query["schedule_finder[direction_id]"] === "0" ? 0 : 1;
    }
    if (query["schedule_finder[origin]"] !== undefined) {
      newOrigin = query["schedule_finder[origin]"];
    }

    if (newDirection !== undefined && newOrigin !== undefined) {
      modalMode = "schedule";
      modalOpen = true;
    }

    storeHandler({
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection: newDirection || selectedDirection,
        selectedOrigin: newOrigin || selectedOrigin,
        modalMode,
        modalOpen
      }
    });
    // we disable linting in this next line because we DO want to specify an empty array since we want this piece to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOriginSelectClick = (): void => {
    storeHandler({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  };

  const {
    route,
    stops,
    services,
    route_patterns: routePatternsByDirection,
    schedule_note: scheduleNote,
    today,
    line_diagram: lineDiagram,
    shape_map: shapesById,
    variant: initialSelectedRoutePatternId
  } = schedulePageData;

  const currentState = getCurrentState();
  if (!!currentState && Object.keys(currentState).length !== 0) {
    const {
      selectedDirection: currentDirection,
      selectedOrigin,
      modalOpen,
      modalMode
    } = currentState;
    if (component === "MAIN") {
      return (
        <SchedulePage
          updateURL={updateURL}
          schedulePageData={schedulePageData}
          closeModal={closeModal}
          selectedDirection={currentDirection}
          changeDirection={changeDirection}
          selectedOrigin={selectedOrigin}
          changeOrigin={changeOrigin}
          modalOpen={modalOpen}
          modalMode={modalMode}
        />
      );
    }

    if (component === "SCHEDULE_NOTE" && scheduleNote) {
      return (
        <>
          <ScheduleNote
            className="m-schedule-page__schedule-notes--mobile"
            scheduleNote={scheduleNote}
          />
          {modalOpen && (
            <ScheduleFinderModal
              closeModal={closeModal}
              directionChanged={changeDirection}
              initialMode={modalMode}
              initialDirection={currentDirection}
              initialOrigin={selectedOrigin}
              handleOriginSelectClick={handleOriginSelectClick}
              originChanged={changeOrigin}
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
    }

    if (component === "SCHEDULE_FINDER") {
      return (
        <ScheduleFinder
          updateURL={updateURL}
          route={route}
          stops={stops}
          services={services}
          routePatternsByDirection={routePatternsByDirection}
          today={today}
          scheduleNote={null}
          modalMode={modalMode}
          modalOpen={modalOpen}
          directionId={currentDirection}
          changeDirection={changeDirection}
          selectedOrigin={selectedOrigin}
          changeOrigin={changeOrigin}
          closeModal={closeModal}
        />
      );
    }

    if (component === "SCHEDULE_DIRECTION") {
      let mapData: MapData | undefined;
      const mapDataEl = document.getElementById("js-map-data");
      if (mapDataEl) {
        mapData = JSON.parse(mapDataEl.innerHTML);
      }

      let staticMapData: StaticMapData | undefined;
      const staticDataEl = document.getElementById("static-map-data");
      if (staticDataEl) {
        staticMapData = JSON.parse(staticDataEl.innerHTML);
      }

      return (
        <ScheduleDirection
          directionId={currentDirection}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          shapesById={shapesById}
          mapData={mapData}
          staticMapData={staticMapData}
          lineDiagram={lineDiagram}
          services={services}
          stops={stops}
          today={today}
          scheduleNote={scheduleNote}
          initialSelectedRoutePatternId={initialSelectedRoutePatternId}
        />
      );
    }
  }
  return <></>;
};

export default connect(mapStateToProps)(ScheduleLoader);
