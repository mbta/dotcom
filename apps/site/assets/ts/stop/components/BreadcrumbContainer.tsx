import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";

interface Props {
  stop: Stop;
}

const BreadcrumbContainer = ({ stop }: Props): ReactElement<HTMLElement> => (
  <div className="breadcrumb-container">
    <div className="container p-0">
      <span className="focusable-sm-down">
        <a href="/">Home</a>
        <i className="fa fa-angle-right" aria-hidden="true" />
      </span>
      <span>
        <a href="/stops/subway">Stations</a>
        <i className="fa fa-angle-right" aria-hidden="true" />
      </span>
      {stop.name}
    </div>
  </div>
);

export default BreadcrumbContainer;
