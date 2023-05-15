import React, { ReactElement, useState } from "react";
import { DirectionId, Route, Stop } from "../../__v3api";
import Modal from "../../components/Modal";
import { ScheduleWithTimestamp } from "../../models/schedules";
import Departures from "./Departures";
import StopPageDepartures from "./StopPageDepartures";

interface StopPageOverlayProps {
  routes: Route[];
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
}

const StopPageOverlay = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  routes,
  stop,
  schedules
}: /* eslint-enable @typescript-eslint/no-unused-vars */
StopPageOverlayProps): ReactElement<HTMLElement> => {
  const [modalOpen, toggleModal] = useState(true);
  const [departureInfo, setDepartureInfo] = useState<any | any | any>({
    departureRoute: null,
    departureDirectionId: null,
    departureSchedules: null
  });

  const setDepartureVariables: (
    route: Route,
    directionId: DirectionId,
    schedules: ScheduleWithTimestamp
  ) => void = (route, directionId, schedules) => {
    toggleModal(false);

    setDepartureInfo({
      departureRoute: route,
      departureDirectionId: directionId,
      departureSchedules: schedules
    });
  };
  const clearDepartureVariables: () => void = () => {
    toggleModal(true);
    setDepartureInfo({
      departureRoute: null,
      departureDirectionId: null,
      departureSchedules: null
    });
  };

  const viewAllRoutes: () => boolean = () => {
    console.log([
      departureInfo.departureRoute,
      departureInfo.departureDirectionId,
      departureInfo.departureSchedules
    ]);
    if (
      [
        departureInfo.departureRoute,
        departureInfo.departureDirectionId,
        departureInfo.departureSchedules
      ].includes(null)
    ) {
      return true;
    }
    return false;
  };

  const modalClick: () => void = () =>
    modalOpen ? toggleModal(false) : toggleModal(true);

  return (
    <div>
      {/* desktop view */}
      <button onClick={clearDepartureVariables}> Back to all {stop.id}</button>
      <div className="sm-down-hide">
        {viewAllRoutes() ? (
          <StopPageDepartures
            routes={routes}
            stop={stop}
            schedules={schedules}
            onClick={setDepartureVariables}
          />
        ) : (
          <div className="placeholder-departures">
            {departureInfo.departureRoute.id}
            {departureInfo.departureDirectionId}
            {/* schedules */}
          </div>
        )}
      </div>
      {/* mobile view */}
      <div className="sm-up-hide">
        <StopPageDepartures
          routes={routes}
          stop={stop}
          schedules={schedules}
          onClick={setDepartureVariables}
        />
        <button type="button" className="overlay-open" onClick={modalClick}>
          open overlay
        </button>
        {/* {modalOpen && (
        <Modal
          className="m-stop-route-and-map"
          ariaLabel={{ label: "schedules overlay" }}
          closeModal={modalClick}
        >
          <div className="placeholder-map">imagine a map here</div>
          <div className="placeholder-departures">
            imagine stop departures here
          </div>
        </Modal>
      )} */}
      </div>
    </div>
  );
};

export default StopPageOverlay;
