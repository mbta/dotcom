import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import Banner from "./Banner";
import FeaturedProjectsList from "./FeaturedProjectsList";
import FilterAndSearch from "./FilterAndSearch";
import MoreProjectsTable from "./MoreProjectsTable";
import ProjectUpdateList from "./ProjectUpdateList";
import { Mode } from "../../__v3api";
import { Teaser as Project } from "../../__cms";

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
  currentLine?: SubwayLine;
  projectUpdates: Project[];
  offsetStart: number;
}

interface ApiResponse {
  featuredProjects: Project[];
  projects: Project[];
  projectUpdates: Project[];
  offsetStart: number;
}

export type SubwayLine = "red" | "orange" | "blue" | "green" | "mattapan";

export type SetState = Dispatch<SetStateAction<State>>;
export type FetchProjects = (state: State, setState: SetState) => void;
export type UpdateSelectedMode = (
  state: State,
  newMode: Mode,
  setState: SetState
) => void;
export type UpdateSelectedLine = (
  state: State,
  newLine: SubwayLine,
  setState: SetState
) => void;

export const fetchMoreProjects: FetchProjects = (
  state: State,
  setState: SetState
): void => {
  setState({ ...state, fetchInProgress: true });

  const offset = state.projects.length + state.offsetStart;
  let fetchUrl = `/project_api?offset=${offset}&filter[mode]=${state.currentMode}`;
  if (state.currentLine) {
    fetchUrl = fetchUrl.concat(`&filter[line]=${state.currentLine}`);
  }

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

const resetStateFromApiResponse = <NewCurrentKey extends keyof State>(
  json: ApiResponse,
  state: State,
  newCurrentKey: NewCurrentKey,
  newCurrentValue: State[NewCurrentKey],
  setState: SetState
): void => {
  const banner = json.featuredProjects[0];
  const featuredProjects = json.featuredProjects.slice(1);

  const newState: State = {
    ...state,
    banner,
    featuredProjects,
    projects: json.projects,
    projectUpdates: json.projectUpdates,
    fetchInProgress: false,
    offsetStart: json.offsetStart
  };
  newState[newCurrentKey] = newCurrentValue;

  setState(newState);
};

const fetchFilteredProjects = <NewSelectedKey extends keyof State>(
  state: State,
  queryParams: string,
  newSelectedKey: NewSelectedKey,
  newSelectedValue: State[NewSelectedKey],
  setState: SetState
): void => {
  setState({ ...state, fetchInProgress: true });

  window
    .fetch(`/project_api?${queryParams}`)
    .then(response => {
      if (response.ok) return response.json();
      /* istanbul ignore next */
      throw new Error(response.statusText);
    })
    .then(json =>
      resetStateFromApiResponse(
        json,
        state,
        newSelectedKey,
        newSelectedValue,
        setState
      )
    );
};

export const updateSelectedMode: UpdateSelectedMode = (
  state: State,
  newMode: Mode,
  setState: SetState
): void => {
  const newSelectedMode = newMode === state.currentMode ? undefined : newMode;
  const newSelectedModeStr = newSelectedMode || "undefined";
  const queryParams = `filter[mode]=${newSelectedModeStr}`;

  fetchFilteredProjects(
    state,
    queryParams,
    "currentMode",
    newSelectedMode,
    setState
  );
};

export const updateSelectedLine = (
  state: State,
  newLine: SubwayLine,
  setState: SetState
): void => {
  const newSelectedLine = newLine === state.currentLine ? undefined : newLine;
  const newSelectedLineStr = newSelectedLine || "undefined";
  const queryParams = `filter[mode]=subway&filter[line]=${newSelectedLineStr}`;

  fetchFilteredProjects(
    state,
    queryParams,
    "currentLine",
    newSelectedLine,
    setState
  );
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
        updateSelectedLine={updateSelectedLine}
        updateSelectedMode={updateSelectedMode}
      />

      <div className="m-project-page__top-container">
        <div className="col-12 col-lg-8 m-project-page__col--no-padding-lg-left">
          <Banner
            banner={state.banner}
            placeholderImageUrl={placeholderImageUrl}
          />
          <FeaturedProjectsList
            projects={state.featuredProjects}
            placeholderImageUrl={placeholderImageUrl}
          />
        </div>
        <div className="col-12 col-lg-offset-half-left col-lg-4 col-lg-3-and-a-half m-project-page__col--no-padding-lg-right">
          <div>
            <ProjectUpdateList
              projectUpdates={state.projectUpdates}
              placeholderImageUrl={placeholderImageUrl}
            />
          </div>
        </div>
        <div className="col-lg-12 m-project-page__col--no-padding-lg-right m-project-page__col--no-padding-lg-left">
          <MoreProjectsTable
            placeholderImageUrl={placeholderImageUrl}
            state={state}
            fetchMoreProjects={fetchMoreProjects}
            setState={setState}
          />
        </div>
      </div>
    </>
  );
};
export default ProjectsPage;
