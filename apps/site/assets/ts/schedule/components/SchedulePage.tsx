import React, { ReactElement } from "react";
import { SchedulePageData } from "./__schedule";
import PDFSchedules from "./PDFSchedules";
import Connections from "./Connections";
import ContentTeasers from "./ContentTeasers";
import HoursOfOperation from "./HoursOfOperation";
import Fares from "./Fares";
import UpcomingHolidays from "./UpcomingHolidays";
import Modal from "../../components/Modal";

interface Props {
  schedulePageData: SchedulePageData;
}

const SchedulePage = ({
  schedulePageData: {
    connections,
    pdfs,
    teasers,
    hours,
    fares,
    holidays,
    fare_link: fareLink,
    route_type: routeType
  }
}: Props): ReactElement<HTMLElement> => (
  <>
    <ContentTeasers teasers={teasers} />
    <PDFSchedules pdfs={pdfs} />
    <Connections connections={connections} />
    <Fares fares={fares} fareLink={fareLink} routeType={routeType} />
    <HoursOfOperation hours={hours} />
    <UpcomingHolidays holidays={holidays} />
    <Modal
      triggerElement={
        <button type="button" className="btn btn-primary">
          Click me!
        </button>
      }
      ariaLabel={{ label: "A modal with some tabbable elements" }}
    >
      <>
        <div>Testing</div>
        <a href="/">This is tabblable</a>
        <input />
      </>
    </Modal>
  </>
);
export default SchedulePage;
