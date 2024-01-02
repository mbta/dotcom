import React, { ReactElement } from "react";
import { Holiday, SchedulePDF, Fare, ScheduleNote } from "./__schedule";
import { EnhancedRoute } from "../../__v3api";
import { TypedRoutes } from "../../stop/components/__stop";
import PDFSchedules from "./PDFSchedules";
import Connections from "./Connections";
import ContentTeasers from "./ContentTeasers";
import Fares from "./Fares";
import UpcomingHolidays from "./UpcomingHolidays";
import HoursOfOperation from "./HoursOfOperation";
import { isSubwayRoute } from "../../models/route";

interface Props {
  teasers: string | null;
  pdfs: SchedulePDF[];
  connections: TypedRoutes[];
  fares: Fare[];
  fareLink: string;
  route: EnhancedRoute;
  holidays: Holiday[];
  scheduleNote: ScheduleNote | null;
  hours: string;
}

const AdditionalLineInfo = ({
  connections,
  pdfs,
  teasers,
  fares,
  holidays,
  fareLink,
  route,
  hours,
  scheduleNote
}: Props): ReactElement<HTMLElement> => (
  <>
    <ContentTeasers teasers={teasers} />
    <PDFSchedules pdfs={pdfs} />
    <Connections connections={connections} />
    <Fares fares={fares} fareLink={fareLink} routeType={route.type} />
    {/* Only show the hours for non subway lines */}
    {!isSubwayRoute(route) && (
      <HoursOfOperation
        route={route}
        pdfs={pdfs}
        scheduleNote={scheduleNote}
        hours={hours}
      />
    )}
    <UpcomingHolidays holidays={holidays} />
  </>
);

export default AdditionalLineInfo;
