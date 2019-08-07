import React, { Dispatch, ReactElement, useState } from "react";
import MoreProjectsRow from "./MoreProjectsRow";
import { SimpleProject as Project } from "./__projects";

interface Props {
  projects: Project[];
  placeholderImageUrl: string;
}

interface State {
  projects: Project[];
  fetchInProgress: boolean;
}

export const fetchMoreProjects = async (
  state: State,
  setState: Dispatch<State>
): Promise<void> => {
  if (!window.fetch) {
    return;
  }

  setState({ ...state, fetchInProgress: true });

  const offset = state.projects.length;
  const response = await window.fetch(`/project_api?offset=${offset}`);
  const projects: Project[] =
    response.ok && response.body ? Array.from(await response.json()) : [];
  setState({
    projects: state.projects.concat(projects),
    fetchInProgress: false
  });
};

const MoreProjectsTable = ({
  projects: initialProjects,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => {
  const [state, setState] = useState<State>({
    projects: initialProjects,
    fetchInProgress: false
  });

  return (
    <div>
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
          {state.projects.map(project => (
            <MoreProjectsRow
              key={project.id}
              placeholderImageUrl={placeholderImageUrl}
              {...project}
            />
          ))}
        </tbody>
      </table>

      <div className="c-more-projects__show-more-button-wrapper">
        <button
          className="btn btn-secondary c-more-projects__show-more-button"
          type="button"
          disabled={state.fetchInProgress}
          onClick={() => fetchMoreProjects(state, setState)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default MoreProjectsTable;
