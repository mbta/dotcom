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
    route,
    schedule_note: scheduleNote,
    services,
    rating_end_date: ratingEndDate,
    stops,
    direction_id: directionId,
    route_patterns: routePatternsByDirection
  }
}: Props): ReactElement<HTMLElement> => (
  <>
    {scheduleNote ? (
      <ScheduleNote
        className="m-schedule-page__schedule-notes--desktop"
        scheduleNote={scheduleNote}
      />
    ) : (
      <ScheduleFinder
        route={route} // don't show for subway
        services={services}
        ratingEndDate={ratingEndDate}
        stops={stops}
        directionId={directionId}
        routePatternsByDirection={routePatternsByDirection}
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
export default SchedulePage;
