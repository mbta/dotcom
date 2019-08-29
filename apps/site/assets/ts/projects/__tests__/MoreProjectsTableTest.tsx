import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { SimpleProject as Project } from "../components/__projects";
import MoreProjectsTable, { tableHeaderText} from "../components/MoreProjectsTable";

const project: Project = 
  {
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

const projects: Project[] = [project];

it("renders", () => {
  const state = {
    banner: null,
    featuredProjects: [],
    fetchInProgress: false,
    projects: [],
    projectUpdates: []
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
    projectUpdates: []
  };

  expect(tableHeaderText({...state, currentMode: "bus"})).toEqual("Bus");
  expect(tableHeaderText({...state, currentMode: "commuter_rail"})).toEqual("Commuter Rail");
  expect(tableHeaderText({...state, currentMode: "ferry"})).toEqual("Ferry");
  expect(tableHeaderText({...state, currentMode: "subway"})).toEqual("Subway");
});
