import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import SubwayFilter from "../components/SubwayFilter";

import {
  State,
  updateSelectedLine,
  SubwayLine
} from "../components/ProjectsPage";
import { mount } from "enzyme";

const body = '<div id="react-root"></div>';
const state: State = {
  projects: [],
  fetchInProgress: false,
  banner: null,
  featuredProjects: [],
  projectUpdates: [],
  offsetStart: 0,
  currentMode: "subway"
};
it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <SubwayFilter
        state={state}
        setState={f => f}
        updateSelectedLine={f => f}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("allows filtering by line", () => {
  document.body.innerHTML = body;

  const lineSpy = jest.fn();

  const wrapper = mount(
    <SubwayFilter
      state={state}
      setState={f => f}
      updateSelectedLine={lineSpy}
    />
  );

  wrapper.find("#mode-button__blue").simulate("click");
  expect(lineSpy).toHaveBeenCalled();
});

window.fetch = jest.fn().mockImplementation(
  () =>
    new Promise((resolve: Function) =>
      resolve({
        body: "some other data",
        json: () => ({
          featuredProjects: [],
          projects: [],
          projectUpdates: [],
          offsetStart: 0
        }),
        ok: true,
        status: 200,
        statusText: "OK"
      })
    )
);

it("updates selected line", async () => {
  const state = {
    projects: [],
    fetchInProgress: false,
    banner: null,
    featuredProjects: [],
    projectUpdates: [],
    offsetStart: 0
  };
  const dispatchSpy1 = jest.fn();
  const dispatchSpy2 = jest.fn();

  await await updateSelectedLine(state, "blue", dispatchSpy1);
  expect(dispatchSpy1).toHaveBeenCalledTimes(2);
  expect(dispatchSpy1).toHaveBeenCalledWith({
    ...state,
    fetchInProgress: true
  });
  expect(dispatchSpy1).toHaveBeenCalledWith({
    ...state,
    banner: undefined,
    featuredProjects: [],
    projects: [],
    projectUpdates: [],
    currentLine: "blue",
    fetchInProgress: false
  });

  const updatedState = { ...state, currentLine: "blue" as SubwayLine };
  await await updateSelectedLine(updatedState, "blue", dispatchSpy2);
  expect(dispatchSpy2).toHaveBeenCalledTimes(2);
  expect(dispatchSpy2).toHaveBeenCalledWith({
    ...updatedState,
    fetchInProgress: true
  });
  expect(dispatchSpy2).toHaveBeenCalledWith({
    ...updatedState,
    banner: undefined,
    featuredProjects: [],
    projects: [],
    projectUpdates: [],
    currentLine: undefined,
    fetchInProgress: false
  });
});
