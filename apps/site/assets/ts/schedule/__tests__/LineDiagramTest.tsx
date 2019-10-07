import React from "react";
import renderer from "react-test-renderer";
import LineDiagram from "../components/LineDiagram";
import { StopType } from "../../__v3api";
import { LineDiagramStop } from "../components/__schedule";
const stopType = "stop" as StopType;
// Not a full line diagram

export const lineDiagram = [
  {
    stop_data: [{ type: "terminus", branch: null }],
    route_stop: {
      zone: "1A",
      stop_features: ["bus"],
      station_info: {
        type: stopType,
        "station?": false,
        platform_name: null,
        platform_code: null,
        parking_lots: [],
        parent_id: null,
        note: null,
        name: "Elm St opp Haskell Ave",
        longitude: -71.033138,
        latitude: 42.415684,
        "is_child?": false,
        id: "5547",
        "has_fare_machine?": false,
        "has_charlie_card_vendor?": false,
        fare_facilities: [],
        description: null,
        closed_stop_info: null,
        child_ids: [],
        bike_storage: [],
        address: null,
        accessibility: ["unknown"]
      },
      route: {
        type: 3,
        name: "111",
        long_name: "Woodlawn - Haymarket",
        id: "111",
        direction_names: { "0": "Outbound", "1": "Inbound" },
        direction_destinations: { "0": "Woodlawn", "1": "Haymarket" },
        description: "key_bus_route",
        "custom_route?": false
      },
      name: "Elm St opp Haskell Ave",
      "is_terminus?": true,
      "is_beginning?": true,
      id: "5547",
      connections: [
        {
          type: 3,
          name: "110",
          long_name: "Wonderland - Wellington",
          id: "110",
          direction_names: { "0": "Outbound", "1": "Inbound" },
          direction_destinations: { "0": "Wonderland", "1": "Wellington" },
          description: "local_bus",
          "custom_route?": false
        }
      ],
      closed_stop_info: null,
      branch: null
    }
  },
  {
    stop_data: [{ type: "stop", branch: "Lowell" }],
    route_stop: {
      zone: "1A",
      stop_features: [
        "orange_line",
        "green_line_c",
        "green_line_e",
        "commuter_rail",
        "access",
        "parking_lot"
      ],
      station_info: {
        type: "station",
        "station?": true,
        platform_name: null,
        platform_code: null,
        parking_lots: [
          {
            utilization: null,
            payment: {
              monthly_rate: "$380 restricted",
              mobile_app: null,
              methods: ["Credit/Debit Card", "Cash"],
              daily_rate:
                "Hourly: 30 Min: $8, 1 hr: $15, 1-2 hrs: $22, 2-3 hrs: $26, 3-12 hrs: $30 | Daily Max: $68 | Events: $48 | Early Bird (in by 9 AM, out by 6 PM): $24 | Nights/Weekends: $10"
            },
            note: "Parking garage is located underneath TD Garden.",
            name: "North Station Garage",
            manager: {
              url:
                "https://www.propark.com/propark-locator2/north-station-garage/",
              phone: "617-222-3042",
              name: "ProPark",
              contact: "ProPark"
            },
            longitude: -71.06214,
            latitude: 42.366083,
            capacity: {
              type: "Garage",
              total: 1275,
              overnight: "Unknown",
              accessible: 38
            },
            address: null
          }
        ],
        parent_id: null,
        note: null,
        name: "North Station",
        longitude: -71.06129,
        latitude: 42.365577,
        "is_child?": false,
        id: "place-north",
        "has_fare_machine?": true,
        "has_charlie_card_vendor?": true,
        fare_facilities: [
          "fare_media_assistant",
          "fare_vending_machine",
          "ticket_window"
        ],
        description: null,
        closed_stop_info: null,
        child_ids: [
          "70026",
          "70027",
          "70205",
          "70206",
          "North Station",
          "North Station-01",
          "North Station-02",
          "North Station-03",
          "North Station-04",
          "North Station-05",
          "North Station-06",
          "North Station-07",
          "North Station-08",
          "North Station-09",
          "North Station-10",
          "door-north-causewaye",
          "door-north-causeways",
          "door-north-crcanal",
          "door-north-crcauseway",
          "door-north-crnashua",
          "door-north-tdgarden",
          "door-north-valenti"
        ],
        bike_storage: ["bike_storage_rack"],
        address: "135 Causeway St, Boston MA 02114",
        accessibility: [
          "accessible",
          "escalator_both",
          "elevator",
          "fully_elevated_platform",
          "portable_boarding_lift"
        ]
      },
      route: {
        type: 2,
        name: "Lowell Line",
        long_name: "Lowell Line",
        id: "CR-Lowell",
        direction_names: { "0": "Outbound", "1": "Inbound" },
        direction_destinations: { "0": "Lowell", "1": "North Station" },
        description: "commuter_rail",
        "custom_route?": false
      },
      name: "North Station",
      "is_terminus?": true,
      "is_beginning?": true,
      id: "place-north",
      connections: [
        {
          type: 1,
          name: "Orange Line",
          long_name: "Orange Line",
          id: "Orange",
          direction_names: { "0": "Southbound", "1": "Northbound" },
          direction_destinations: { "0": "Forest Hills", "1": "Oak Grove" },
          description: "rapid_transit",
          "custom_route?": false
        },
        {
          type: 0,
          name: "Green Line C",
          long_name: "Green Line C",
          id: "Green-C",
          direction_names: { "0": "Westbound", "1": "Eastbound" },
          direction_destinations: {
            "0": "Cleveland Circle",
            "1": "North Station"
          },
          description: "rapid_transit",
          "custom_route?": false
        },
        {
          type: 0,
          name: "Green Line E",
          long_name: "Green Line E",
          id: "Green-E",
          direction_names: { "0": "Westbound", "1": "Eastbound" },
          direction_destinations: { "0": "Heath Street", "1": "Lechmere" },
          description: "rapid_transit",
          "custom_route?": false
        },
        {
          type: 2,
          name: "Fitchburg Line",
          long_name: "Fitchburg Line",
          id: "CR-Fitchburg",
          direction_names: { "0": "Outbound", "1": "Inbound" },
          direction_destinations: { "0": "Wachusett", "1": "North Station" },
          description: "commuter_rail",
          "custom_route?": false
        },
        {
          type: 2,
          name: "Haverhill Line",
          long_name: "Haverhill Line",
          id: "CR-Haverhill",
          direction_names: { "0": "Outbound", "1": "Inbound" },
          direction_destinations: { "0": "Haverhill", "1": "North Station" },
          description: "commuter_rail",
          "custom_route?": false
        },
        {
          type: 2,
          name: "Newburyport/Rockport Line",
          long_name: "Newburyport/Rockport Line",
          id: "CR-Newburyport",
          direction_names: { "0": "Outbound", "1": "Inbound" },
          direction_destinations: {
            "0": "Newburyport or Rockport",
            "1": "North Station"
          },
          description: "commuter_rail",
          "custom_route?": false
        }
      ],
      closed_stop_info: null,
      branch: null
    }
  }
] as LineDiagramStop[];

describe("LineDiagram", () => {
  it("it renders", () => {
    const wrapper = renderer.create(<LineDiagram lineDiagram={lineDiagram} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
