import React, { ReactElement } from "react";
import RoutePillList from "./RoutePillList";
import { Teaser as Project } from "../../__cms";
import { formattedDate } from "../../helpers/date";

interface Props {
  project: Project;
  placeholderImageUrl: string;
}

const FeaturedProject = ({
  project,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => {
  const { path, image, title, text, date, routes } = project;

  return (
    <div className="m-featured-project">
      <a href={path}>
        <div className="m-featured-project__image">
          {(image && <img src={image.url} alt={image.alt} />) || (
            <img src={placeholderImageUrl} alt="MBTA logo" />
          )}
        </div>

        <h3 className="m-featured-project__title">{title}</h3>

        <div className="m-featured-project__date">
          Updated on {formattedDate(date)}
        </div>

        {text}

        <RoutePillList routes={routes} />
      </a>
    </div>
  );
};

export default FeaturedProject;
