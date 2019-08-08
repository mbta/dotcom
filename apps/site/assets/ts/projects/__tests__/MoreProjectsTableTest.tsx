import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { SimpleProject as Project } from "../components/__projects";
import MoreProjectsTable, {
  fetchMoreProjects
} from "../components/MoreProjectsTable";

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

const secondPageProjects: Project[] = [
  {
    date: "2018-06-03",
    id: 2345,
    image: {
      url: "http://www.example.com/another.gif",
      alt: "Photo of different"
    },
    path: "http://www.mbta.com/good_project",
    routes: [{ mode: "subway", id: "Blue", group: "line" }],
    status: null,
    text: "Some decent Blue Line project. Lorem ipsum and so on.",
    title: "Good Project"
  },
  {
    date: "2018-06-04",
    id: 3456,
    image: null,
    path: "http://www.mbta.com/mediocre_project",
    routes: [{ mode: "subway", id: "Orange", group: "line" }],
    status: null,
    text: "Change a light bulb at Forest Hills.",
    title: "Mediocre Light Bulb Project"
  }
];

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <MoreProjectsTable
        projects={projects}
        placeholderImageUrl={"https://www.example.com/aphoto.jpg"}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("paginates", async () => {
  window.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve: Function) =>
        resolve({
          body: "pretend this is secondPageProjects in JSON format",
          json: () => secondPageProjects,
          ok: true,
          status: 200,
          statusText: "OK"
        })
      )
  );

  const state = { projects: projects, fetchInProgress: false };
  const dispatchSpy = jest.fn();

  await await fetchMoreProjects(state, dispatchSpy);
  expect(dispatchSpy).toHaveBeenCalledTimes(2);
  expect(dispatchSpy).toHaveBeenCalledWith({
    projects: projects,
    fetchInProgress: true
  });
  expect(dispatchSpy).toHaveBeenCalledWith({
    projects: projects.concat(secondPageProjects),
    fetchInProgress: false
  });
});
