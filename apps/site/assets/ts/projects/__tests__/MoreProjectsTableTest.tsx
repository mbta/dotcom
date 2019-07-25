import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import MoreProjectsTable from "../components/MoreProjectsTable";
import { Project } from "../components/Project";

const projects: Project[] = [
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
  }
];

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<MoreProjectsTable projects={projects} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
