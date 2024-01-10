import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import MoreProjectsRow, { routesToTags } from "../components/MoreProjectsRow";
import { shallow } from "enzyme";

const id = 12345;

const image = {
  url: "http://cloudfront.com/mbta_pic.gif",
  alt: "Picture of the new Mauve Line train"
};

const path = "http://www.mbta.com/new_mauve_line";

const title = "New Mauve Line trains";

const text =
  "The Mauve Line connects Lynn to Braintree with a stop in Worcester.";

const date = "2018-05-01";

const status = "Contract awarded";

const routes = [
  { mode: "bus", id: "123", group: "route" },
  { mode: "commuter_rail", id: "CR-Anyplace", group: "line" },
  { mode: "ferry", id: "Boat-Somewhere", group: "line" },
  { mode: "subway", id: "subway", group: "mode" },
  { mode: "subway", id: "Blue", group: "line" },
  { mode: "subway", id: "Green", group: "line" },
  { mode: "subway", id: "Green-B", group: "line" },
  { mode: "subway", id: "Green-C", group: "line" },
  { mode: "subway", id: "Green-D", group: "line" },
  { mode: "subway", id: "Green-E", group: "line" },
  { mode: "subway", id: "Mattapan", group: "line" },
  { mode: "subway", id: "Orange", group: "line" },
  { mode: "subway", id: "Red", group: "line" },
  { mode: "bus", id: "746", group: "line" }
];

const placeholderImageUrl = "https://www.example.com/someimage.gif";

it("renders with route icons and status", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <MoreProjectsRow
        image={image}
        path={path}
        title={title}
        text={text}
        date={date}
        id={id}
        status={status}
        routes={routes}
        placeholderImageUrl={placeholderImageUrl}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a placeholder image for a project with no teaser image", () => {
  const wrapper = shallow(
    <MoreProjectsRow
      image={null}
      path={path}
      title={title}
      text={text}
      date={date}
      id={id}
      status={null}
      routes={routes}
      placeholderImageUrl={placeholderImageUrl}
    />
  );

  const actualSrc = wrapper.find("img").prop("src");
  expect(actualSrc).toEqual(placeholderImageUrl);
});

it("returns an empty list of tags if no routes given", () => {
  expect(routesToTags([])).toEqual([]);
});
