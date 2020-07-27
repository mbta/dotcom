import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { DirectionId, RouteType } from "../../../../../__v3api";
import * as KeyboardEvents from "../../../../../helpers/keyboard-events";
import { TripInfo, Journey } from "../../../__trips";
import tripData from "../../__tests__/test-data/tripInfo.json";
import AccordionRow from "../AccordionRow";
import { FetchState, FetchStatus } from "../../../../../helpers/use-fetch";

const tripInfo: TripInfo = (tripData as unknown) as TripInfo;

jest.mock("../../../../../helpers/keyboard-events", () => ({
  __esModule: true,
  handleReactEnterKeyPress: jest.fn()
}));

const journey: Journey = {
  trip: {
    shape_id: "010070",
    route_pattern_id: "1-_-0",
    name: "",
    id: "45030860",
    headsign: "Harvard",
    direction_id: 0,
    "bikes_allowed?": true
  },
  route: {
    type: 3,
    sort_order: 50010,
    name: "1",
    long_name: "Harvard Square - Nubian Station",
    id: "1",
    direction_names: {
      "0": "Outbound",
      "1": "Inbound"
    },
    direction_destinations: {
      "0": "Harvard Square",
      "1": "Nubian Station"
    },
    description: "key_bus_route",
    color: "FFC72C"
  },
  departure: {
    time: "04:54 AM",
    schedule: {
      time: "2020-08-14T04:54:00-04:00",
      stop_sequence: 19,
      pickup_type: 0,
      "last_stop?": false,
      "flag?": false,
      "early_departure?": true
    },
    prediction: null
  }
};

const fetchState: FetchState<TripInfo> = {
  status: FetchStatus.Data,
  data: tripInfo
};

const contentComponent = () => <></>;

describe("AccordionRow", () => {
  it("renders the expanded AccordionRow markup", () => {
    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            fetchState={fetchState}
            journey={journey}
            contentComponent={contentComponent}
            expanded={true}
            toggle={() => {}}
          />
        </tbody>
      </table>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("renders the collapsed AccordionRow markup", () => {
    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            fetchState={fetchState}
            journey={journey}
            contentComponent={contentComponent}
            expanded={false}
            toggle={() => {}}
          />
        </tbody>
      </table>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("accepts the Enter key as input", () => {
    const mockHandleReactEnterKeyPress: jest.Mock = KeyboardEvents.handleReactEnterKeyPress as jest.Mock;

    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            fetchState={fetchState}
            journey={journey}
            contentComponent={contentComponent}
            expanded={false}
            toggle={() => {}}
          />
        </tbody>
      </table>
    );

    wrapper.find(".schedule-table__row").simulate("keypress", { key: "Enter" });

    expect(mockHandleReactEnterKeyPress).toHaveBeenCalled();
  });
});
