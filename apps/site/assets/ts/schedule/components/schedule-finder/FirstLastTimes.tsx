import React, { ReactElement, useReducer, useEffect } from "react";
import { SelectedDirection, SelectedOrigin } from "../ScheduleFinder";
import { reducer } from "../../../helpers/fetch";
import { shortTime } from "../../../helpers/date";

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: [] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

// First and last departures for two sets of services
const fetchData = (
  routeId: string,
  selectedOrigin: SelectedOrigin,
  selectedDirection: SelectedDirection,
  dispatch: (action: fetchAction) => void
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/schedule_api/hours?stop=${selectedOrigin}&route=${routeId}&direction=${selectedDirection}`
      )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

interface Props {
  routeId: string;
  selectedOrigin: SelectedOrigin;
  selectedDirection: SelectedDirection;
}

// TODO Add tests
const FirstLastTimes = ({
  routeId,
  selectedOrigin,
  selectedDirection
}: Props): ReactElement<HTMLElement> | null => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  });

  useEffect(
    () => {
      fetchData(routeId, selectedOrigin, selectedDirection, dispatch);
    },
    [routeId, selectedOrigin, selectedDirection]
  );

  // For subway lines, the frequency of trips is lower on Saturdays, but
  // the first and last trips are the same on Weekdays and Saturdays.
  // When showing first and last trips use the weekday service,
  // but label it as "Monday - Saturday".
  // The data is ordered [sunday, weekday, saturday]
  const timesList = state.data
    ? [
        [
          "Monday - Saturday",
          state.data[1].first_departure,
          state.data[1].last_departure
        ],
        ["Sunday", state.data[0].first_departure, state.data[0].last_departure]
      ]
    : [];

  const timesDisplay = timesList.map(([label, firstTime, lastTime]) => (
    <React.Fragment key={label}>
      <h4>{label}</h4>
      <div className="first-last-trips">
        <div className="first-last-trips__trip">
          <span className="schedule-finder__first-last-trip-label">
            First Trip
          </span>
          {shortTime(firstTime)}
        </div>
        <div className="first-last-trips__trip">
          <span className="schedule-finder__first-last-trip-label">
            Last Trip
          </span>
          {shortTime(lastTime)}
        </div>
      </div>
    </React.Fragment>
  ));

  return (
    <div className="">
      {state.isLoading && (
        <div className="c-spinner__container">
          <div className="c-spinner">Loading...</div>
        </div>
      )}
      {/* istanbul ignore next */ !state.isLoading &&
        /* istanbul ignore next */ state.data && (
          /* istanbul ignore next */ <div>{timesDisplay}</div>
        )}
    </div>
  );
};

export default FirstLastTimes;
