import React, { ReactElement, useState } from "react";
import { Route, Stop } from "../../__v3api";
import Modal from "../../components/Modal";
import { ScheduleWithTimestamp } from "../../models/schedules";

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
  const [modalOpen, toggleModal] = useState(false);

  const modalClick: () => void = () =>
    modalOpen ? toggleModal(false) : toggleModal(true);

  return (
    <div className="sm-up-hide">
      <button type="button" className="overlay-open" onClick={modalClick}>
        open overlay
      </button>
      {modalOpen && (
        <Modal
          className="m-stop-routes-and-map"
          ariaLabel={{ label: "schedules overlay" }}
          closeModal={modalClick}
        >
          <div className="placeholder-map">imagine a map here</div>
          <div className="placeholder-departures">
            imagine stop departures here
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StopPageOverlay;
