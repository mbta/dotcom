import React from "react";
import renderer, { act } from "react-test-renderer";
import { EnhancedRoute } from "../../__v3api";
import ScheduleModalContent, {
  fetchData
} from "../components/schedule-finder/ScheduleModalContent";
import { SimpleStop, SimpleStopMap } from "../components/__schedule";
import { EnhancedJourney } from "../components/__trips";
import departuresResponse from "../__tests__/departures.json";
import ScheduleNote from "../components/ScheduleNote";
import { createReactRoot } from "../../app/helpers/testUtils";

const today = "2019-12-05";
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

const greenRoute: EnhancedRoute = {
  alert_count: 0,
  description: "",
  direction_destinations: { 0: "East", 1: "West" },
  direction_names: { 0: "East", 1: "West" },
  header: "",
  id: "Green",
  name: "Green",
  long_name: "Green Line",
  type: 0
};

const oneDirectionRoute: EnhancedRoute = {
  alert_count: 0,
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: null },
  direction_names: { 0: "Inbound", 1: null },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
};

const scheduleNoteData = {
  offpeak_service: "8-12 minutes",
  peak_service: "5 minutes",
  exceptions: [
    { service: "26 minutes", type: "weekend mornings and late night" }
  ],
  alternate_text: null
};

const stopList: SimpleStop[] = [
  { name: "Malden Center", id: "place-mlmnl", is_closed: false, zone: "1" },
  { name: "Wellington", id: "place-welln", is_closed: false, zone: "2" }
];

const stops: SimpleStopMap = { 0: stopList, 1: stopList.slice().reverse() };

const payload: EnhancedJourney[] = departuresResponse as EnhancedJourney[];

describe("ScheduleModalContent", () => {
  it("renders", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          handleChangeDirection={() => {}}
          handleChangeOrigin={() => {}}
          handleOriginSelectClick={() => {}}
          route={route}
          stops={stops}
          selectedOrigin={stopList[0].id}
          selectedDestination=""
          selectedDirection={0}
          services={[]}
          routePatternsByDirection={{}}
          today={today}
          scheduleNote={null}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it("renders with schedule note if present", () => {
    createReactRoot();
    const tree = renderer.create(
      <ScheduleModalContent
        handleChangeDirection={() => {}}
        handleChangeOrigin={() => {}}
        handleOriginSelectClick={() => {}}
        route={route}
        stops={stops}
        selectedOrigin={stopList[0].id}
        selectedDestination=""
        selectedDirection={0}
        services={[]}
        routePatternsByDirection={{}}
        today={today}
        scheduleNote={scheduleNoteData}
      />
    );
    expect(
      tree.root.findByType(ScheduleNote).props.scheduleNote.offpeak_service
    ).toBe("8-12 minutes");
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

      return fetchData(route.id, stopList[0].id, 0, spy).then(() => {
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
