import React from "react";
import { render } from "react-dom";
import MoreProjectsTable from "./components/MoreProjectsTable";

export const projects = (): void => {
  const moreProjectsDataEl = document.getElementById("js-more-projects-data");
  const moreProjectsRootEl = document.getElementById(
    "react-more-projects-table-root"
  );
  if (!moreProjectsDataEl || !moreProjectsRootEl) {
    return;
  }

  const moreProjectsData = JSON.parse(moreProjectsDataEl.innerText);

  render(<MoreProjectsTable projects={moreProjectsData} />, moreProjectsRootEl);
};

export default projects;
