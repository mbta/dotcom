import React, { ReactElement } from "react";
import MoreProjectsRow from "./MoreProjectsRow";
import { FetchProjects, State, SetState } from "./ProjectsPage";

interface Props {
  placeholderImageUrl: string;
  fetchMoreProjects: FetchProjects;
  state: State;
  setState: SetState;
}

export const tableHeaderText = (state: State): string => {
  switch (state.currentMode) {
    case undefined: {
      return state.banner ? "More" : "";
    }
    case "bus":
      return "Bus";
    case "commuter_rail":
      return "Commuter Rail";
    case "ferry":
      return "Ferry";
    case "subway":
      return "Subway";
    default:
      return "";
  }
};

const MoreProjectsTable = ({
  placeholderImageUrl,
  state,
  setState,
  fetchMoreProjects
}: Props): ReactElement<HTMLElement> | null => {
  if (state.projects.length === 0) {
    return null;
  }

  return (
    <>
      <h2>{tableHeaderText(state)} Projects</h2>
      <div>
        <table className="m-more-projects-table" aria-label="More Projects">
          <thead className="m-more-projects-table__thead d-none d-md-table-row">
            <tr>
              <th
                scope="col"
                className="m-more-projects-table__th m-more-projects-table__th-project"
              >
                Project
              </th>
              <th
                scope="col"
                className="m-more-projects-table__th m-more-projects-table__th-last-updated"
              >
                Last Updated
              </th>
              <th
                scope="col"
                className="m-more-projects-table__th m-more-projects-table__th-status"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="m-more-projects-table__tbody">
            {state.projects.map(project => (
              <MoreProjectsRow
                key={project.id}
                placeholderImageUrl={placeholderImageUrl}
                {...project}
              />
            ))}
          </tbody>
        </table>

        <div className="m-more-projects__show-more-button-wrapper">
          <button
            className="btn btn-secondary m-more-projects__show-more-button"
            type="button"
            disabled={state.fetchInProgress}
            onClick={() => fetchMoreProjects(state, setState)}
          >
            Show more
          </button>
        </div>
      </div>
    </>
  );
};

export default MoreProjectsTable;
