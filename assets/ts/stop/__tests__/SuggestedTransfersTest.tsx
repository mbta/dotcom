import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import stopData from "./stopData.json";
import { StopPageData } from "../components/__stop";
import SuggestedTransfers from "../components/SuggestedTransfers";
import { createReactRoot } from "../../app/helpers/testUtils";

const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

it("skipped when suggestest transfers is empty", () => {
  createReactRoot();

  const tree = renderer
    .create(<SuggestedTransfers suggestedTransfers={[]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders", () => {
  createReactRoot();

  const tree = renderer
    .create(
      <SuggestedTransfers suggestedTransfers={data.suggested_transfers} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders the correct link and route name based on direction", () => {
  const wrapper = mount(
    <SuggestedTransfers suggestedTransfers={data.suggested_transfers} />
  );

  expect(wrapper.find(".c-stop-card").length).toBe(3);

  // show direction_destinations at index 0 because direction is 0, include direction in link
  const firstTransfer = wrapper.find(".c-stop-card").at(0);
  const firstTransferRoute = firstTransfer.find(".c-stop-card__route").at(0);
  expect(
    data.suggested_transfers[0].routes_with_direction[0].direction_id
  ).toBe(0);
  expect(firstTransferRoute.text()).toContain(
    data.suggested_transfers[0].routes_with_direction[0].route
      .direction_destinations[0]
  );
  expect(firstTransferRoute.html()).toContain(
    'href="/schedules/1?direction_id=0"'
  );

  // show route name because direction is null, do not include link
  const secondTransfer = wrapper.find(".c-stop-card").at(1);
  const secondTransferRoute = secondTransfer.find(".c-stop-card__route").at(0);
  expect(
    data.suggested_transfers[1].routes_with_direction[0].direction_id
  ).toBe(null);
  expect(secondTransferRoute.text()).toContain(
    data.suggested_transfers[1].routes_with_direction[0].route.name
  );
  expect(secondTransferRoute.html()).toContain('href="/schedules/64"');
});
