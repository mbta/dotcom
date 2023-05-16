import React, { ReactElement, useState } from "react";
import { Stop } from "../../__v3api";
import Modal from "../../components/Modal";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { StopMapForRoute } from "./StopMapRedesign";
import { RouteWithPolylines } from "../../hooks/useRoute";

interface StopPageOverlayProps {
  routes: RouteWithPolylines[];
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

  // TODO: Show line based on the selected route pattern,
  const lineToShow =
    routes.length > 0 && routes[0].polylines.length > 0
      ? routes[0].polylines[0]
      : null;

  return (
    <div className="sm-up-hide">
      <button type="button" className="overlay-open" onClick={modalClick}>
        open overlay
      </button>
      {modalOpen && (
        <Modal
          className="m-stop-route-and-map"
          ariaLabel={{ label: "schedules overlay" }}
          closeModal={modalClick}
        >
          <StopMapForRoute stop={stop} line={lineToShow} />
          <div className="placeholder-departures">
            imagine stop departures here
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StopPageOverlay;
