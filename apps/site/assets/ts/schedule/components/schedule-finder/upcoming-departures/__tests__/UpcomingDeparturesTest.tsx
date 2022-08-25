import React from "react";
import { act } from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import { UserInput } from "../../../__schedule";
import { EnhancedJourney } from "../../../__trips";
import UpcomingDepartures, {
  upcomingDeparturesTable,
  crowdingInformation,
  BusTableRow,
  CrTableRow
} from "../UpcomingDepartures";
import enhancedBusJourneysResponse from "./test-data/enhancedBusJourneys.json";
import enhancedCRjourneysResponse from "./test-data/enhancedCRjourneys.json";
import LiveCrowdingIcon from "../../../line-diagram/LiveCrowdingIcon";
import { UseProviderState } from "../../../../../helpers/use-provider";

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
      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable({ loading: false, data: [] }, input)}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
      expect(wrapper.find(".callout").text()).toEqual(
        "There are currently no realtime departures available."
      );
    });
  });

  it("renders bus predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable(
            { loading: false, data: enhancedBusJourneys },
            input
          )}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(2);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
    });
  });

  it("renders SL bus predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable(
            { loading: false, data: enhancedBusJourneys },
            input
          )}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(2);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
    });
  });

  it("renders cr predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable(
            { loading: false, data: enhancedCRjourneys },
            input
          )}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("doesn't render cr departures that don't have a predicted time yet", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable(
            { loading: false, data: enhancedCRjourneys },
            input
          )}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow)).toHaveLength(1);
    });
  });

  it("renders upcoming (bus) departures containing crowding information", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable(
            { loading: false, data: enhancedBusJourneys },
            input
          )}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(".c-icon__crowding--some_crowding").length).toBe(1);
    });
  });

  it("renders the 'loading' status", () => {
    const state: UseProviderState<EnhancedJourney[]> = { loading: true };
    wrapper = mount(<UpcomingDepartures state={state} input={input} />);

    expect(wrapper.find(".c-spinner__container")).toHaveLength(1);
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
      const journey = (enhancedCRjourneysResponse[0] as unknown) as EnhancedJourney;

      wrapper = mount(<>{crowdingInformation(journey, journey.trip.id)}</>);
      expect(wrapper.exists(LiveCrowdingIcon)).toBeFalsy();
    });
  });
});
