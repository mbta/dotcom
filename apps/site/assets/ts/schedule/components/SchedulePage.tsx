import React, { ReactElement } from "react";
import { SchedulePageData } from "./__schedule";
import PDFSchedules from "./PDFSchedules";
import Connections from "./Connections";
import ContentTeasers from "./ContentTeasers";
import HoursOfOperation from "./HoursOfOperation";
import Fares from "./Fares";
import UpcomingHolidays from "./UpcomingHolidays";
import ScheduleNote from "./ScheduleNote";
import ScheduleFinder from "./ScheduleFinder";

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
    route_type: routeType,
    schedule_note: scheduleNote,
    direction_names: directionNames,
    direction_destinations: directionDestinations,
    stops
  }
}: Props): ReactElement<HTMLElement> => (
  <>
    {!!scheduleNote && <ScheduleNote scheduleNote={scheduleNote} />}
    {routeType !== 0 &&
    routeType !== 1 && ( // don't show for subway
        <ScheduleFinder
          directionDestinations={directionDestinations}
          directionNames={directionNames}
          stops={stops}
        />
      )}
    <ContentTeasers teasers={teasers} />
    <PDFSchedules pdfs={pdfs} />
    <Connections connections={connections} />
    <Fares fares={fares} fareLink={fareLink} routeType={routeType} />
    <HoursOfOperation hours={hours} />
    <UpcomingHolidays holidays={holidays} />
  </>
);
export default SchedulePage;
