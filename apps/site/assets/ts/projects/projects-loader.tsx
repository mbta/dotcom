import React from "react";
import { render } from "react-dom";
import FeaturedProjectsList from "./components/FeaturedProjectsList";
import MoreProjectsTable from "./components/MoreProjectsTable";
import Banner from "./components/Banner";

export const projects = (): void => {
  const projectTeasersDataEl = document.getElementById(
    "js-project-teasers-data"
  );
  const projectTeasersRootEl = document.getElementById(
    "react-project-teasers-root"
  );
  const featuredProjectsDataEl = document.getElementById(
    "js-featured-projects-data"
  );
  const featuredProjectsRootEl = document.getElementById(
    "react-featured-projects-root"
  );
  const moreProjectsDataEl = document.getElementById("js-more-projects-data");
  const moreProjectsRootEl = document.getElementById(
    "react-more-projects-table-root"
  );
  if (
    !moreProjectsDataEl ||
    !moreProjectsRootEl ||
    !featuredProjectsDataEl ||
    !featuredProjectsRootEl ||
    !projectTeasersRootEl ||
    !projectTeasersDataEl
  ) {
    return;
  }

  const projectTeasersData = JSON.parse(projectTeasersDataEl.innerText);
  const featuredProjectsData = JSON.parse(featuredProjectsDataEl.innerText);
  const moreProjectsData = JSON.parse(moreProjectsDataEl.innerText);
  render(<Banner {...projectTeasersData} />, projectTeasersRootEl);
  render(
    <FeaturedProjectsList {...featuredProjectsData} />,
    featuredProjectsRootEl
  );
  render(<MoreProjectsTable {...moreProjectsData} />, moreProjectsRootEl);
};

export default projects;
