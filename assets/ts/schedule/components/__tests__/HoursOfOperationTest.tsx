import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import { RAPID_TRANSIT } from "../../../models/route";
import { EnhancedRoute } from "../../../__v3api";
import HoursOfOperation from "../HoursOfOperation";
import { SchedulePDF } from "../__schedule";

describe("HoursOfOperation", () => {
  beforeEach(() => {
    createReactRoot();
  });

  it("doesn't render if there are no hours", () => {
    const route = { id: "Silver", description: "Bus Service" } as EnhancedRoute;
    const tree = renderer
      .create(
        <HoursOfOperation
          hours=""
          pdfs={[]}
          route={route}
          scheduleNote={null}
        />
      )
      .toJSON();
    expect(tree).toBeNull();
  });

  it("renders the hours of operation if the are passed", () => {
    const route = { id: "Silver", description: "Bus Service" } as EnhancedRoute;
    const tree = renderer
      .create(
        <HoursOfOperation
          hours={"These are hours"}
          pdfs={[]}
          route={route}
          scheduleNote={null}
        />
      )
      .toJSON();
    expect(tree).not.toBeNull();
    expect(JSON.stringify(tree)).toMatch("These are hours");
  });

  it("renders the green line schedule if route is green line", () => {
    const route = { id: "Green", description: "Bus Service" } as EnhancedRoute;
    const tree = renderer
      .create(
        <HoursOfOperation
          hours={"These are hours"}
          pdfs={[{ url: "URL" } as SchedulePDF]}
          route={route}
          scheduleNote={null}
        />
      )
      .toJSON();
    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("B Line Schedule");
    expect(treeString).toMatch("C Line Schedule");
    expect(treeString).toMatch("D Line Schedule");
    expect(treeString).toMatch("E Line Schedule");
  });

  it("renders the rapid transit schedule if route rapid transit", () => {
    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const tree = renderer
      .create(
        <HoursOfOperation
          hours={"These are hours"}
          pdfs={[{ url: "URL" } as SchedulePDF]}
          route={route}
          scheduleNote={null}
        />
      )
      .toJSON();
    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("Today's Service");
  });
});
