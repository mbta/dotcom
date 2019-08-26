import React, { ReactElement } from "react";
import Banner from "./Banner";
import FeaturedProjectsList from "./FeaturedProjectsList";
import FeaturedProjectsTitle from "./FeaturedProjectsTitle";
import MoreProjectsTable from "./MoreProjectsTable";
import ProjectUpdateList from "./ProjectUpdateList";
import { SimpleProject as Project } from "./__projects";

interface Props {
  banner: Project | null;
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
    <div className="m-project-page__top-container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <FeaturedProjectsTitle banner={banner} />
          <Banner banner={banner} placeholderImageUrl={placeholderImageUrl} />
          <FeaturedProjectsList
            projects={featuredProjects}
            placeholderImageUrl={placeholderImageUrl}
          />
        </div>
        <div className="col-12 col-lg-offset-half-left col-lg-4 col-lg-3-and-a-half">
          <div className="container">
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
