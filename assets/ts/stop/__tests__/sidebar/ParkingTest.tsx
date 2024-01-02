import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ParkingInfo, {
  maybeAddLinkPrefix
} from "../../components/sidebar/Parking";

import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../../app/helpers/testUtils";
import {
  ParkingLotUtilization,
  ParkingLotMobileApp,
  ParkingLotPayment,
  ParkingLot,
  ParkingLotManager,
  ParkingLotCapacity,
  Stop
} from "../../../__v3api";
/* eslint-disable camelcase */

const utilization: ParkingLotUtilization = {
  typical: 200,
  arrive_before: "6:00 AM"
};

const mobileApp: ParkingLotMobileApp = {
  name: "ProParkApp",
  url: "http://www.propark.com/madeupapp"
};

const payment: ParkingLotPayment = {
  monthly_rate: "$150 regular, $445 overnight",
  mobile_app: mobileApp,
  methods: ["Credit/Debit Card", "Cash"],
  daily_rate:
    "Hourly: 30 min: $5, 1 hr: $10, 1.5 hrs: $15, 2 hrs: $20, 2.5 hrs: $25, 3+ hrs: $30 | Daily Max: $30 | Early Bird (in by 8:30 AM, out by 6 PM): $26 | Nights/Weekends: $10"
};

const manager: ParkingLotManager = {
  url: "https://www.propark.com/propark-locator2/south-station-garage/",
  phone: "617-345-0202",
  name: "ProPark",
  contact: "ProPark"
};

const capacity: ParkingLotCapacity = {
  type: "Garage",
  total: 210,
  accessible: 4,
  overnight: "Available"
};

const parkingLot: ParkingLot = {
  id: "1",
  utilization,
  payment,
  note: "An example note",
  name: "South Station Bus Terminal Garage",
  manager,
  longitude: -71.055963,
  latitude: 42.349838,
  capacity,
  address: null
};

const stop: Stop = {
  "station?": true,
  parking_lots: [{ ...parkingLot }],
  note: null,
  name: "South Station",
  bike_storage: [],
  longitude: -71.055242,
  latitude: 42.352271,
  "is_child?": false,
  id: "place-sstat",
  fare_facilities: [
    "fare_vending_machine",
    "fare_media_assistant",
    "ticket_window"
  ],
  "has_fare_machine?": true,
  "has_charlie_card_vendor?": false,
  closed_stop_info: null,
  address: "700 Atlantic Ave, Boston, MA 02110",
  municipality: "Boston",
  accessibility: [
    "accessible",
    "escalator_both",
    "elevator",
    "fully_elevated_platform"
  ],
  type: "station"
};

const id = "#header-parking";

