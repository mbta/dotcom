import React from "react";
import { render } from "react-dom";
import ProjectsPage from "./components/ProjectsPage";
import { initWithoutGoogle } from "../../js/algolia-embedded-search";

export const projectsLoader = (): void => {
  initWithoutGoogle();
  const projectDataEl = document.getElementById("js-projects-data");
  const projectsRootEl = document.getElementById("react-projects-root");

  if (!projectDataEl || !projectsRootEl) {
    return;
  }

  const projectsData = JSON.parse(projectDataEl.innerText);
  const {
    placeholderImageUrl,
    banner,
    featuredProjects,
    projects,
    projectUpdates
  } = projectsData;
  render(
    <ProjectsPage
      initialBanner={banner}
      initialFeaturedProjects={featuredProjects}
      initialProjects={projects}
      initialProjectUpdates={projectUpdates}
      placeholderImageUrl={placeholderImageUrl}
    />,
    projectsRootEl
  );
};

export default projectsLoader;
