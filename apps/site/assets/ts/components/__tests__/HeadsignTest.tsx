import React from "react";
import renderer from "react-test-renderer";
import HeadsignComponent from "../Headsign";
import { createReactRoot } from "../../app/helpers/testUtils";
import { Headsign } from "../../__v3api";
import { shallow } from "enzyme";

/* eslint-disable camelcase */

it("it renders 2 predictions", () => {
  const headsign: Headsign = {
    name: "Watertown",
    headsign: "Watertown",
    times: [
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["14", " ", "min"],
          status: null,
          track: null
        }
      },
      {
        delay: 0,
        scheduled_time: ["5:00", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["44", " ", "min"],
          status: null,
          track: null
        }
      }
    ],
    train_number: null
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={1} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders in chronological order when first time is later than second time", () => {
  const headsign: Headsign = {
    name: "Watertown",
    headsign: "Watertown",
    times: [
      {
        delay: 0,
        scheduled_time: ["5:00", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["44", " ", "min"],
          status: null,
          track: null
        }
      },
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["14", " ", "min"],
          status: null,
          track: null
        }
      }
    ],
    train_number: null
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={1} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders 1 prediction for CR", () => {
  const headsign: Headsign = {
    name: "Watertown",
    headsign: "Watertown",
    times: [
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["14", " ", "min"],
          status: null,
          track: null
        }
      },
      {
        delay: 0,
        scheduled_time: ["5:00", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["44", " ", "min"],
          status: null,
          track: null
        }
      }
    ],
    train_number: null
  };

  const wrapper = shallow(
    <HeadsignComponent headsign={headsign} condensed={false} routeType={2} />
  );

  expect(wrapper.find(".m-tnm-sidebar__schedule")).toHaveLength(1);
});

it("it renders scheduled time when prediction is null", () => {
  const headsign: Headsign = {
    name: "Watertown",
    headsign: "Watertown",
    times: [
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: null
      }
    ],
    train_number: null
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={1} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it splits the headsign name when it contains 'via' ", () => {
  const headsign: Headsign = {
    name: "Watertown via Harvard Square",
    headsign: "Watertown via Harvard Square",
    times: [
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["14", " ", "min"],
          status: null,
          track: null
        }
      },
      {
        delay: 0,
        scheduled_time: ["5:00", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["44", " ", "min"],
          status: null,
          track: null
        }
      }
    ],
    train_number: null
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={1} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders a status and train name for Commuter Rail", () => {
  const headsign: Headsign = {
    name: "Framingham",
    headsign: "Framingham",
    times: [
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["4:30", " ", "PM"],
          status: "On time",
          track: null
        }
      }
    ],
    train_number: "591"
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={2} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders a status and train name for Commuter Rail with track number if available", () => {
  const headsign: Headsign = {
    name: "Framingham",
    headsign: "Framingham",
    times: [
      {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["4:30", " ", "PM"],
          status: "Now boarding",
          track: "1"
        }
      }
    ],
    train_number: "591"
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={2} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders uncondensed bus headsign name as --small", () => {
  const headsign: Headsign = {
    name: "Watertown via Copley (Express)",
    headsign: "Watertown via Copley (Express)",
    times: [
      {
        delay: 0,
        scheduled_time: ["7:00", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["14", " ", "min"],
          status: null,
          track: null
        }
      },
      {
        delay: 0,
        scheduled_time: ["7:10", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["44", " ", "min"],
          status: null,
          track: null
        }
      }
    ],
    train_number: null
  };

  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={3} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it displays delayed status for CR", () => {
  const headsign: Headsign = {
    name: "Delayed Train",
    headsign: "Delayed Train",
    train_number: "404",
    times: [
      {
        delay: 5,
        scheduled_time: ["7:00", " ", "PM"],
        prediction: {
          schedule_relationship: null,
          time: ["7:03", " ", "PM"],
          status: null,
          track: null
        }
      }
    ]
  };
  createReactRoot();
  const tree = renderer
    .create(
      <HeadsignComponent headsign={headsign} condensed={false} routeType={2} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it displays cancelled status for CR", () => {
  const headsign: Headsign = {
    name: "Cancelled Train",
    headsign: "Cancelled Train",
    train_number: "404",
    times: [
      {
        delay: 5,
        scheduled_time: ["7:00", " ", "PM"],
        prediction: {
          schedule_relationship: "cancelled",
          time: ["7:03", " ", "PM"],
          status: null,
          track: null
        }
      }
    ]
  };
  const wrapper = shallow(
    <HeadsignComponent headsign={headsign} condensed={false} routeType={2} />
  );

  expect(
    wrapper.find(".m-tnm-sidebar__time-number.strikethrough").exists()
  ).toBeTruthy();
});

it("it displays on time status with the scheduled time and not the prediction time for CR", () => {
  const headsign: Headsign = {
    name: "Worcester",
    train_number: "511",
    times: [
      {
        delay: -1,
        scheduled_time: ["10:21", " ", "AM"],
        prediction: {
          schedule_relationship: null,
          time: ["10:19", " ", "AM"],
          status: null,
          track: null
        }
      }
    ]
  };
  createReactRoot();
  const tree = renderer.create(
    <HeadsignComponent headsign={headsign} condensed={true} routeType={2} />
  );
  // should display 10:21 AM and On time
  expect(tree.toJSON()).toMatchSnapshot();
});
