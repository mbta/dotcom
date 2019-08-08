import React, { ReactElement } from "react";
import { SimpleProject as Project } from "./__projects";
import FeaturedProject from "./FeaturedProject";

interface Props {
  placeholderImageUrl: string;
  projectPair: Project[];
}

const FeaturedProjectsRow = ({
  projectPair,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => {
  const projectToComponent = (project: Project): JSX.Element => (
    <FeaturedProject
      key={`featured-project-${project.id}`}
      project={project}
      placeholderImageUrl={placeholderImageUrl}
    />
  );

  return (
    <div className="c-featured-project-list__row">
      {projectToComponent(projectPair[0])}
      {projectPair[1] ? (
        projectToComponent(projectPair[1])
      ) : (
        <div className="c-featured-project" />
      )}
    </div>
  );
};

export default FeaturedProjectsRow;
