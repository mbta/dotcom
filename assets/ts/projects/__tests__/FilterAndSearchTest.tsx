import React from "react";
import { mount } from "enzyme";
import FilterAndSearch from "../components/FilterAndSearch";
import { State } from "../components/ProjectsPage";

/* eslint-disable camelcase */
const body = '<div id="react-root"></div>';

it("allows filtering by mode", () => {
  document.body.innerHTML = body;

  const modeSpy = jest.fn();
  const lineSpy = jest.fn();

  const state: State = {
    featuredProjects: [],
    projects: [],
    projectUpdates: [],
    banner: null,
    fetchInProgress: false,
    offsetStart: 0
  };

  const wrapper = mount(
    <FilterAndSearch
      state={state}
      setState={() => {}}
      updateSelectedLine={lineSpy}
      updateSelectedMode={modeSpy}
    />
  );

  wrapper.find("#mode-button__subway").simulate("click");
  expect(modeSpy).toHaveBeenCalled();
});
