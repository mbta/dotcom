import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { services } from "../../../../../helpers/__tests__/service-test";
import { Service } from "../../../../../__v3api";
import ServiceOptGroup from "../ServiceOptGroup";

describe("ServiceOptGroup", () => {
  it("renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <ServiceOptGroup
          label={"Group label"}
          services={services}
          todayServiceId=""
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("returns null if no services", () => {
    createReactRoot();
    const tree = renderer.create(
      <ServiceOptGroup label={""} services={[]} todayServiceId="" />
    );
    expect(tree.toJSON()).toBeNull();
  });

  const makeSimpleService = (
    [start_date, end_date]: [string, string],
    [rating_start_date, rating_end_date]: [string, string],
    name: string,
    id: string
  ): Service => ({
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date,
    removed_dates_notes: {},
    removed_dates: [],
    name,
    id,
    end_date,
    description: `${name} schedule`,
    added_dates_notes: {},
    added_dates: [],
    rating_start_date,
    rating_end_date,
    rating_description: "Test Rating"
  });

  const servicesList: Service[] = [
    makeSimpleService(
      ["2019-04-01", "2019-05-01"],
      ["2019-04-01", "2019-08-01"],
      "Spring",
      "s"
    ),
    makeSimpleService(
      ["2019-06-01", "2019-07-01"],
      ["2019-04-01", "2019-08-01"],
      "First Summer",
      "fs"
    ),
    makeSimpleService(
      ["2019-08-06", "2019-09-01"],
      ["2019-08-01", "2019-10-01"],
      "Second Summer",
      "ss"
    )
  ];

  it("adds (now) to today's service based on todayServiceId prop", () => {
    const wrapper = mount(
      <ServiceOptGroup
        label={"Test services"}
        services={servicesList.concat(
          makeSimpleService(
            ["2019-09-06", "2019-10-01"],
            ["2019-09-01", "2019-11-01"],
            "Current Summer",
            "n"
          )
        )}
        todayServiceId="n"
        nowDate={new Date("2019-09-07")}
      />
    );
    expect(wrapper.text()).toContain(
      "Current Summer schedule, Test Rating (now)"
    );
  });

  it("adds (starting date) to today's service based on todayServiceId prop if service hasn't yet started", () => {
    const wrapper = mount(
      <ServiceOptGroup
        label={"Test services"}
        services={servicesList}
        todayServiceId="fs"
      />
    );
    expect(wrapper.text()).toContain(
      "First Summer schedule, Test Rating (Starting June 1, 2019)"
    );
  });

  it("does not mark any service as (now) if no current services", () => {
    const wrapper = mount(
      <ServiceOptGroup
        label={"Test services"}
        services={servicesList}
        todayServiceId=""
      />
    );
    expect(wrapper.text()).not.toContain("(now)");
  });
});
