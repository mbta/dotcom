import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import ServiceOptGroup from "../components/schedule-finder/ServiceOptGroup";

describe("ServiceOptGroup", () => {
  it("returns null if no services", () => {
    createReactRoot();
    const tree = renderer.create(
      <ServiceOptGroup
        group={"holiday"}
        label={"This label does not appear"}
        services={[]}
        multipleWeekdays={false}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });
});
