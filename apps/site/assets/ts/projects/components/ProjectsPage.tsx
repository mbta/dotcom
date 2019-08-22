import React, { ReactElement } from "react";
import Banner from "./Banner";
import FeaturedProjectsList from "./FeaturedProjectsList";
import MoreProjectsTable from "./MoreProjectsTable";
import { SimpleProject as Project } from "./__projects";

interface Props {
  banner: Project;
  featuredProjects: Project[];
  projects: Project[];
  placeholderImageUrl: string;
}

const ProjectsPage = ({
  banner,
  featuredProjects,
  projects,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => (
  <>
    <Banner banner={banner} placeholderImageUrl={placeholderImageUrl} />
    <FeaturedProjectsList
      projects={featuredProjects}
      placeholderImageUrl={placeholderImageUrl}
    />
    <MoreProjectsTable
      projects={projects}
      placeholderImageUrl={placeholderImageUrl}
    />
  </>
);

export default ProjectsPage;
