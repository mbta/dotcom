import React from "react";
import { render } from "react-dom";
import ProjectsPage from "./components/ProjectsPage";

export const projectsLoader = (): void => {
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
      banner={banner}
      featuredProjects={featuredProjects}
      projects={projects}
      projectUpdates={projectUpdates}
      placeholderImageUrl={placeholderImageUrl}
    />,
    projectsRootEl
  );
};

export default projectsLoader;
