import React, { ReactElement } from "react";
import ShuttlesOverview from "./ShuttlesOverview";
import { Route } from "../../__v3api";

interface Props {
  route: Route;
}

const ShuttlesPage = ({ route }: Props): ReactElement<HTMLElement> => {
  const places =
    route.id === "Green" ? route.direction_names : route.direction_destinations;

  return (
    <div className="shuttles__main">
      <h2>Shuttle Maps</h2>
      <ShuttlesOverview places={places} />
      <div>Station Detail and dropdown</div>
      <div>Map2</div>
    </div>
  );
};

export default ShuttlesPage;
