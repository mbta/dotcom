import React from "react";
import { render } from "react-dom";
import MoreProjectsTable from "./components/MoreProjectsTable";
import Banner from "./components/Banner";

export const projects = (): void => {
  const projectTeasersDataEl = document.getElementById(
    "js-project-teasers-data"
  );
  const projectTeasersRootEl = document.getElementById(
    "react-project-teasers-root"
  );
  const moreProjectsDataEl = document.getElementById("js-more-projects-data");
  const moreProjectsRootEl = document.getElementById(
    "react-more-projects-table-root"
  );
  if (
    !moreProjectsDataEl ||
    !moreProjectsRootEl ||
    !projectTeasersRootEl ||
    !projectTeasersDataEl
  ) {
    return;
  }

  const projectTeasersData = JSON.parse(projectTeasersDataEl.innerText);
  const moreProjectsData = JSON.parse(moreProjectsDataEl.innerText);
  render(<Banner {...projectTeasersData} />, projectTeasersRootEl);
  render(<MoreProjectsTable {...moreProjectsData} />, moreProjectsRootEl);
};

export default projects;
