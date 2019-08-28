import React, { ReactElement } from "react";
import MoreProjectsRow from "./MoreProjectsRow";
import { SimpleProject as Project } from "./__projects";
import { FetchProjects, State, SetState } from "./ProjectsPage";

interface Props {
  placeholderImageUrl: string;
  fetchMoreProjects: FetchProjects;
  state: State;
  setState: SetState;
}

const MoreProjectsTable = ({
  placeholderImageUrl,
  state,
  setState,
  fetchMoreProjects
}: Props): ReactElement<HTMLElement> => {
  return (
    <div className="container">
      {(state.banner && <h2>More Projects</h2>) || <h2>Projects</h2>}
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
              >
                Status
              </th>
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
    </div>
  );
};

export default MoreProjectsTable;
