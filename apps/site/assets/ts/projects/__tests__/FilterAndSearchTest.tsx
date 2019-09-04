import React from "react";
import { mount } from "enzyme";
import FilterAndSearch from "../components/FilterAndSearch";
import { State } from "../components/ProjectsPage";

/* eslint-disable @typescript-eslint/camelcase */
const body = '<div id="react-root"></div>';

it("click mode", () => {
  document.body.innerHTML = body;

  const spy = jest.fn();

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
      updateSelectedMode={spy}
    />
  );

  wrapper.find("#mode-button__subway").simulate("click");
  expect(spy).toHaveBeenCalled();
});
