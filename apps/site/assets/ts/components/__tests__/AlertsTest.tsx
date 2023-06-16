import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Alerts, {
  iconForAlert,
  alertLabel,
  humanLabelForAlert
} from "../Alerts";
import { enzymeToJsonWithoutProps } from "../../app/helpers/testUtils";
import { Alert, InformedEntitySet } from "../../__v3api";
import { isAmenityAlert } from "../../models/alert";

/* eslint-disable camelcase */
const body = '<div id="react-root"></div>';

const highAlert: Alert = {
  updated_at: "Updated: 4/11/2019 09:33A",
  severity: 7,
  priority: "high",
  lifecycle: "new",
  active_period: [],
  informed_entity: {} as InformedEntitySet,
  id: "304666",
  header:
    'Route 170 will be rerouted at certain times during the Marathon on Monday, April 15. More: <a href="https://mbta.com/marathon">mbta.com/marathon</a>',
  effect: "detour",
  description:
    "<strong>Affected direction:</strong><br />Inbound<br />\r<br /><strong>Affected stops:</strong><br />Meridian St @ West Eagle St",
  url: "https://www.mbta.com",
  banner: null
};

const lowAlert: Alert = {
  updated_at: "Updated: 4/11/2019 09:33A",
  severity: 7,
  priority: "low",
  lifecycle: "upcoming",
  active_period: [],
  informed_entity: {} as InformedEntitySet,
  id: "00005",
  header: "There is construction at this station.",
  effect: "other",
  description: "",
  url: "https://www.mbta.com",
  banner: null
};

test("handle click to expand and enter to collapse", () => {
  document.body.innerHTML = body;

  const id = `#alert-${highAlert.id}`;

  const wrapper = mount(<Alerts alerts={[highAlert]} />);

  expect(wrapper.find(id).prop("aria-expanded")).toEqual(false);

  wrapper.find(id).simulate("click");

  expect(wrapper.find(id).prop("aria-expanded")).toEqual(true);

  wrapper.find(id).simulate("keypress", { key: "Enter" });

  expect(wrapper.find(id).prop("aria-expanded")).toEqual(false);
});

test("it renders", () => {
  document.body.innerHTML = body;

  const id = `#alert-${highAlert.id}`;

  const wrapper = mount(<Alerts alerts={[highAlert, lowAlert]} />);

  wrapper.find(id).simulate("click");
  wrapper.find(`#alert-${lowAlert.id}`).simulate("click");

  expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
});

test("it includes the URL field when it exists", () => {
  document.body.innerHTML = body;

  const highAlertID = `#alert-${highAlert.id}`;

  let wrapper = mount(<Alerts alerts={[highAlert]} />);

  wrapper.find(highAlertID).simulate("click");
  expect(wrapper.html()).toContain(
    `<a href="https://www.mbta.com" target="_blank">MBTA.com</a>`
  );

  wrapper.unmount();

  wrapper = mount(<Alerts alerts={[{ ...highAlert, url: null }]} />);

  wrapper.find(highAlertID).simulate("click");
  expect(wrapper.find("a")).toEqual({});
});

describe("iconForAlert", () => {
  test("renders no icon for low priority alerts", () => {
    expect(iconForAlert(lowAlert)).toBeNull();
  });

  test("renders cancelled icon for suspension and cancellation alerts", () => {
    const icon = iconForAlert({ ...highAlert, effect: "suspension" });
    expect(JSON.stringify(renderer.create(icon!).toJSON())).toMatch(
      "cancelled-default"
    );
    expect(
      JSON.stringify(
        renderer
          .create(iconForAlert({ ...highAlert, effect: "cancellation" })!)
          .toJSON()
      )
    ).toMatch("cancelled-default");
  });

  test("renders snow icon for snow alerts", () => {
    const icon = iconForAlert({ ...highAlert, effect: "snow_route" });
    expect(JSON.stringify(renderer.create(icon!).toJSON())).toMatch(
      "snow-default"
    );
  });

  test("renders shuttle icon for shuttle alerts", () => {
    const icon = iconForAlert({ ...highAlert, effect: "shuttle" });
    expect(JSON.stringify(renderer.create(icon!).toJSON())).toMatch(
      "shuttle-default"
    );
  });

  test("renders alert icon for system alerts", () => {
    const icon = iconForAlert({
      ...highAlert,
      priority: "system",
      effect: "suspension"
    });
    expect(JSON.stringify(renderer.create(icon!).toJSON())).toMatch(
      "alerts-triangle"
    );
  });
});

describe("alertLabel", () => {
  test("it returns a system label for system alerts", () => {
    const label = alertLabel({
      ...highAlert,
      priority: "system",
      lifecycle: "ongoing_upcoming"
    });
    const labelComponent = JSON.stringify(renderer.create(label!).toJSON());
    expect(labelComponent).toMatch("badge--system");
    expect(labelComponent).toMatch("badge--upcoming");
  });
});

describe("humanLabelForAlert", () => {
  it("returns nothing for levels 0 - 2", () => {
    let label = humanLabelForAlert({
      ...highAlert,
      effect: "delay",
      severity: 0
    });
    expect(label).toBeNull();
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 1 });
    expect(label).toBeNull();
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 2 });
    expect(label).toBeNull();
  });

  it("returns correct value for others", () => {
    let label = humanLabelForAlert({
      ...highAlert,
      effect: "delay",
      severity: 3
    });
    expect(label).toMatch("10");
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 4 });
    expect(label).toMatch("15");
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 5 });
    expect(label).toMatch("20");
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 6 });
    expect(label).toMatch("25");
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 7 });
    expect(label).toMatch("30");
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 8 });
    expect(label).toMatch("30+");
    label = humanLabelForAlert({ ...highAlert, effect: "delay", severity: 9 });
    expect(label).toMatch("more than an hour");
    label = humanLabelForAlert({ ...highAlert, severity: 2 });
    expect(label).toBeNull();
    label = humanLabelForAlert({
      ...highAlert,
      lifecycle: "ongoing",
      severity: 7
    });
    expect(label).toMatch("Ongoing");
    label = humanLabelForAlert({
      ...highAlert,
      effect: "delay",
      severity: -1
    });
    expect(label).toBeNull();
    label = humanLabelForAlert({
      ...highAlert,
      effect: "delay",
      severity: -1,
      // @ts-ignore
      lifecycle: "madeup"
    });
    expect(label).toBeNull();
  });
});

describe("isAmenityAlert", () => {
  it("returns true only when an alert is an amenity", () => {
    expect(isAmenityAlert({ ...highAlert, effect: "suspension", severity: 4 }))
      .toBeFalsy;
    expect(
      isAmenityAlert({ ...highAlert, effect: "parking_issue", severity: 4 })
    ).toBeTruthy;
    expect(
      isAmenityAlert({ ...highAlert, effect: "elevator_closure", severity: 4 })
    ).toBeTruthy;
    expect(
      isAmenityAlert({ ...highAlert, effect: "escalator_closure", severity: 4 })
    ).toBeTruthy;
    expect(
      isAmenityAlert({ ...highAlert, effect: "parking_closure", severity: 4 })
    ).toBeTruthy;
    expect(isAmenityAlert({ ...highAlert, effect: "bike_issue", severity: 4 }))
      .toBeTruthy;
  });
});
