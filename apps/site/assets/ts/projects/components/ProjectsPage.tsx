import React, { ReactElement } from "react";
import Banner from "./Banner";
import FeaturedProjectsList from "./FeaturedProjectsList";
import MoreProjectsTable from "./MoreProjectsTable";
import ProjectUpdateList from "./ProjectUpdateList";
import { SimpleProject as Project } from "./__projects";

interface Props {
  banner: Project;
  featuredProjects: Project[];
  projects: Project[];
  projectUpdates: Project[];
  placeholderImageUrl: string;
}

const ProjectsPage = ({
  banner,
  featuredProjects,
  projects,
  projectUpdates,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => (
  <>
    <div className="m-banner__container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h2 className="container c-featured-projects__subheader">
            Featured Projects
          </h2>
          <Banner banner={banner} placeholderImageUrl={placeholderImageUrl} />
          <FeaturedProjectsList
            projects={featuredProjects}
            placeholderImageUrl={placeholderImageUrl}
          />
        </div>
        <div className="c-project-update-list__container col-12 col-lg-4">
          <div className="container">
            <h3 className="c-project-update-list__subheader">
              Project Updates
            </h3>
            <ProjectUpdateList
              projectUpdates={projectUpdates}
              placeholderImageUrl={placeholderImageUrl}
            />
          </div>
        </div>
      </div>
    </div>
    <MoreProjectsTable
      projects={projects}
      placeholderImageUrl={placeholderImageUrl}
    />
  </>
);

export default ProjectsPage;
