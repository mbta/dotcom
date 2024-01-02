import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import { Teaser as Project } from "../../__cms";
import MoreProjectsTable, {
  tableHeaderText
} from "../components/MoreProjectsTable";
import { Mode } from "../../__v3api";

/* eslint-disable camelcase */
const body = '<div id="react-root"></div>';

const project: Project = {
  date: "2018-06-02",
  id: 1234,
  image: { url: "http://www.example.com/some.gif", alt: "Photo of stuff" },
  path: "http://www.mbta.com/awesome_project",
  routes: [
    { mode: "subway", id: "Red", group: "line" },
    { mode: "bus", id: "16", group: "route" }
  ],
  status: null,
  text: "This project will make everything perfect forever.",
  title: "The Awesome Project"
};

it("renders", () => {
  const state = {
    banner: null,
    featuredProjects: [],
    fetchInProgress: false,
    projects: [project],
    projectUpdates: [],
    offsetStart: 0
  };

  createReactRoot();
  const tree = renderer
    .create(
      <MoreProjectsTable
        state={state}
        placeholderImageUrl={"https://www.example.com/aphoto.jpg"}
        setState={f => f}
        fetchMoreProjects={f => f}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("has the right header text", () => {
  const state = {
    banner: project,
    featuredProjects: [],
    fetchInProgress: false,
    projects: [],
    projectUpdates: [],
    offsetStart: 0
  };

  expect(tableHeaderText({ ...state, currentMode: "bus" })).toEqual("Bus");
  expect(tableHeaderText({ ...state, currentMode: "commuter_rail" })).toEqual(
    "Commuter Rail"
  );
  expect(tableHeaderText({ ...state, currentMode: "ferry" })).toEqual("Ferry");
  expect(tableHeaderText({ ...state, currentMode: "subway" })).toEqual(
    "Subway"
  );
  expect(tableHeaderText({ ...state, currentMode: undefined })).toEqual("More");
  expect(
    tableHeaderText({ ...state, currentMode: "something-else" as Mode })
  ).toEqual("");
});

it("triggers event when clicked", () => {
  document.body.innerHTML = body;

  const spy = jest.fn();

  const state = {
    banner: null,
    featuredProjects: [],
    fetchInProgress: false,
    projects: [project],
    projectUpdates: [],
    offsetStart: 0
  };

  const wrapper = mount(
    <MoreProjectsTable
      state={state}
      placeholderImageUrl={"https://www.example.com/aphoto.jpg"}
      setState={f => f}
      fetchMoreProjects={spy}
    />
  );

  wrapper.find(".m-more-projects__show-more-button").simulate("click");
  expect(spy).toHaveBeenCalled();
});

it("returns null if there are no projects", () => {
  const state = {
    banner: project,
    featuredProjects: [],
    fetchInProgress: false,
    projects: [],
    projectUpdates: [],
    offsetStart: 0
  };

  const wrapper = mount(
    <MoreProjectsTable
      state={state}
      placeholderImageUrl={"https://www.example.com/aphoto.jpg"}
      setState={f => f}
      fetchMoreProjects={() => {}}
    />
  );
  expect(wrapper.html()).toBeNull();
});
