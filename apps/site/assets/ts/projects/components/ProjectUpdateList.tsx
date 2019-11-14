import React, { ReactElement } from "react";
import { Teaser as Project } from "../../__cms";
import formattedDate from "../../helpers/date";
import RoutePillList from "./RoutePillList";

interface Props {
  projectUpdates: Project[];
  placeholderImageUrl: string;
}

const ProjectUpdateList = ({
  projectUpdates,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> | null =>
  projectUpdates.length > 0 ? (
    <>
      <h2 className="m-projects-header__subheader">Project Updates</h2>
      <div className="m-project-update-list__row">
        {projectUpdates.map(
          ({ image, path, title, routes, date, id }: Project) => (
            <a href={path} className="m-project-update-list__item" key={id}>
              <div>
                {image ? (
                  <img
                    className="m-project-update__photo"
                    src={image.url}
                    alt={image.alt}
                  />
                ) : (
                  <img
                    className="m-project-update__photo"
                    src={placeholderImageUrl}
                    alt="MBTA logo"
                  />
                )}
              </div>
              <div className="m-project-update__date u-small-caps">
                {formattedDate(date)}
              </div>
              <h3 className="m-project-update__title">{title}</h3>
              <RoutePillList routes={routes} />
            </a>
          )
        )}
      </div>
    </>
  ) : null;

export default ProjectUpdateList;
