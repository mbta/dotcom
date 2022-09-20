import { isEmpty } from "lodash";
import { Provider } from "react-redux";
import React, { ReactElement, useReducer } from "react";
import ReactDOM from "react-dom";
import { updateInLocation } from "use-query-params";
import ScheduleLoader from "../components/ScheduleLoader";
import { SchedulePageData, SelectedOrigin } from "../components/__schedule";
import { store } from "../store/ScheduleStore";
import { createReducer, initializeState, StateContext } from "./state";

const updateURL = (origin: SelectedOrigin): void => {
  if (window) {
    // eslint-disable-next-line camelcase
    const newQuery = {
      "schedule_finder[origin]": origin
    };
    const newLoc = updateInLocation(newQuery, window.location);
    // newLoc is not a true Location, so toString doesn't work
    window.history.replaceState({}, "", `${newLoc.pathname}${newLoc.search}`);
  }
};

const renderDirectionAndMap = (
  staticData: SchedulePageData,
  root: HTMLElement
): React.ReactPortal =>
  ReactDOM.createPortal(
    <ScheduleLoader
      component="SCHEDULE_DIRECTION"
      schedulePageData={staticData}
      updateURL={updateURL}
    />,
    root
  );

const renderDirectionOrMap = (
  staticData: SchedulePageData
): React.ReactPortal | null => {
  if (isEmpty(staticData.route_patterns)) {
    return null;
  }

  const root = document.getElementById("react-schedule-direction-root");
  if (!root) {
    throw new Error("todo");
    // return renderMap(staticData);
  }

  return renderDirectionAndMap(staticData, root);
};

export const renderAdditionalLineInformation = (
  schedulePageData: SchedulePageData
): React.ReactPortal[] => {
  const { schedule_note: scheduleNote } = schedulePageData;

  const portals = [];
  portals.push(
    ReactDOM.createPortal(
      <ScheduleLoader
        component="ADDITIONAL_LINE_INFORMATION"
        schedulePageData={schedulePageData}
        updateURL={updateURL}
      />,
      document.getElementById("react-root")!
    )
  );

  // don't show Schedule Finder for subway
  if (scheduleNote) {
    portals.push(
      ReactDOM.createPortal(
        <ScheduleLoader
          component="SCHEDULE_NOTE"
          schedulePageData={schedulePageData}
          updateURL={updateURL}
        />,
        document.getElementById("react-schedule-note-root")!
      )
    );
  } else {
    const scheduleFinderRoot = document.getElementById(
      "react-schedule-finder-root"
    );
    if (scheduleFinderRoot) {
      portals.push(
        ReactDOM.createPortal(
          <ScheduleLoader
            component="SCHEDULE_FINDER"
            schedulePageData={schedulePageData}
            updateURL={updateURL}
          />,
          scheduleFinderRoot
        )
      );
    }
  }

  return portals;
};

const TopLevel = ({
  staticData
}: {
  staticData: SchedulePageData;
}): ReactElement<HTMLElement> => {
  const {
    direction_id: directionId,
    route_patterns: routePatterns
  } = staticData;

  const initialState = initializeState(directionId, routePatterns);
  const [state, dispatch] = useReducer(createReducer(staticData), initialState);
  const ctx = { state, dispatch };

  return (
    <Provider store={store}>
      <StateContext.Provider value={ctx}>
        {renderDirectionOrMap(staticData)}
        {...renderAdditionalLineInformation(staticData)}
      </StateContext.Provider>
    </Provider>
  );
};

export const initialize = (): void => {
  const schedulePageDataEl = document.getElementById("js-schedule-page-data");
  if (!schedulePageDataEl) {
    throw new Error("Missing schedule page data");
  }

  const schedulePageData = JSON.parse(
    schedulePageDataEl.innerHTML
  ) as SchedulePageData;

  // create DOM element to render into, but don't attach it to the real
  // document. The actual visible elements are rendered using portals
  const target = document.createElement("div");

  ReactDOM.render(<TopLevel staticData={schedulePageData} />, target);
};
