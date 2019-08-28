import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { SimpleProject as Project } from "../components/__projects";
import MoreProjectsTable from "../components/MoreProjectsTable";

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
