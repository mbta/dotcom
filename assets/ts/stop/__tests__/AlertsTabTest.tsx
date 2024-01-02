import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Alert, InformedEntitySet } from "../../__v3api";
import { AlertsTab as AlertsTabType } from "../components/__stop";
import AlertsTab from "../components/AlertsTab";

/* eslint-disable camelcase */
const highAlert: Alert = {
  updated_at: "Updated: 4/11/2019 09:33A",
  severity: 7,
  priority: "high",
  lifecycle: "new",
  active_period: [],
  informed_entity: {} as InformedEntitySet,
  id: "304666",
  header:
    "Route 170 will be rerouted at certain times during the Marathon on Monday, April 15.",
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

const alertsTab: AlertsTabType = {
  current: {
    alerts: [],
    empty_message: "No current alerts"
  },
  upcoming: {
    alerts: [],
    empty_message: "No upcoming alerts"
  },
  all: {
    alerts: [],
    empty_message: "No alerts"
  },
  initial_selected: "all"
};
/* eslint-enable camelcase */

const allId = "#all";
const upcomingId = "#upcoming";
const currentId = "#current";

describe("AlertsTab", () => {
  test("it renders", () => {
    document.body.innerHTML =
      '<div><div id="react-root"><div id="test"></div></div></div>';

    const tree = renderer.create(<AlertsTab alertsTab={alertsTab} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("it handles no initial filter for time filters", () => {
    const wrapper = mount(
      // eslint-disable-next-line camelcase
      <AlertsTab alertsTab={{ ...alertsTab, initial_selected: "" }} />
    );
    expect(wrapper.find(".callout").html()).toMatch("No alerts");
  });

  test("it handles Enter on time filters", () => {
    const wrapper = mount(<AlertsTab alertsTab={alertsTab} />);
    wrapper.find(upcomingId).simulate("keypress", { key: "Enter" });
    expect(wrapper.find(".callout").html()).toMatch("No upcoming alerts");
    wrapper.find(allId).simulate("keypress", { key: "Enter" });
    expect(wrapper.find(".callout").html()).toMatch("No alerts");
    wrapper.find(currentId).simulate("keypress", { key: "Enter" });
    expect(wrapper.find(".callout").html()).toMatch("No current alerts");
  });

  test("it handles Clicks on time filters", () => {
    const wrapper = mount(<AlertsTab alertsTab={alertsTab} />);
    wrapper.find(upcomingId).simulate("click");
    expect(wrapper.find(".callout").html()).toMatch("No upcoming alerts");
    wrapper.find(allId).simulate("click");
    expect(wrapper.find(".callout").html()).toMatch("No alerts");
    wrapper.find(currentId).simulate("click");
    expect(wrapper.find(".callout").html()).toMatch("No current alerts");
  });

  test("it displays alerts", () => {
    const alerts = {
      ...alertsTab,
      all: {
        alerts: [highAlert, lowAlert],
        // eslint-disable-next-line camelcase
        empty_message: alertsTab.all.empty_message
      }
    };
    const wrapper = mount(<AlertsTab alertsTab={alerts} />);
    expect(wrapper.find(".c-alert-group").html()).toMatch("Route 170");
    expect(wrapper.find(".callout").exists()).toBeFalsy();
  });
});
