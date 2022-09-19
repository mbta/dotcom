import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import { Teaser as Project } from "../../__cms";
import Banner, { cmsRouteToClass } from "../components/Banner";

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
    },
    {
      mode: "bus",
      id: "37",
      group: "route"
    },
    {
      mode: "bus",
      id: "52",
      group: "route"
    },
    {
      mode: "bus",
      id: "64",
      group: "route"
    },
    {
      mode: "bus",
      id: "70",
      group: "route"
    },
    {
      mode: "bus",
      id: "70A",
      group: "route"
    },
    {
      mode: "bus",
      id: "72",
      group: "route"
    },
    {
      mode: "bus",
      id: "74",
      group: "route"
    },
    {
      mode: "bus",
      id: "75",
      group: "route"
    },
    {
      mode: "bus",
      id: "201",
      group: "route"
    },
    {
      mode: "bus",
      id: "202",
      group: "route"
    },
    {
      mode: "bus",
      id: "220",
      group: "route"
    },
    {
      mode: "bus",
      id: "222",
      group: "route"
    },
    {
      mode: "bus",
      id: "225",
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

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <Banner banner={bannerTeaser} placeholderImageUrl="path-to-some-image" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("returns null if no banner project", () => {
  const wrapper = mount(
    <Banner banner={null} placeholderImageUrl={placeholderImageUrl} />
  );
  expect(wrapper.html()).toEqual(null);
});

const placeholderImageUrl = "path-to-some-image";
it("renders with unknown background color if no routes are listed", () => {
  const wrapper = mount(
    <Banner
      banner={{ ...bannerTeaser, routes: [] }}
      placeholderImageUrl={placeholderImageUrl}
    />
  );
  const actualSrc = wrapper.find(".c-banner__content").first();
  expect(actualSrc.html()).toContain("u-bg--unknown");
});

it("renders placeholder image if there is no image", () => {
  const wrapper = mount(
    <Banner
      banner={{ ...bannerTeaser, image: null }}
      placeholderImageUrl={placeholderImageUrl}
    />
  );
  const actualSrc = wrapper.find(".c-banner__image");
  expect(actualSrc.first().html()).toContain(placeholderImageUrl);
  expect(actualSrc.last().html()).toContain(placeholderImageUrl);
});

describe("cmsRouteToClass", () => {
  const route = { mode: "", id: "", group: "" };
  it("handles routes", () => {
    expect(cmsRouteToClass({ ...route, id: "Green" })).toEqual("green-line");
    expect(cmsRouteToClass({ ...route, id: "silver_line" })).toEqual(
      "silver-line"
    );
    expect(cmsRouteToClass({ ...route, id: "mattapan" })).toEqual("mattapan");
    expect(cmsRouteToClass({ ...route, group: "custom", mode: null })).toEqual(
      "unknown"
    );
    expect(cmsRouteToClass({ ...route, group: "custom", mode: "bus" })).toEqual(
      "bus"
    );
    expect(
      cmsRouteToClass({ ...route, group: "mode", mode: "bus", id: "some_mode" })
    ).toEqual("some-mode");
    expect(
      cmsRouteToClass({ ...route, group: "line", mode: "bus", id: "Orange" })
    ).toEqual("orange-line");
    expect(cmsRouteToClass({ ...route, mode: "commuter_rail" })).toEqual(
      "commuter-rail"
    );
  });
});
