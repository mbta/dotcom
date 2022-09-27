import React, { ReactElement } from "react";
import { Holiday, SchedulePDF, Fare } from "./__schedule";
import { EnhancedRoute } from "../../__v3api";
import { TypedRoutes } from "../../stop/components/__stop";
import PDFSchedules from "./PDFSchedules";
import Connections from "./Connections";
import ContentTeasers from "./ContentTeasers";
// import HoursOfOperation from "./HoursOfOperation";
import Fares from "./Fares";
import UpcomingHolidays from "./UpcomingHolidays";

interface Props {
  teasers: string | null;
  pdfs: SchedulePDF[];
  connections: TypedRoutes[];
  fares: Fare[];
  fareLink: string;
  route: EnhancedRoute;
  holidays: Holiday[];
}

const AdditionalLineInfo = ({
  connections,
  pdfs,
  teasers,
  fares,
  holidays,
  fareLink,
  route
}: Props): ReactElement<HTMLElement> => (
  <>
    <div>ASDFASDFASDFASDFASDF</div>
  </>
);

export default AdditionalLineInfo;
