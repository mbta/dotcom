import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { Teaser as Project } from "../../__cms";
import ProjectsPage, {
  fetchMoreProjects,
  updateSelectedMode
} from "../components/ProjectsPage";

const bannerTeaser: Project = {
  title: "Better Bus Project",
  text:
    "Too many of our bus routes still fail to live up to our own standards. Through the Better Bus Project, we are changing that.",
  status: null,
  routes: [
    {
      mode: "bus",
      id: "35",
      group: "route"
    },
    {
      mode: "bus",
      id: "36",
      group: "route"
    }
  ],
  path: "/projects/better-bus-project",
  image: {
    url:
      "https://live-mbta.pantheonsite.io/sites/default/files/styles/teaser/public/projects/betterbus/betterbus-banner-large.png?itok=qWyWNEZq",
    alt: "Better Bus Project: Making transit better together"
  },
  id: 3445,
  date: "2019-07-30"
};

const featuredProjects: Project[] = [
  {
    date: "2018-05-01",
    id: 1234,
    image: {
      url: "https://www.imagehost.com/pictureofatrain.jpg",
      alt: "Picture of a train. Choo choo!"
    },
    path: "/choo-choo",
    routes: [
      { mode: "bus", id: "123", group: "route" },
      { mode: "commuter_rail", id: "CR-Anyplace", group: "line" }
    ],
    title: "New choo-choos!",
    text: "We bought new trains. Choo choo!",
    status: null
  },
  {
    date: "2018-04-01",
    id: 2345,
    image: {
      url: "https://www.imagehost.com/pictureofworkers.jpg",
      alt: "People fixing track or something"
    },
    path: "/fixing-track",
    routes: [{ mode: "subway", id: "Blue", group: "line" }],
    title: "Track fixing",
    text: "We're fixing the track. It needs it.",
    status: null
  },
  {
    date: "2018-03-01",
    id: 3456,
    image: {
      url: "https://www.imagehost.com/pictureofastation.jpg",
      alt: "Facade of East Station"
    },
    path: "/east-station",
    routes: [{ mode: "subway", id: "Red", group: "line" }],
    title: "East Station opening",
    text: "We opened East Station, even though it's on the harbor floor.",
    status: null
  }
];

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

const projectUpdates: Project[] = [
  {
    date: "2018-07-03",
    id: 3456,
    image: {
      url: "http://www.example.com/photo.jpg",
      alt: "Still another project photo"
    },
    path: "http://www.mbta.com/project_update_1",
    routes: [{ mode: "subway", id: "Blue", group: "line" }],
    status: null,
    text: "Lorem ipsum dolor sic amet.",
    title: "Still Another Project"
  },
  {
    date: "2018-06-04",
    id: 4567,
    image: null,
    path: "http://www.mbta.com/project_update_2",
    routes: [{ mode: "subway", id: "Orange", group: "line" }],
    status: null,
    text: "Some subway project update.",
    title: "Another Update"
  }
];

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <ProjectsPage
        initialBanner={bannerTeaser}
        initialFeaturedProjects={featuredProjects}
        initialProjectUpdates={[]}
        initialProjects={projects}
        placeholderImageUrl="path-to-some-image"
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

  const state = {
    projects: projects,
    fetchInProgress: false,
    banner: null,
    featuredProjects: [],
    projectUpdates: [],
    offsetStart: 0
  };
  const dispatchSpy = jest.fn();

  await await fetchMoreProjects(state, dispatchSpy);
  expect(dispatchSpy).toHaveBeenCalledTimes(2);
  expect(dispatchSpy).toHaveBeenCalledWith({
    ...state,
    fetchInProgress: true
  });
  expect(dispatchSpy).toHaveBeenCalledWith({
    ...state,
    projects: projects.concat(secondPageProjects),
    fetchInProgress: false
  });
});

it("filters", async () => {
  window.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve: Function) =>
        resolve({
          body: "pretend this is secondPageProjects in JSON format",
          json: () => ({
            featuredProjects: featuredProjects.slice(1),
            projects: projects,
            projectUpdates: projectUpdates,
            offsetStart: 0
          }),
          ok: true,
          status: 200,
          statusText: "OK"
        })
      )
  );

  const state = {
    projects: [],
    fetchInProgress: false,
    banner: null,
    featuredProjects: [],
    projectUpdates: [],
    offsetStart: 0
  };
  const dispatchSpy = jest.fn();

  await await updateSelectedMode(state, "subway", dispatchSpy);
  expect(dispatchSpy).toHaveBeenCalledTimes(2);
  expect(dispatchSpy).toHaveBeenCalledWith({
    ...state,
    fetchInProgress: true
  });
  expect(dispatchSpy).toHaveBeenCalledWith({
    ...state,
    banner: featuredProjects[1],
    featuredProjects: [featuredProjects[2]],
    projects: projects,
    projectUpdates: projectUpdates,
    currentMode: "subway",
    fetchInProgress: false
  });
});
