import React, { ReactElement } from "react";
import { Teaser as Project } from "../../__cms";
import FeaturedProject from "./FeaturedProject";

interface Props {
  placeholderImageUrl: string;
  projectPair: Project[];
}

const projectToComponent = (
  project: Project,
  placeholderImageUrl: string
): JSX.Element => (
  <FeaturedProject
    key={`featured-project-${project.id}`}
    project={project}
    placeholderImageUrl={placeholderImageUrl}
  />
);

const FeaturedProjectsRow = ({
  projectPair,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => (
  <div className="m-featured-project-list__row">
    {projectToComponent(projectPair[0], placeholderImageUrl)}
    {projectPair[1] ? (
      projectToComponent(projectPair[1], placeholderImageUrl)
    ) : (
      <div className="m-featured-project" />
    )}
  </div>
);

export default FeaturedProjectsRow;
