import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import ScheduleNote from "../components/ScheduleNote";

const scheduleNoteData = {
  offpeak_service: "8-12 minutes",
  peak_service: "5 minutes",
  exceptions: [
    { service: "26 minutes", type: "weekend mornings and late night" }
  ]
};

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<ScheduleNote scheduleNote={scheduleNoteData} className="test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders without service exceptions", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <ScheduleNote
        scheduleNote={{ ...scheduleNoteData, exceptions: [] }}
        className="test"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
