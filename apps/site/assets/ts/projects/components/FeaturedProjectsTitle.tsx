import React, { ReactElement } from "react";
import { SimpleProject as Project } from "./__projects";

interface Props {
  banner: Project | null;
}

const FeaturedProjectsTitle = ({banner}: Props): ReactElement<HTMLElement> => {
  if(!banner) {
    <div/>
  }

  return(
    <h2 className="container c-projects-header__subheader">Featured Projects</h2>
  );
};

export default FeaturedProjectsTitle;
