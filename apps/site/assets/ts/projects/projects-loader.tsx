import React from "react";
import { render } from "react-dom";
import MoreProjectsTable from "./components/MoreProjectsTable";
import Banner from "./components/Banner";

export const projects = (): void => {
  const projectBannerDataEl = document.getElementById("js-project-banner-data");
  const projectBannerRootEl = document.getElementById(
    "react-project-banner-root"
  );
  const moreProjectsDataEl = document.getElementById("js-more-projects-data");
  const moreProjectsRootEl = document.getElementById(
    "react-more-projects-table-root"
  );
  if (
    !moreProjectsDataEl ||
    !moreProjectsRootEl ||
    !projectBannerRootEl ||
    !projectBannerDataEl
  ) {
    return;
  }

  const projectBannerData = JSON.parse(projectBannerDataEl.innerText);
  const moreProjectsData = JSON.parse(moreProjectsDataEl.innerText);
  render(<Banner {...projectBannerData} />, projectBannerRootEl);
  render(<MoreProjectsTable {...moreProjectsData} />, moreProjectsRootEl);
};

export default projects;
