import React, { ReactElement } from "react";
import MoreProjectsRow from "./MoreProjectsRow";
import { SimpleProject as Project } from "./__projects";

interface Props {
  projects: Project[];
  placeholderImageUrl: string;
}

const MoreProjectsTable = ({
  projects,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => (
  <table className="c-more-projects-table" aria-label="More Projects">
    <thead className="c-more-projects-table__thead hidden-md-down">
      <tr>
        <th
          scope="col"
          className="c-more-projects-table__th c-more-projects-table__th-project"
        >
          Project
        </th>
        <th
          scope="col"
          className="c-more-projects-table__th c-more-projects-table__th-last-updated"
        >
          Last Updated
        </th>
        <th
          scope="col"
          className="c-more-projects-table__th c-more-projects-table__th-status"
        />
      </tr>
    </thead>
    <tbody className="c-more-projects-table__tbody">
      {projects.map(project => (
        <MoreProjectsRow
          key={project.id}
          placeholderImageUrl={placeholderImageUrl}
          {...project}
        />
      ))}
    </tbody>
  </table>
);

export default MoreProjectsTable;
