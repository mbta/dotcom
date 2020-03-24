import React, { ReactElement } from "react";
import { SchedulePageData, SelectedOrigin } from "./__schedule";
import { DirectionId } from "../../__v3api";
import PDFSchedules from "./PDFSchedules";
import Connections from "./Connections";
import ContentTeasers from "./ContentTeasers";
import HoursOfOperation from "./HoursOfOperation";
import Fares from "./Fares";
import UpcomingHolidays from "./UpcomingHolidays";
import ScheduleNote from "./ScheduleNote";
import ScheduleFinder from "./ScheduleFinder";
import ScheduleFinderModal, {
  Mode as ModalMode
} from "./schedule-finder/ScheduleFinderModal";
import { storeHandler } from "../store/ScheduleStore";

interface Props {
  updateURL: (origin: SelectedOrigin, direction?: DirectionId) => void;
  schedulePageData: SchedulePageData;
  modalOpen: boolean;
  modalMode: ModalMode;
  closeModal: () => void;
  changeDirection: (direction: DirectionId) => void;
  selectedDirection: DirectionId;
  selectedOrigin: SelectedOrigin;
  changeOrigin: (origin: SelectedOrigin) => void;
}

// don't show Schedule Finder for subway
const SchedulePage = ({
  schedulePageData: {
    connections,
    pdfs,
    teasers,
    hours,
    fares,
    holidays,
    fare_link: fareLink,
    route,
    schedule_note: scheduleNote,
    services,
    stops,
    route_patterns: routePatternsByDirection,
    today
  },
  updateURL,
  closeModal,
  changeDirection,
  changeOrigin,
  modalOpen,
  modalMode,
  selectedDirection,
  selectedOrigin
}: Props): ReactElement<HTMLElement> => {
  const handleOriginSelectClick = (): void => {
    storeHandler({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  };
  return (
    <>
      {scheduleNote ? (
        <>
          <ScheduleNote
            className="m-schedule-page__schedule-notes--desktop"
            scheduleNote={scheduleNote}
          />
          {modalOpen && (
            <ScheduleFinderModal
              closeModal={closeModal}
              directionChanged={changeDirection}
              initialMode={modalMode}
              initialDirection={selectedDirection}
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
      ) : (
        <ScheduleFinder
          updateURL={updateURL}
          route={route}
          services={services}
          stops={stops}
          routePatternsByDirection={routePatternsByDirection}
          today={today}
          scheduleNote={null}
          directionId={selectedDirection}
          selectedOrigin={selectedOrigin}
          changeDirection={changeDirection}
          changeOrigin={changeOrigin}
          closeModal={closeModal}
          modalMode={modalMode}
          modalOpen={modalOpen}
        />
      )}
      <ContentTeasers teasers={teasers} />
      <PDFSchedules pdfs={pdfs} />
      <Connections connections={connections} />
      <Fares fares={fares} fareLink={fareLink} routeType={route.type} />
      <HoursOfOperation hours={hours} />
      <UpcomingHolidays holidays={holidays} />
    </>
  );
};
export default SchedulePage;
