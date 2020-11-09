import React from "react";
import { act } from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import { UserInput } from "../../../__schedule";
import { EnhancedJourney } from "../../../__trips";
import departuresResponse from "../../__tests__/test-data/departures.json";
import * as upcomingDeparturesModule from "../UpcomingDepartures";
import crDeparturesResponse from "./test-data/crDepartures.json";
import enhancedBusJourneysResponse from "./test-data/enhancedBusJourneys.json";
import enhancedCRjourneysResponse from "./test-data/enhancedCRjourneys.json";
import LiveCrowdingIcon from "../../../line-diagram/LiveCrowdingIcon";

const {
  UpcomingDepartures,
  upcomingDeparturesTable,
  fetchData,
  crowdingInformation,
  BusTableRow,
  CrTableRow
} = upcomingDeparturesModule;

const busDepartures = (departuresResponse as unknown) as EnhancedJourney[];
const crDepartures = (crDeparturesResponse as unknown) as EnhancedJourney[];
const enhancedBusJourneys = (enhancedBusJourneysResponse as unknown) as EnhancedJourney[];
const enhancedCRjourneys = (enhancedCRjourneysResponse as unknown) as EnhancedJourney[];

const input: UserInput = {
  route: "a",
  origin: "place-dudly",
  date: "2020-07-13",
  direction: 0
};

describe("UpcomingDepartures", () => {
  let wrapper: ReactWrapper;

  it("renders with message if there are no predictions", () => {
    act(() => {
      const state = {
        data: busDepartures,
        error: false,
        isLoading: false
      };

      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable([], state, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
      expect(wrapper.find(".callout").text()).toEqual(
        "There are currently no realtime departures available."
      );
    });
  });

  it("doesn't render if there was an error", () => {
    act(() => {
      const state = {
        data: crDepartures,
        error: true,
        isLoading: false
      };

      jest.spyOn(React, "useEffect").mockImplementation(f => f());

      wrapper = mount(
        <UpcomingDepartures
          state={state}
          input={input}
          showUpcomingDepartures={true}
        />
      );

      expect(wrapper.html()).toBeNull();
    });
  });

  it("renders bus predictions", () => {
    act(() => {
      const state = {
        data: busDepartures,
        error: false,
        isLoading: false
      };

      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable(enhancedBusJourneys, state, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(2);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
    });
  });

  it("renders SL bus predictions", () => {
    act(() => {
      const state = {
        data: [
          {
            ...busDepartures[0],
            route: { ...busDepartures[0].route, name: "SL-2", id: "741" }
          }
        ],
        error: false,
        isLoading: false
      };

      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable(enhancedBusJourneys, state, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(2);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
    });
  });

  it("renders cr predictions", () => {
    act(() => {
      const state = {
        data: crDepartures,
        error: false,
        isLoading: false
      };

      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable(enhancedCRjourneys, state, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("doesn't render cr departures that don't have a predicted time yet", () => {
    act(() => {
      const state = {
        data: crDepartures,
        error: false,
        isLoading: false
      };

      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable(enhancedCRjourneys, state, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow)).toHaveLength(1);
    });
  });

  it("renders upcoming (bus) departures containing crowding information", () => {
    act(() => {
      const state = {
        data: busDepartures,
        error: false,
        isLoading: false
      };

      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable(enhancedBusJourneys, state, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(".c-icon__crowding--some_crowding").length).toBe(1);
    });
  });

  it("renders the 'loading' status", () => {
    const state = {
      data: busDepartures,
      error: false,
      isLoading: false
    };

    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => enhancedBusJourneys[0].tripInfo
          })
        )
    );

    const dispatchSpy = jest.fn();

    return fetchData(input, [busDepartures[0]], dispatchSpy).then(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_STARTED" });

      wrapper = mount(
        <UpcomingDepartures
          state={state}
          input={input}
          showUpcomingDepartures={true}
        />
      );

      expect(wrapper.find(".c-spinner__container")).toHaveLength(1);
    });
  });

  it("mocks successful fetchData", () => {
    const dispatchSpy = jest.fn();

    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => enhancedBusJourneys[0].tripInfo
          })
        )
    );

    return fetchData(input, [busDepartures[0]], dispatchSpy).then(
      (result: EnhancedJourney[]) => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/finder_api/trip?id=41894293&route=1&date=2020-07-13&direction=0&stop=place-dudly"
        );

        expect(result).toEqual([enhancedBusJourneys[0]]);
      }
    );
  });

  it("mocks unsuccessful fetchData", () => {
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) => {
          throw new Error("500 error");
        })
    );

    const dispatchSpy = jest.fn();

    return fetchData(input, [busDepartures[0]], dispatchSpy).then(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_ERROR" });
    });
  });

  it("should display crowding information for buses", () => {
    const journey = enhancedBusJourneys[0];

    wrapper = mount(<>{crowdingInformation(journey, journey.trip.id)}</>);

    expect(wrapper.exists(LiveCrowdingIcon)).toBeTruthy();
    expect(wrapper.find(LiveCrowdingIcon).prop("crowding")).toBe(
      "some_crowding"
    );
  });

  it("should not display crowding information for CR", () => {
    act(() => {
      const journey: EnhancedJourney = enhancedCRjourneysResponse[0];

      wrapper = mount(<>{crowdingInformation(journey, journey.trip.id)}</>);
      expect(wrapper.find(LiveCrowdingIcon).prop("crowding")).toBeFalsy();
    });
  });

  it("displays a message indicating that it's the last stop and does not call fetchData", () => {
    const state = {
      data: busDepartures,
      error: false,
      isLoading: false
    };

    const fetchDataSpy = jest.spyOn(upcomingDeparturesModule, "fetchData");

    wrapper = mount(
      <UpcomingDepartures
        state={state}
        input={input}
        showUpcomingDepartures={false}
      />
    );

    expect(wrapper.find(".callout").text()).toEqual(
      "There are no upcoming departures. This is the last stop."
    );

    expect(fetchDataSpy).not.toHaveBeenCalled();
  });
});
