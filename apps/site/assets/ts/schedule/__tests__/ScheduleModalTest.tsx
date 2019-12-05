import React from "react";
import renderer, { act } from "react-test-renderer";
import { EnhancedRoute } from "../../__v3api";
import ScheduleModalContent, {
  fetchData
} from "../components/schedule-finder/ScheduleModalContent";
import { SimpleStop } from "../components/__schedule";
import { EnhancedJourney } from "../components/__trips";
import departuresResponse from "../__tests__/departures.json";

const route: EnhancedRoute = {
  alert_count: 0,
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
};

const stops: SimpleStop[] = [
  { name: "Malden Center", id: "place-mlmnl", is_closed: false, zone: "1" },
  { name: "Wellington", id: "place-welln", is_closed: false, zone: "2" }
];

export const payload: EnhancedJourney[] = departuresResponse as EnhancedJourney[];

describe("ScheduleModal", () => {
  it("it renders", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={0}
          services={[]}
          ratingEndDate="2020-03-14"
          routePatternsByDirection={{}}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it("it doesn't render if selectedOrigin is null", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={null}
          selectedDirection={0}
          services={[]}
          ratingEndDate="2020-03-14"
          routePatternsByDirection={{}}
        />
      );
      expect(tree!.toJSON()).toBeNull();
    });
  });

  it("it doesn't render if selectedDirection is null", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={null}
          services={[]}
          ratingEndDate="2020-03-14"
          routePatternsByDirection={{}}
        />
      );
      expect(tree!.toJSON()).toBeNull();
    });
  });

  describe("fetchData", () => {
    it("fetches data", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => payload,
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      return fetchData("1", "99", 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/finder_api/departures?id=1&stop=99&direction=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_COMPLETE",
          payload
        });
      });
    });

    it("fails gracefully if fetch is unsuccessful", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => "Internal Server Error",
              ok: false,
              status: 500,
              statusText: "INTERNAL SERVER ERROR"
            })
          )
      );

      return fetchData(route.id, stops[0].id, 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/finder_api/departures?id=Orange&stop=place-mlmnl&direction=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_ERROR"
        });
      });
    });
  });
});
