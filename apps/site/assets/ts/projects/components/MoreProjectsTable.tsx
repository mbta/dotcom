import React, { ReactElement, useState } from "react";
import MoreProjectsRow from "./MoreProjectsRow";
import { Project } from "./__projects";

interface Props {
  projects: Project[];
  placeholderImageUrl: string;
}

interface State {
  projects: Project[];
  fetchInProgress: boolean;
}

const MoreProjectsTable = ({
  projects: initialProjects,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => {
  const [state, setState] = useState<State>({
    projects: initialProjects,
    fetchInProgress: false
  });

  const fetchMoreProjects = (): void => {
    if (window.fetch) {
      setState({
        projects: state.projects,
        fetchInProgress: true
      });

      const offset = state.projects.length;
      window
        .fetch(`/project_api?offset=${offset}`)
        .then(response => {
          if (response.ok && response.body) {
            return response.json();
          }
          return [];
        })
        .then(newProjects => {
          setState({
            projects: state.projects.concat(newProjects),
            fetchInProgress: false
          });
        });
    }
  };

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
          onClick={() => fetchMoreProjects()}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default MoreProjectsTable;
