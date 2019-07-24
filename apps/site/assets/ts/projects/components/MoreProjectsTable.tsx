import React, { ReactElement } from "react"
import { MoreProjectsRow } from "./MoreProjectsRow"
import { Project } from "./Project"

interface Props {
  projects: Project[];
}

export const MoreProjectsTable = ({projects}: Props): ReactElement<HTMLElement> => {
  return(
    <table className="responsive-table">
      <caption>More Projects</caption>
      <thead>
        <tr>
          <th scope="col">Project</th>
          <th scope="col">Last Updated</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) =>
          <MoreProjectsRow key={project.id} {...project}></MoreProjectsRow>
        )}
      </tbody>
    </table>
  )
}