describe("Parking", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <ParkingInfo
          stop={stop}
          isExpanded={false}
          isFocused={false}
          dispatch={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("via enzyme-to-json it displays parking info when opened and inner html", () => {
    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stop}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("handles cases where no parking information is listed for a station", () => {
    const stopWithNoLots: Stop = { ...stop, parking_lots: [] };
    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithNoLots}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const utilizationWrapper = wrapper.find("#parking");
    expect(utilizationWrapper.text()).toContain(
      "No parking information is available for this station"
    );
  });

  it("handles cases where no parking information is listed for a stop", () => {
    const stationWithNoLots: Stop = {
      ...stop,
      parking_lots: [],
      "station?": false
    };
    const wrapper = mount(
      <ParkingInfo
        stop={stationWithNoLots}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const utilizationWrapper = wrapper.find("#parking");
    expect(utilizationWrapper.text()).toContain("for this stop");
  });

  it("handles cases where utilization data shows parking is not in high demand", () => {
    const stopWithNoParkingDemand: Stop = {
      ...stop,
      parking_lots: [
        {
          ...parkingLot,
          utilization: { ...utilization, arrive_before: undefined }
        }
      ]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithNoParkingDemand}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const utilizationWrapper = wrapper.find("#parking-utilization");
    expect(utilizationWrapper.text()).toContain("is generally available");
  });

  it("handles cases where utilization data is not available", () => {
    const stopWithNoUtilization: Stop = {
      ...stop,
      parking_lots: [{ ...parkingLot, utilization: null }]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithNoUtilization}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const utilizationWrapper = wrapper.find("#parking-utilization");
    expect(enzymeToJsonWithoutProps(utilizationWrapper)).toEqual(null);
  });

  it("if capacity data is not available for a lot, it is assumed that there is no MBTA parking", () => {
    const stopWithNoCapacity = {
      ...stop,
      parking_lots: [{ ...parkingLot, capacity: null }]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithNoCapacity}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const capacityWrapper = wrapper.find("#parking-capacity");
    expect(capacityWrapper.text()).toContain("No MBTA parking.");
  });

  it("handles cases where mobile app data is not available", () => {
    const stopWithNoMobile: Stop = {
      ...stop,
      parking_lots: [
        {
          ...parkingLot,
          payment: { ...payment, mobile_app: null }
        }
      ]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithNoMobile}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const capacityWrapper = wrapper.find("#parking-mobile-app");
    expect(enzymeToJsonWithoutProps(capacityWrapper)).toEqual(null);
  });

  it("handles cases where mobile app url is not available", () => {
    const stopWithMobileId: Stop = {
      ...stop,
      parking_lots: [
        {
          ...parkingLot,
          payment: {
            ...payment,
            mobile_app: { ...mobileApp, url: null }
          }
        }
      ]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithMobileId}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const capacityWrapper = wrapper.find("#parking-mobile-app");
    expect(capacityWrapper.html()).not.toContain("<a>");
  });

  it("handles cases where mobile app id data is available", () => {
    const stopWithMobileId: Stop = {
      ...stop,
      parking_lots: [
        {
          ...parkingLot,
          payment: {
            ...payment,
            mobile_app: { ...mobileApp, id: "234" }
          }
        }
      ]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithMobileId}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const capacityWrapper = wrapper.find("#parking-mobile-app");
    expect(capacityWrapper.text()).toContain("#234");
  });

  it("handles cases where payment info is not available", () => {
    const stopWithNoMobile: Stop = {
      ...stop,
      parking_lots: [{ ...parkingLot, payment: null }]
    };

    createReactRoot();
    const wrapper = mount(
      <ParkingInfo
        stop={stopWithNoMobile}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    wrapper.find(id).simulate("click");
    const capacityWrapper = wrapper.find("#parking-payment");
    expect(capacityWrapper.text()).toContain(
      "No payment information available"
    );
  });
});

it("handles cases where manager info is not available", () => {
  const stopWithNoMobile: Stop = {
    ...stop,
    parking_lots: [{ ...parkingLot, manager: null }]
  };

  createReactRoot();
  const wrapper = mount(
    <ParkingInfo
      stop={stopWithNoMobile}
      isExpanded
      isFocused={false}
      dispatch={() => {}}
    />
  );
  wrapper.find(id).simulate("click");
  const capacityWrapper = wrapper.find("#parking-manager");
  expect(capacityWrapper.text()).toContain("No contact information");
});

it("doesn't add a link for manager contact info if not available", () => {
  const stopWithNoMobile = {
    ...stop,
    parking_lots: [
      {
        ...parkingLot,
        manager: { ...manager, url: null }
      }
    ]
  };

  createReactRoot();
  const wrapper = mount(
    <ParkingInfo
      stop={stopWithNoMobile}
      isExpanded
      isFocused={false}
      dispatch={() => {}}
    />
  );
  wrapper.find(id).simulate("click");
  const capacityWrapper = wrapper.find("#parking-manager");
  expect(capacityWrapper.html()).not.toContain(`Contact: </strong><a`);
});

it("adds a url link for a manager if available", () => {
  const stopWithNoMobile: Stop = {
    ...stop,
    parking_lots: [
      {
        ...parkingLot,
        manager: { ...manager, phone: "tel:+123456789" }
      }
    ]
  };

  createReactRoot();
  const wrapper = mount(
    <ParkingInfo
      stop={stopWithNoMobile}
      isExpanded
      isFocused={false}
      dispatch={() => {}}
    />
  );
  wrapper.find(id).simulate("click");
  const capacityWrapper = wrapper.find("#parking-manager");
  expect(capacityWrapper.text()).toContain("phone: 123456789");
  expect(capacityWrapper.html()).toContain(`href="tel:+123456789"`);
});

it("handles case where manager telephone is not avaiable", () => {
  const stopWithNoPhone: Stop = {
    ...stop,
    parking_lots: [
      {
        ...parkingLot,
        manager: { ...manager, phone: null }
      }
    ]
  };

  createReactRoot();
  const wrapper = mount(
    <ParkingInfo
      stop={stopWithNoPhone}
      isExpanded
      isFocused={false}
      dispatch={() => {}}
    />
  );
  wrapper.find(id).simulate("click");
  const capacityWrapper = wrapper.find("#parking-manager");
  expect(capacityWrapper.text()).not.toContain("phone:");
});

it("handles cases where there is no note", () => {
  const stopWithNoMobile: Stop = {
    ...stop,
    parking_lots: [{ ...parkingLot, note: null }]
  };

  createReactRoot();
  const wrapper = mount(
    <ParkingInfo
      stop={stopWithNoMobile}
      isExpanded
      isFocused={false}
      dispatch={() => {}}
    />
  );
  wrapper.find(id).simulate("click");
  const capacityWrapper = wrapper.find("#parking-note");
  expect(enzymeToJsonWithoutProps(capacityWrapper)).toEqual(null);
});

describe("maybeAddLinkPrefix", () => {
  it("adds https if needed", () => {
    expect(maybeAddLinkPrefix("mysite.com")).toEqual("https://mysite.com");
  });

  it("doesnt add https or http if already included", () => {
    expect(maybeAddLinkPrefix("http://mysite.com")).toEqual(
      "http://mysite.com"
    );
    expect(maybeAddLinkPrefix("https://mysite.com")).toEqual(
      "https://mysite.com"
    );
  });
});
