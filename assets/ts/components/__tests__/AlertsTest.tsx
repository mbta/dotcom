import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Alerts, { alertLabel, iconForAlert, humanLifecycle } from "../Alerts";
import { enzymeToJsonWithoutProps } from "../../app/helpers/testUtils";
import { Alert, InformedEntitySet } from "../../__v3api";
import { fireEvent, render, screen } from "@testing-library/react";

/* eslint-disable camelcase */
const body = '<div id="react-root"></div>';

const highAlert: Alert = {
  updated_at: "2019-04-11T09:33:00-05:00",
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
    "Affected direction:\r\nInbound\r\n\r\nAffected stops:\r\nMeridian St @ West Eagle St",
  url: "https://www.mbta.com",
  banner: null
};

const lowAlert: Alert = {
  updated_at: "2019-04-11T09:33:00-05:00",
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

const alertUrlDesc: Alert = {
  updated_at: "2019-04-11T09:33:00-05:00",
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
    "<strong>Affected direction:</strong><br />Inbound<br />\r<br /><strong>Affected stops:</strong><br />Meridian St @ West Eagle St \r\n See more: www.mbta.com/help.",
  url: null,
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

test("it sets the url in the description", () => {
  render(<Alerts alerts={[alertUrlDesc]} />);

  fireEvent.click(screen.getByText(/Route 170.*/));

  expect(screen.getByText("MBTA.com/help")).toBeInTheDocument();
});

test("It does not create links out of emails", () => {
  render(
    <Alerts alerts={[{ ...alertUrlDesc, description: "test@mbta.com" }]} />
  );

  fireEvent.click(screen.getByText(/Route 170.*/));

  expect(screen.getByText("test@mbta.com")).toBeInTheDocument();
  expect(screen.queryByText('"test@mbta.com')).toBeNull();
});

test("it has no dropdown when alert has no description", () => {
  const noDescriptionAlert = { ...highAlert, description: "" };
  const wrapper = mount(<Alerts alerts={[noDescriptionAlert]} />);
  expect(wrapper.contains("c-alert-item__top-caret-container")).toBeFalsy();
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

  describe("humanLifecycle", () => {
    it("returns correct value for others", () => {
      let label = humanLifecycle("ongoing_upcoming");
      expect(label).toMatch("Upcoming");
      label = humanLifecycle("ongoing");
      expect(label).toMatch("Ongoing");
      label = humanLifecycle("upcoming");
      expect(label).toMatch("Upcoming");
      label = humanLifecycle("new");
      expect(label).toBeNull();
      label = humanLifecycle("unknown");
      expect(label).toBeNull();
      label = humanLifecycle("something" as any);
      expect(label).toBeNull();
    });
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
