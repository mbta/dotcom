import React, { ReactElement } from "react";
import ShuttlesOverview from "./ShuttlesOverview";
import { Route } from "../../__v3api";

interface Props {
  route: Route;
}

const ShuttlesPage = ({ route }: Props): ReactElement<HTMLElement> => (
  <div className="shuttles__main col-sm-12 col-lg-7">
    <h2>Shuttle Maps</h2>
    <ShuttlesOverview places={route.direction_destinations} />
    <div>Station Detail and dropdown</div>
    <div>Map2</div>
  </div>
);

export default ShuttlesPage;
