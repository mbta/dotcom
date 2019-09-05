import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import Banner from "./Banner";
import FeaturedProjectsList from "./FeaturedProjectsList";
import FilterAndSearch from "./FilterAndSearch";
import MoreProjectsTable from "./MoreProjectsTable";
import ProjectUpdateList from "./ProjectUpdateList";
import { Mode } from "../../__v3api";
import { SimpleProject as Project } from "./__projects";

interface Props {
  initialBanner: Project | null;
  initialFeaturedProjects: Project[];
  initialProjects: Project[];
  initialProjectUpdates: Project[];
  placeholderImageUrl: string;
}

export interface State {
  banner: Project | null;
  featuredProjects: Project[];
  fetchInProgress: boolean;
  projects: Project[];
  currentMode?: Mode;
  projectUpdates: Project[];
  offsetStart: number;
}

export type SetState = Dispatch<SetStateAction<State>>;
export type FetchProjects = (state: State, setState: SetState) => void;
export type UpdateSelectedMode = ((
  state: State,
  newMode: Mode,
  setState: SetState
) => void);

export const fetchMoreProjects: FetchProjects = (
  state: State,
  setState: SetState
): void => {
  setState({ ...state, fetchInProgress: true });

  const offset = state.projects.length + state.offsetStart;
  const fetchUrl = `/project_api?offset=${offset}&filter[mode]=${
    state.currentMode
  }`;

  window
    .fetch(fetchUrl)
    .then(response => {
      if (response.ok) return response.json();
      /* istanbul ignore next */
      throw new Error(response.statusText);
    })
    .then(projects => {
      const newProjects = state.projects.concat(projects);

      setState({
        ...state,
        projects: newProjects,
        fetchInProgress: false
      });
    });
};

export const updateSelectedMode: UpdateSelectedMode = (
  state: State,
  newMode: Mode,
  setState: SetState
): void => {
  const newSelectedMode = newMode === state.currentMode ? undefined : newMode;
  const newSelectedModeStr = newSelectedMode || "undefined";

  setState({ ...state, fetchInProgress: true });

  window
    .fetch(`/project_api?filter[mode]=${newSelectedModeStr}`)
    .then(response => {
      if (response.ok) return response.json();
      /* istanbul ignore next */
      throw new Error(response.statusText);
    })
    .then(json => {
      const banner = json.featuredProjects[0];
      const featuredProjects = json.featuredProjects.slice(1);

      setState({
        ...state,
        banner,
        featuredProjects,
        projects: json.projects,
        projectUpdates: json.projectUpdates,
        currentMode: newSelectedMode,
        fetchInProgress: false,
        offsetStart: json.offsetStart
      });
    });
};

const ProjectsPage = ({
  initialProjectUpdates,
  placeholderImageUrl,
  initialBanner,
  initialFeaturedProjects,
  initialProjects
}: Props): ReactElement<HTMLElement> => {
  const [state, setState] = useState<State>({
    featuredProjects: initialFeaturedProjects,
    projects: initialProjects,
    projectUpdates: initialProjectUpdates,
    banner: initialBanner,
    fetchInProgress: false,
    offsetStart: 0
  });

  return (
    <>
      <FilterAndSearch
        state={state}
        setState={setState}
        updateSelectedMode={updateSelectedMode}
      />

      <div className="m-project-page__top-container">
        <div className="row">
          <div className="col-12 col-lg-8">
            <Banner
              banner={state.banner}
              placeholderImageUrl={placeholderImageUrl}
            />
            <FeaturedProjectsList
              projects={state.featuredProjects}
              placeholderImageUrl={placeholderImageUrl}
            />
          </div>
          <div className="col-12 col-lg-offset-half-left col-lg-4 col-lg-3-and-a-half">
            <div className="container">
              <ProjectUpdateList
                projectUpdates={state.projectUpdates}
                placeholderImageUrl={placeholderImageUrl}
              />
            </div>
          </div>
        </div>
      </div>
      <MoreProjectsTable
        placeholderImageUrl={placeholderImageUrl}
        state={state}
        fetchMoreProjects={fetchMoreProjects}
        setState={setState}
      />
    </>
  );
};
export default ProjectsPage;
