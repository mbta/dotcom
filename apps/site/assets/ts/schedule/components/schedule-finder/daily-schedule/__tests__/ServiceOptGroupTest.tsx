import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { services } from "../../../../../helpers/__tests__/service-test";
import ServiceOptGroup from "../ServiceOptGroup";

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
