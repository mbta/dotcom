import React, { ReactElement } from "react";
import MoreProjectsRow from "./MoreProjectsRow";
import { Project } from "./Project";

interface Props {
  projects: Project[];
}

const MoreProjectsTable = ({ projects }: Props): ReactElement<HTMLElement> => (
  <table className="c-more-projects-table" aria-label="More Projects">
    <colgroup>
      <col className="c-more-projects-table__col-project" />
      <col className="c-more-projects-table__col-last-updated" />
      <col className="c-more-projects-table__col-status" />
    </colgroup>
    <thead className="c-more-projects-table__thead">
      <tr>
        <th
          scope="col"
          className="c-more-projects-table__th c-more-projects-table__th-project"
        >
          Project
        </th>
        <th scope="col" className="c-more-projects-table__th">
          Last Updated
        </th>
        <th scope="col" className="c-more-projects-table__th">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="c-more-projects-table__tbody">
      {projects.map(project => (
        <MoreProjectsRow key={project.id} {...project} />
      ))}
    </tbody>
  </table>
);

export default MoreProjectsTable;
