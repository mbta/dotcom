import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import ServiceOptGroup from "../components/schedule-finder/ServiceOptGroup";
import { services } from "../../../ts/helpers/__tests__/service-test";

describe("ServiceOptGroup", () => {
  it("renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <ServiceOptGroup
          label={"Group label"}
          services={services}
          multipleWeekdays={false}
          now=""
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("returns null if no services", () => {
    createReactRoot();
    const tree = renderer.create(
      <ServiceOptGroup
        label={""}
        services={[]}
        multipleWeekdays={false}
        now=""
      />
    );
    expect(tree.toJSON()).toBeNull();
  });
});
