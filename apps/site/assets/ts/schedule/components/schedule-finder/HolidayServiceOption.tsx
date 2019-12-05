import React, { ReactElement } from "react";
import { ServiceWithServiceDate } from "../../../__v3api";

interface Props {
  service: ServiceWithServiceDate;
  servicePeriod: string;
}

const HolidayServiceOption = ({
  service,
  servicePeriod
}: Props): ReactElement<HTMLElement> => (
  <option value={service.id}>{servicePeriod}</option>
);

export default HolidayServiceOption;
